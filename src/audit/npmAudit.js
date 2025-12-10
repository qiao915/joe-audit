import { runCommand } from '../common/utils.js';

export async function npmAudit(workDir) {
  // 先检查工作目录的内容
  const lsCmd = `ls -la ${workDir}`;
  const lsResult = await runCommand(lsCmd, '.');
  // console.log('工作目录内容:', lsResult);
  
  // 检查package.json内容
  const catCmd = `cat ${workDir}/package.json`;
  const catResult = await runCommand(catCmd, '.');
  // console.log('package.json内容:', catResult);
  
  // 检查node_modules目录
  const nodeModulesCmd = `ls -la ${workDir}/node_modules`;
  try {
    const nodeModulesResult = await runCommand(nodeModulesCmd, '.');
    // console.log('node_modules目录内容:', nodeModulesResult);
  } catch (error) {
    // console.log('node_modules目录不存在:', error.message);
  }
  
  // 检查lodash版本
  const lodashVersionCmd = `npm list lodash`;
  const lodashVersionResult = await runCommand(lodashVersionCmd, workDir);
  // console.log('lodash版本:', lodashVersionResult);
  
  // 尝试直接运行npm audit命令
  const cmd = `npm audit`;
  const auditResult = await runCommand(cmd, workDir);
  // console.log('npm audit直接输出:', auditResult);
  
  // 再运行带json参数的命令
  const jsonCmd = `npm audit --json`;
  const jsonResult = await runCommand(jsonCmd, workDir);
  // console.log('npm audit --json输出:', jsonResult);
  
  const auditData = JSON.parse(jsonResult);
  return auditData;
}
