import ejs from 'ejs';
import { join } from 'path';
import { getDirname } from '../common/utils.js';

const templatePath = join(getDirname(import.meta.url), './template/index.ejs');

export function renderMarkdown(data) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, { trim: true }, (err, str) => {
      if (err) {
        reject(err);
        return;
      }
      // 去除多余的换行符，连续换行最多保留两个
      const cleanedStr = str.replace(/\n{3,}/g, '\n\n');
      resolve(cleanedStr);
    });
  });
}
