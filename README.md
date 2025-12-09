# joe-audit

A lightweight security dependency audit tool for frontend projects, built on npm audit, providing a clean command-line interface and standard Markdown audit reports.

## Features

- ✅ **Fast Installation**: One-click installation via npm
- ✅ **Command-line Interface**: Intuitive and easy-to-use CLI tool
- ✅ **Interactive Operation**: Supports parameter-less query mode
- ✅ **Multi-target Support**: Local directory and remote repository auditing
- ✅ **Custom Output**: Support for specifying audit report filenames
- ✅ **Markdown Reports**: Generate standardized audit result documents
- ✅ **npm audit Integration**: Use npm's official audit functionality
- ✅ **Real-time Progress Display**: Dynamically show audit progress and current stage
- ✅ **Animation Effects**: Provide smooth rotation animations to enhance user experience

## System Requirements

- **Node.js**: v14.13.0 or higher (supports ES modules)
- **Dependencies**: Only `ejs` is required as a template engine

## Installation

### Local Installation (Recommended)

```bash
npm install joe-audit --save-dev
```

### Global Installation

```bash
npm install -g joe-audit
```

## Quick Start

### Command-line Usage

#### Basic Usage

```bash
# Interactive audit of current directory
joe-audit

# Audit specified local directory
joe-audit /path/to/your/project

# Audit remote repository
joe-audit https://github.com/yourusername/your-repo
```

#### Custom Output File

```bash
# Audit current directory and specify output file
joe-audit -o my-audit.md

# Audit specified directory and customize output
joe-audit /path/to/project -o project-audit.md

# Audit remote repository and customize output
joe-audit https://github.com/yourusername/your-repo -o repo-audit.md
```

## Available Command Aliases

The tool provides multiple command aliases, you can choose to use according to your personal preference:

- `joe-audit` (Recommended)
- `joeaudit`
- `joeAudit`
- `JoeAudit`

## Command Parameters

| Parameter | Short | Description |
|-----------|-------|-------------|
| `<target>` | - | Audit target, which can be a local directory path or remote repository URL |
| `--output <filename>` | `-o` | Custom audit report output filename<br/>Default: joe-audit-result-YYYYMMDDHHMMSS.md |
| `--help` | `-h` | Show help information |
| `--version` | `-v` | Show current version |

## Help Command

```bash
joe-audit --help
```

## Usage as Node.js Module

```javascript
import { auditPackage } from 'joe-audit';

// Audit local project
await auditPackage('/path/to/local/project', 'audit-result.md');

// Audit remote repository
await auditPackage('https://github.com/yourusername/your-repo', 'repo-audit.md');
```

### API

#### `auditPackage(projectRoot, outputFile)`

Execute frontend dependency security audit.

**Parameters:**
- `projectRoot` (string): Project root directory path or remote repository URL
- `outputFile` (string): Audit report output filename

**Return Value:**
- `Promise<void>`: Promise resolved after audit completion

## Progress Display

During the audit process, the tool will display a progress bar in real-time, allowing you to understand the current audit progress:

### Progress Bar Information

The progress bar includes the following information:
- **Completion percentage**: Shows the overall progress of the audit
- **Current stage**: Shows the current step of the audit (7 steps total)
- **Animation effect**: Shows a rotation animation in time-consuming steps (| → / → - → \)

### Audit Steps

The complete audit process includes the following 7 steps:
1. Create temporary working directory
2. Parse project structure and dependency information
3. Generate dependency lock file
4. Execute security audit
5. Generate audit report
6. Clean up temporary files
7. Save audit results

### Progress Bar Example
```
进度: [██████████████████░░░░░░░░░░░░░░░░░░░░░] 50% | 阶段: 步骤 4/7 | 执行安全审计 /
```

## Audit Report Format

The generated Markdown report contains the following content:
- Project name and audit title
- Audit results summary
- Vulnerability details (if any):
  - Vulnerability level (High/Medium/Low)
  - Vulnerability description
  - Affected packages and versions
  - Fix recommendations

## Example Output

```markdown
# `your-project` Audit Results

## Audit Summary

✅ No security vulnerabilities found

All direct and indirect dependencies passed the security audit.
```

## License
ISC

## Contributing

Welcome to submit Issues and Pull Requests to help improve this tool!

## Feedback

If you encounter any problems during use, please submit an Issue on the GitHub repository:
[https://github.com/qiao915/joe-audit/issues](https://github.com/qiao915/joe-audit/issues)

## Languages

- [English](README.md) (current)
- [中文](README.CN.md)