# joe-audit

A security dependency audit tool for local and remote projects

一个轻量级的前端依赖安全审计工具，基于npm audit构建，提供简洁的命令行界面和标准的Markdown格式审计报告。

## 功能特性

- ✅ **快速安装**：通过npm一键安装
- ✅ **命令行界面**：直观易用的CLI工具
- ✅ **交互式操作**：支持无参数询问模式
- ✅ **多目标支持**：本地目录和远程仓库审计
- ✅ **自定义输出**：支持指定审计报告文件名
- ✅ **Markdown报告**：生成标准化的审计结果文档
- ✅ **npm audit集成**：使用npm的官方审计功能
- ✅ **实时进度展示**：动态显示审计进度和当前阶段
- ✅ **动画效果**：提供流畅的旋转动画，增强用户体验

## 系统要求

- **Node.js**: v14.13.0 或更高版本（支持ES模块）
- **依赖**: 仅需 `ejs` 作为模板引擎

## 安装

### 本地安装（推荐）

```bash
npm install joe-audit --save-dev
```

### 全局安装

```bash
npm install -g joe-audit
```

## 快速开始

### 命令行使用

#### 基本用法

```bash
# 交互式审计当前目录
joe-audit

# 审计指定本地目录
joe-audit /path/to/your/project

# 审计远程仓库
joe-audit https://github.com/yourusername/your-repo
```

#### 自定义输出文件

```bash
# 审计当前目录并指定输出文件
joe-audit -o my-audit.md

# 审计指定目录并自定义输出
joe-audit /path/to/project -o project-audit.md

# 审计远程仓库并自定义输出
joe-audit https://github.com/yourusername/your-repo -o repo-audit.md
```

## 可用命令别名

该工具提供了多种命令别名，您可以根据个人偏好选择使用：

- `joe-audit` (推荐)
- `joeaudit`
- `joeAudit`
- `JoeAudit`

## 命令参数

| 参数 | 简写 | 描述 |
|------|------|------|
| `<target>` | - | 审计目标，可以是本地目录路径或远程仓库URL |
| `--output <filename>` | `-o` | 自定义审计报告输出文件名<br/>默认: joe-audit-result-YYYYMMDDHHMMSS.md |
| `--help` | `-h` | 显示帮助信息 |
| `--version` | `-v` | 显示当前版本 |

## 帮助命令

```bash
joe-audit --help
```

## 作为Node.js模块使用

```javascript
import { auditPackage } from 'joe-audit';

// 审计本地工程
await auditPackage('/path/to/local/project', 'audit-result.md');

// 审计远程仓库
await auditPackage('https://github.com/yourusername/your-repo', 'repo-audit.md');
```

### API

#### `auditPackage(projectRoot, outputFile)`

执行前端依赖安全审计。

**参数：**
- `projectRoot` (string): 项目根目录路径或远程仓库URL
- `outputFile` (string): 审计报告输出文件名

**返回值：**
- `Promise<void>`: 审计完成后解析的Promise

## 进度展示

在审计过程中，工具会实时显示一个进度条，让您了解当前审计的进展情况：

### 进度条信息

进度条包含以下信息：
- **完成百分比**：显示审计的整体进度
- **当前阶段**：显示审计的当前步骤（共7个步骤）
- **动画效果**：在耗时步骤中显示旋转动画（| → / → - → \）

### 审计步骤

完整的审计流程包括以下7个步骤：
1. 创建临时工作目录
2. 解析项目结构和依赖信息
3. 生成依赖锁定文件
4. 执行安全审计
5. 生成审计报告
6. 清理临时文件
7. 保存审计结果

### 进度条示例
```
进度: [██████████████████░░░░░░░░░░░░░░░░░░░░░] 50% | 阶段: 步骤 4/7 | 执行安全审计 /
```

## 审计报告格式

生成的Markdown报告包含以下内容：
- 项目名称和审计标题
- 审计结果摘要
- 漏洞详情（如果有）：
  - 漏洞等级（高危/中危/低危）
  - 漏洞描述
  - 影响的包和版本
  - 修复建议

## 示例输出

```markdown
# `your-project` 审计结果

## 审计摘要

✅ 未发现任何安全漏洞

所有直接依赖和间接依赖都通过了安全审计。
```

## 许可证
ISC


## 贡献

欢迎提交Issue和Pull Request来帮助改进这个工具！

## 问题反馈

如果在使用过程中遇到任何问题，请在GitHub仓库提交Issue：
[https://github.com/qiao915/joe-audit/issues](https://github.com/qiao915/joe-audit/issues)

