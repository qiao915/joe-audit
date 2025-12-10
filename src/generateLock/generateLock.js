import fs from 'fs';
import { join, dirname } from 'path';
import { runCommand } from '../common/utils.js';
import crypto from 'crypto';

// 生成缓存键
function generateCacheKey(repoUrl, packageJson) {
  // 基于仓库URL和package.json内容生成MD5哈希
  const content = `${repoUrl}${JSON.stringify(packageJson)}`;
  const hash = crypto.createHash('md5').update(content).digest('hex');
  return hash;
}

// 获取缓存目录
function getCacheDir() {
  // 使用process.cwd()来获取项目根目录，更可靠
  const cacheDir = join(process.cwd(), 'work/cache');
  fs.mkdirSync(cacheDir, { recursive: true });
  return cacheDir;
}

// 处理package.json，移除或替换不支持的依赖
function processPackageJson(packageJson) {
  // 创建副本以避免修改原始对象
  const processed = { ...packageJson };
  
  // 移除workspace依赖，因为npm --package-lock-only不支持workspace协议
  const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
  
  dependencyTypes.forEach(type => {
    if (processed[type]) {
      Object.keys(processed[type]).forEach(depName => {
        const depVersion = processed[type][depName];
        // 检查是否为workspace依赖
        if (typeof depVersion === 'string' && depVersion.startsWith('workspace:')) {
          // 移除workspace依赖
          delete processed[type][depName];
        }
      });
    }
  });
  
  // 确保有name字段
  processed.name = processed.name || 'temp-package-for-audit';
  
  return processed;
}

// 写入处理后的package.json
async function writePackageJson(workDir, packageJson) {
  const packageJsonPath = join(workDir, 'package.json');
  fs.mkdirSync(dirname(packageJsonPath), { recursive: true });
  
  const processedPackageJson = processPackageJson(packageJson);
  
  await fs.promises.writeFile(
    packageJsonPath,
    JSON.stringify(processedPackageJson),
    'utf8'
  );
}

// 创建 lock 文件并安装依赖
async function createLockFile(workDir) {
  // 使用完整安装命令，确保依赖被实际安装
  // 这样 npm audit 才能正确检测到漏洞
  const cmd = `npm install --force`;
  await runCommand(cmd, workDir); // 在工作目录中执行命令
}

export async function generateLock(workDir, packageJson, repoUrl = null) {
  let useCache = false;
  let lockFilePath = join(workDir, 'package-lock.json');
  let packageJsonPath = join(workDir, 'package.json');
  
  // 检查是否可以使用缓存
  if (repoUrl) {
    const cacheKey = generateCacheKey(repoUrl, packageJson);
    const cacheDir = getCacheDir();
    const cachedLockFile = join(cacheDir, `${cacheKey}.lock.json`);
    const cachedPackageJson = join(cacheDir, `${cacheKey}.package.json`);
    
    // 如果缓存文件存在，则使用缓存
    if (fs.existsSync(cachedLockFile) && fs.existsSync(cachedPackageJson)) {
      console.log('🔄 Using cached dependency lock file');
      // 复制缓存文件到工作目录
      await fs.promises.copyFile(cachedLockFile, lockFilePath);
      await fs.promises.copyFile(cachedPackageJson, packageJsonPath);
      useCache = true;
    }
  }
  
  // 如果没有使用缓存，则正常生成
  if (!useCache) {
    // 1. 将 package.json 写入工作目录
    await writePackageJson(workDir, packageJson);
    // 2. 生成 lock 文件
    await createLockFile(workDir);
    
    // 如果有repoUrl，保存到缓存
    if (repoUrl && fs.existsSync(lockFilePath)) {
      const cacheKey = generateCacheKey(repoUrl, packageJson);
      const cacheDir = getCacheDir();
      const cachedLockFile = join(cacheDir, `${cacheKey}.lock.json`);
      const cachedPackageJson = join(cacheDir, `${cacheKey}.package.json`);
      
      // 保存到缓存
      await fs.promises.copyFile(lockFilePath, cachedLockFile);
      await fs.promises.copyFile(packageJsonPath, cachedPackageJson);
      console.log('🔄 Dependency lock file cached')
    }
  }
}
