#!/usr/bin/env node

import { auditPackage } from './src/entry/index.js';
import { createInterface } from 'readline';
import { join, resolve } from 'path';
import { readFileSync } from 'fs';

// 读取package.json获取版本信息
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));
const version = packageJson.version;

// 帮助信息
const helpMessage = `
joe-audit v${version}

一个轻量级的前端依赖安全审计工具

用法：
  joe-audit [选项] [目标]

选项：
  -o, --output <文件名>    自定义审计报告输出文件名, 默认: joe-audit-result-YYYYMMDDHHMMSS.md
  -h, --help              显示帮助信息
  -v, --version           显示当前版本

目标：
  <目录路径>              本地项目目录路径
  <远程仓库URL>           远程Git仓库URL

示例：
  joe-audit               交互式审计当前目录
  joe-audit /path/to/project  审计指定本地目录
  joe-audit https://github.com/user/repo  审计远程仓库
  joe-audit -o my-audit.md  审计当前目录并自定义输出文件
  joe-audit /path/to/project -o project-audit.md  审计指定目录并自定义输出
`;

// 创建readline接口
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// 解析命令行参数
const args = process.argv.slice(2);

// 检查版本和帮助参数
if (args.includes('--version') || args.includes('-v')) {
  console.log(`joe-audit v${version}`);
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(helpMessage);
  process.exit(0);
}

// 生成带时间戳的默认输出文件名
function generateDefaultOutputFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `joe-audit-result-${year}${month}${day}${hours}${minutes}${seconds}.md`;
}

// 处理命令行参数
async function processArgs() {
  let targetPath = '.';
  let outputFile = generateDefaultOutputFilename();
  let isRemote = false;

  // 解析参数
  if (args.length > 0) {
    // 检查是否有自定义输出文件
    if (args[0] === '-o' || args[0] === '--output') {
      if (args[1]) {
        outputFile = args[1];
        // 检查是否还有目标路径参数
        if (args[2]) {
          targetPath = args[2];
          isRemote = targetPath.startsWith('http://') || targetPath.startsWith('https://');
        }
      } else {
        console.error('错误: -o/--output 参数需要指定输出文件名');
        rl.close();
        process.exit(1);
      }
    } else {
      // 第一个参数是目标路径
      targetPath = args[0];
      isRemote = targetPath.startsWith('http://') || targetPath.startsWith('https://');
      // 检查是否有自定义输出文件
      if (args[1] === '-o' || args[1] === '--output') {
        if (args[2]) {
          outputFile = args[2];
        } else {
          console.error('错误: -o/--output 参数需要指定输出文件名');
          rl.close();
          process.exit(1);
        }
      }
    }
  } else {
    // 没有参数，交互式询问
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
    console.log(`\n✅ 审计完成！结果已保存到: ${outputFile}`);
  } catch (error) {
    console.error(`\n❌ 审计失败: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// 运行命令行处理
processArgs();