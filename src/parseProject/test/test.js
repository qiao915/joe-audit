import { parseProject } from '../index.js';

// 测试本地项目解析
async function testLocalProject() {
  const localProjectPath = '/Users/yuanjin/Desktop/mcp-audit';
  try {
    const packageJson = await parseProject(localProjectPath);
    console.log('Local project parsed successfully:', packageJson);
  } catch (error) {
    console.error('Local project parsing failed:', error);
  }
}

// 测试远程项目解析
async function testRemoteProject() {
  const remoteProjectUrl = 'https://github.com/webpack/webpack';
  try {
    const packageJson = await parseProject(remoteProjectUrl);
    console.log('Remote project parsed successfully:', packageJson);
  } catch (error) {
    console.error('Remote project parsing failed:', error);
  }
}

testLocalProject();
testRemoteProject();
