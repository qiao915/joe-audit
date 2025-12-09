import ejs from 'ejs';
import { join } from 'path';
import { getDirname } from '../common/utils.js';

const templatePath = join(getDirname(import.meta.url), './template/index.ejs');

export async function renderMarkdown(data) {
  try {
    const str = await ejs.renderFile(templatePath, data, { trim: true });
    // 去除多余的换行符，连续换行最多保留两个
    return str.replace(/\n{3,}/g, '\n\n');
  } catch (err) {
    throw new Error(`渲染Markdown失败: ${err.message}`);
  }
}
