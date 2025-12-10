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
  .version(version, '-v, --version', 'Display current version / 显示当前版本')
  .description('A lightweight security dependency audit tool for frontend projects / 一个轻量级的前端依赖安全审计工具')
  .argument('[target]', 'Local project directory path or remote repository URL / 本地项目目录路径或远程仓库URL')
  .option('-o, --output <filename>', 'Custom audit report output filename (default: joe-audit-result-YYYYMMDDHHmmss.md) / 自定义审计报告输出文件名 (默认: joe-audit-result-YYYYMMDDHHmmss.md)', generateTimestampedFilename)
  .helpOption('-h, --help', 'Display help information / 显示帮助信息')
  .addHelpText('after', `

Examples / 示例：
  $ joe-audit               Interactive audit of current directory / 交互式审计当前目录
  $ joe-audit /path/to/project  Audit specified local directory / 审计指定本地目录
  $ joe-audit https://github.com/user/repo  Audit remote repository / 审计远程仓库
  $ joe-audit -o my-audit.md  Audit current directory with custom output / 审计当前目录并自定义输出文件
  $ joe-audit /path/to/project -o project-audit.md  Audit specified directory with custom output / 审计指定目录并自定义输出
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
        rl.question('Check current directory? (y/n): ', (answer) => {
          if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
            targetPath = '.';
          } else {
            rl.question('Please enter directory path or remote repository URL: ', (path) => {
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
  console.log(`
Audit configuration:`);
  console.log(`- Target: ${targetPath}`);
  console.log(`- Type: ${isRemote ? 'Remote repository' : 'Local directory'}`);
  console.log(`- Output file: ${outputFile}`);
  console.log(`
Starting audit...`);

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