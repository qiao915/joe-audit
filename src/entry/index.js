import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { generateLock } from '../generateLock/index.js';
import { audit } from '../audit/index.js';
import { render } from '../render/index.js';
import fs from 'fs';
import { generateTimestampedFilename } from '../common/utils.js';
import cliProgress from 'cli-progress';

/**
 * 根据项目根目录，审计项目中所有的包（含项目本身）
 * @param {string} projectRoot 项目根目录，可以是本地目录的绝对路径，也可以是远程仓库的URL
 * @param {string} savePath 保存审计结果的文件名，审计结果是一个标准格式的markdown字符串
 */
export async function auditPackage(projectRoot, savePath) {
  // 如果没有提供savePath，则生成带时间戳的默认文件名
  const finalSavePath = savePath || generateTimestampedFilename();
  
  console.log(`开始审计: ${projectRoot}`);
  console.log(`报告将保存到: ${finalSavePath}\n`);
  
  // 创建进度条实例
  const progressBar = new cliProgress.SingleBar({
    format: '进度: [{bar}] {percentage}% | 阶段: {stage} | {message}',
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    stopOnComplete: true
  });
  
  // 定义旋转动画字符序列
  const spinChars = ['|', '/', '-', '\\'];
  let spinIndex = 0;
  
  // 旋转动画函数
  function startSpinAnimation(stage, originalMessage) {
    const interval = setInterval(() => {
      const spinChar = spinChars[spinIndex];
      spinIndex = (spinIndex + 1) % spinChars.length;
      // 更新进度条的message，添加旋转动画字符
      progressBar.update(currentStep, {
        stage: stage,
        message: `${originalMessage} ${spinChar}`
      });
    }, 200);
    
    return () => {
      clearInterval(interval);
    };
  }
  
  const totalSteps = 7;
  let currentStep = 0;
  
  progressBar.start(totalSteps, 0, {
    stage: '准备中',
    message: '初始化审计流程'
  });
  
  let workDir;
  try {
    // 1. 创建工作目录
    currentStep++;
    progressBar.update(currentStep, {
      stage: '步骤 1/7',
      message: '创建临时工作目录'
    });
    workDir = await createWorkDir();
    
    // 2. 解析项目，向工作目录添加package.json
    currentStep++;
    const step2Message = '解析项目结构和依赖信息';
    progressBar.update(currentStep, {
      stage: '步骤 2/7',
      message: step2Message
    });
    const stopAnimation2 = startSpinAnimation('步骤 2/7', step2Message);
    const packageJson = await parseProject(projectRoot);
    stopAnimation2();
    progressBar.update(currentStep, {
      stage: '步骤 2/7',
      message: `${step2Message} ✅`
    });
    
    // 判断是否是远程仓库
    const isRemote = typeof projectRoot === 'string' && (projectRoot.startsWith('http://') || projectRoot.startsWith('https://'));
    
    // 3. 生成依赖锁定文件
    currentStep++;
    const step3Message = '生成依赖锁定文件';
    progressBar.update(currentStep, {
      stage: '步骤 3/7',
      message: step3Message
    });
    const stopAnimation3 = startSpinAnimation('步骤 3/7', step3Message);
    await generateLock(workDir, packageJson, isRemote ? projectRoot : null);
    stopAnimation3();
    progressBar.update(currentStep, {
      stage: '步骤 3/7',
      message: `${step3Message} ✅`
    });
    
    // 4. 对工作目录进行审计
    currentStep++;
    const step4Message = '执行安全审计';
    progressBar.update(currentStep, {
      stage: '步骤 4/7',
      message: step4Message
    });
    const stopAnimation4 = startSpinAnimation('步骤 4/7', step4Message);
    const auditResult = await audit(workDir, packageJson);
    stopAnimation4();
    progressBar.update(currentStep, {
      stage: '步骤 4/7',
      message: `${step4Message} ✅`
    });
    
    // 5. 渲染审计结果
    currentStep++;
    progressBar.update(currentStep, {
      stage: '步骤 5/7',
      message: '生成审计报告'
    });
    const renderedResult = await render(auditResult, packageJson, projectRoot);
    
    // 6. 删除工作目录
    currentStep++;
    progressBar.update(currentStep, {
      stage: '步骤 6/7',
      message: '清理临时文件'
    });
    await deleteWorkDir(workDir);
    workDir = null; // 标记为已清理
    
    // 7. 将结果保存到指定路径
    currentStep++;
    progressBar.update(currentStep, {
      stage: '步骤 7/7',
      message: '保存审计结果'
    });
    await fs.promises.writeFile(finalSavePath, renderedResult);
    
    // 完成进度条
    progressBar.update(totalSteps, {
      stage: '完成',
      message: '审计流程已完成'
    });
    progressBar.stop();
    
    console.log(`\n✅ 审计完成！`);
    console.log(`报告已保存到: ${finalSavePath}`);
    
    return {
      reportPath: finalSavePath,
      result: auditResult
    };
  } catch (error) {
    // 停止进度条并显示错误
    progressBar.stop();
    
    console.error(`\n❌ 审计失败: ${error.message}`);
    
    // 显示更多错误详情（仅在开发模式或需要调试时）
    if (process.env.DEBUG) {
      console.error('详细错误信息:', error);
    }
    
    // 重新抛出错误，让上层处理
    throw error;
  } finally {
    if (workDir) {
      try {
        // 确保临时目录被清理，即使中间步骤出错
        await deleteWorkDir(workDir);
        console.log('✅ 临时工作目录清理完成');
      } catch (cleanupError) {
        // 清理失败时不影响主流程
        console.warn(`警告: 无法清理临时工作目录 ${workDir}: ${cleanupError.message}`);
      }
    }
  }
}
