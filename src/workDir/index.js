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
    console.error(`警告：无法创建基础工作目录 ${workBasePath}: ${error.message}`);
    console.error(`这可能会影响审计功能的正常使用`);
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
      console.warn(`警告：尝试删除的工作目录 ${workDir} 不在预期路径内，跳过删除`);
      return;
    }
    await fs.promises.rm(workDir, { recursive: true, force: true });
  } catch (error) {
    // 清理失败时只记录警告，不影响主流程
    console.warn(`警告：无法删除临时工作目录 ${workDir}: ${error.message}`);
    console.warn(`您可以手动删除该目录以释放磁盘空间`);
  }
}
