#!/usr/bin/env node

import { auditPackage } from './src/entry/index.js';
import { createInterface } from 'readline';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { generateTimestampedFilename } from './src/common/utils.js';
import { Command } from 'commander';

// 读取package.json获取版本信息
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));
const version = packageJson.version;

// 创建readline接口
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// 创建commander实例
const program = new Command();

// 配置命令行程序
program
  .name('joe-audit')
  .version(version, '-v, --version', '显示当前版本')
  .description('一个轻量级的前端依赖安全审计工具')
  .argument('[target]', '本地项目目录路径或远程仓库URL')
  .option('-o, --output <filename>', '自定义审计报告输出文件名', generateTimestampedFilename)
  .helpOption('-h, --help', '显示帮助信息')
  .addHelpText('after', `

示例：
  $ joe-audit               交互式审计当前目录
  $ joe-audit /path/to/project  审计指定本地目录
  $ joe-audit https://github.com/user/repo  审计远程仓库
  $ joe-audit -o my-audit.md  审计当前目录并自定义输出文件
  $ joe-audit /path/to/project -o project-audit.md  审计指定目录并自定义输出
`);

// 解析命令行参数
program.parse(process.argv);

// 获取解析结果
const options = program.opts();
const target = program.args[0];

// 处理命令行参数
async function processArgs() {
  let targetPath = target || '.';
  // 确保outputFile始终有值，使用默认生成函数
  let outputFile = options.output || generateTimestampedFilename();
  let isRemote = targetPath.startsWith('http://') || targetPath.startsWith('https://');

  // 如果没有提供target参数，交互式询问
  if (!target) {
    await new Promise((resolve) => {
      rl.question('是否检查当前目录？(y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          targetPath = '.';
        } else {
          rl.question('请输入要检查的目录路径或远程仓库链接: ', (path) => {
            targetPath = path;
            isRemote = targetPath.startsWith('http://') || targetPath.startsWith('https://');
            resolve();
          });
          return;
        }
        resolve();
      });
    });
  }

  // 解析完整路径（如果是本地目录）
  if (!isRemote) {
    targetPath = resolve(process.cwd(), targetPath);
  }

  // 确认最终参数
  console.log(`\n审计配置：`);
  console.log(`- 目标: ${targetPath}`);
  console.log(`- 类型: ${isRemote ? '远程仓库' : '本地目录'}`);
  console.log(`- 输出文件: ${outputFile}`);
  console.log(`\n开始审计...`);

  try {
    await auditPackage(targetPath, outputFile);
  } catch (error) {
    console.error(`
❌ 审计失败: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行命令行处理
processArgs();