import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { generateLock } from '../generateLock/index.js';
import { audit } from '../audit/index.js';
import { render } from '../render/index.js';
import fs from 'fs';

/**
 * 根据项目根目录，审计项目中所有的包（含项目本身）
 * @param {string} projectRoot 项目根目录，可以是本地目录的绝对路径，也可以是远程仓库的URL
 * @param {string} savePath 保存审计结果的文件名，审计结果是一个标准格式的markdown字符串
 */
export async function auditPackage(projectRoot, savePath) {
  // 如果没有提供savePath，则生成带时间戳的默认文件名
  if (!savePath) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    savePath = `joe-audit-result-${year}${month}${day}-${hours}${minutes}${seconds}.md`;
  }
  // 1. 创建工作目录
  console.log('🔄 创建临时工作目录...');
  const workDir = await createWorkDir();
  console.log('✅ 临时工作目录创建完成');
  
  // 2. 解析项目，向工作目录添加pacakge.json
  console.log('🔄 解析项目结构和依赖信息...');
  const packageJson = await parseProject(projectRoot);
  console.log('✅ 项目解析完成');
  
  // 判断是否是远程仓库
  const isRemote = typeof projectRoot === 'string' && (projectRoot.startsWith('http://') || projectRoot.startsWith('https://'));
  
  // 3. 生成lock文件
  console.log('🔄 生成依赖锁定文件...');
  await generateLock(workDir, packageJson, isRemote ? projectRoot : null);
  console.log('✅ 依赖锁定文件生成完成');
  
  // 4. 对工作目录进行审计
  console.log('🔄 正在执行安全审计（可能需要较长时间）...');
  const auditResult = await audit(workDir, packageJson);
  console.log('✅ 安全审计完成');
  
  // 5. 渲染审计结果
  console.log('🔄 生成审计报告...');
  const renderedResult = await render(auditResult, packageJson, projectRoot);
  console.log('✅ 审计报告生成完成');
  
  // 6. 删除工作目录
  console.log('🔄 清理临时文件...');
  await deleteWorkDir(workDir);
  console.log('✅ 临时文件清理完成');
  
  // 7. 将结果保存到指定路径
  console.log('🔄 保存审计结果...');
  await fs.promises.writeFile(savePath, renderedResult);
  console.log('✅ 审计结果保存完成');
}
