import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec); // 将 exec 转换为返回 Promise 的函数

export async function runCommand(cmd, cwd) {
  try {
    const stdout = await execAsync(cmd, {
      cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    // 返回命令的输出结果
    return stdout.stdout.toString();
  } catch (err) {
    if (err.stdout) {
      // 即使命令返回错误码，但有stdout输出，我们仍然返回它
      // 这对于像npm audit这样可能返回JSON结果即使有错误的命令很重要
      return err.stdout.toString();
    }
    
    // 提供更友好的错误信息
    let friendlyMessage = `执行命令失败: ${cmd}`;
    
    if (err.code === 127) {
      // 命令未找到错误
      const cmdName = cmd.split(' ')[0];
      friendlyMessage += `\n错误: 命令 ${cmdName} 未找到，请确保已正确安装`;
    } else if (cwd) {
      friendlyMessage += `\n工作目录: ${cwd}`;
    }
    
    if (err.stderr) {
      friendlyMessage += `\n错误输出: ${err.stderr}`;
    }
    
    // 创建自定义错误对象
    const customError = new Error(friendlyMessage);
    customError.originalError = err;
    
    throw customError;
  }
}

export function uniqueId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * 生成带时间戳的默认文件名
 * @param {string} prefix 文件名前缀，默认为'joe-audit-result'
 * @param {string} extension 文件扩展名，默认为'.md'
 * @returns {string} 带时间戳的文件名
 */
export function generateTimestampedFilename(prefix = 'joe-audit-result', extension = '.md') {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${prefix}-${year}${month}${day}${hours}${minutes}${seconds}${extension}`;
}

export function getFilename(importMetaUrl) {
  return fileURLToPath(importMetaUrl);
}

export function getDirname(importMetaUrl) {
  return dirname(getFilename(importMetaUrl));
}
