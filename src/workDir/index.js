import fs from 'fs';
import { join } from 'path';
import { uniqueId, getDirname } from '../common/utils.js';

const __dirname = getDirname(import.meta.url); // 获取当前文件的目录名
const basePath = join(__dirname, '../..'); // 获取上两级目录
const workBasePath = join(basePath, 'work'); // 定义工作目录路径

// 确保基础工作目录存在
(function ensureWorkBasePath() {
  try {
    fs.mkdirSync(workBasePath, { recursive: true });
  } catch (error) {
    console.error(`Warning: Failed to create base working directory ${workBasePath}: ${error.message}`);
    console.error(`This may affect the normal operation of audit functions`);
  }
})();

/**
 * 创建临时工作目录
 * @returns {Promise<string>} 工作目录路径
 * @throws {Error} 如果创建工作目录失败
 */
export async function createWorkDir() {
  try {
    const workDir = join(workBasePath, uniqueId());
    await fs.promises.mkdir(workDir, { recursive: true });
    return workDir;
  } catch (error) {
    throw new Error(`无法创建临时工作目录：${error.message}`);
  }
}

/**
 * 删除临时工作目录
 * @param {string} workDir 工作目录路径
 * @returns {Promise<void>}
 */
export async function deleteWorkDir(workDir) {
  try {
    // 验证工作目录是否在预期的基础路径内，防止误删
    if (!workDir.startsWith(workBasePath)) {
      console.warn(`Warning: The working directory ${workDir} to be deleted is not in the expected path, skipping deletion`);
      return;
    }
    await fs.promises.rm(workDir, { recursive: true, force: true });
  } catch (error) {
    // 清理失败时只记录警告，不影响主流程
    console.warn(`Warning: Failed to delete temporary working directory ${workDir}: ${error.message}`);
  console.warn(`You can manually delete this directory to free up disk space`);
  }
}
