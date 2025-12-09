import path from 'path';
import fs from 'fs';

export async function parseLocalProject(projectRoot) {
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    
    // 检查目录是否存在
    const stats = await fs.promises.stat(projectRoot);
    if (!stats.isDirectory()) {
      throw new Error(`目标路径 ${projectRoot} 不是一个有效的目录`);
    }
    
    // 读取package.json文件
    const json = await fs.promises.readFile(packageJsonPath, 'utf8');
    
    // 解析JSON
    try {
      return JSON.parse(json);
    } catch (parseError) {
      throw new Error(`无法解析 ${packageJsonPath} 文件：${parseError.message}`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      if (error.path.endsWith('package.json')) {
        throw new Error(`在 ${projectRoot} 目录下找不到 package.json 文件`);
      } else {
        throw new Error(`目录 ${projectRoot} 不存在`);
      }
    }
    throw error;
  }
}
