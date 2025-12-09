import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前模块的文件名和目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 注意：npm audit已经为我们过滤了当前版本的漏洞，只报告实际安装的依赖版本中存在的漏洞
// 因此，我们不需要自己实现复杂的版本过滤逻辑

/**
 * 标准化包信息
 * @param {Object} packageInfo 原始包信息
 * @returns {Object|null} 标准化后的包信息
 */
function _normalizePackage(packageInfo) {
  const { via = [], version } = packageInfo;
  // 只保留对象类型的via项（与原始代码保持一致的过滤逻辑）
  const validVia = via.filter((it) => typeof it === 'object');
  
  // 注意：npm audit已经为我们过滤了当前版本的漏洞，只报告实际安装的依赖版本中存在的漏洞
  // 因此，我们不需要自己实现复杂的版本过滤逻辑
  
  // 如果没有有效的via项，直接返回null
  if (validVia.length === 0) {
    return null;
  }
  
  // 处理fixAvailable字段，支持对象和布尔值两种格式
  let fixAvailable = packageInfo.fixAvailable || null;
  if (fixAvailable) {
    if (typeof fixAvailable === 'object') {
      // 如果是对象格式，保留原始结构
      fixAvailable = {
        name: fixAvailable.name || '',
        version: fixAvailable.version || '',
        isSemVerMajor: fixAvailable.isSemVerMajor || false
      };
    } else {
      // 如果是布尔值true，转换为对象格式
      fixAvailable = {
        name: '',
        version: '',
        isSemVerMajor: false
      };
    }
  }
  
  const info = {
    name: packageInfo.name,
    version: packageInfo.version || '',
    severity: packageInfo.severity,
    via: validVia,
    problems: validVia, // 保持problems字段以兼容模板
    nodes: packageInfo.nodes || [],
    fixAvailable
  };
  
  // 简化实现：使用nodes作为依赖链信息（与原始代码保持一致）
  info.depChains = packageInfo.nodes ? [packageInfo.nodes] : [];
  
  return info;
}

/**
 * 标准化漏洞信息
 * @param {Object} auditResult 审计结果
 * @returns {Object} 按严重程度分类的漏洞信息
 */
function _normalizeVulnerabilities(auditResult) {
  const result = {
    critical: [],
    high: [],
    moderate: [],
    low: [],
  };
  
  for (const key in auditResult.vulnerabilities) {
    const packageInfo = auditResult.vulnerabilities[key];
    const normalizedPackage = _normalizePackage(packageInfo);
    if (normalizedPackage) {
      // 确保severity是有效的
      const severity = normalizedPackage.severity || 'low';
      // 将漏洞添加到对应的严重程度数组中
      if (result[severity]) {
        result[severity].push(normalizedPackage);
      } else {
        // 如果是未知的严重程度，默认添加到low数组
        result.low.push(normalizedPackage);
      }
    }
  }
  
  return result;
}

/**
 * 标准化npm audit的结果
 * @param {Object} rawAuditResult npm audit的原始结果
 * @returns {Object} 标准化后的审计结果
 */
export function normalizeAuditResult(rawAuditResult) {
  // 如果 rawAuditResult 不是有效的对象，返回空的漏洞结构
  if (!rawAuditResult || typeof rawAuditResult !== 'object') {
    return {
      vulnerabilities: {
        critical: [],
        high: [],
        moderate: [],
        low: [],
      },
    };
  }
  
  // 如果没有 vulnerabilities 字段，返回空的漏洞结构
  if (!rawAuditResult.vulnerabilities || typeof rawAuditResult.vulnerabilities !== 'object') {
    return {
      vulnerabilities: {
        critical: [],
        high: [],
        moderate: [],
        low: [],
      },
    };
  }
  
  // 标准化漏洞数据
  const vulnerabilities = _normalizeVulnerabilities(rawAuditResult);
  
  // 返回与原结构一致的结果
  return {
    vulnerabilities,
  };
}