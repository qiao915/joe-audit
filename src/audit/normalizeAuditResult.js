/**
 * 标准化包信息
 * @param {Object} packageInfo 原始包信息
 * @param {Object} allVulnerabilities 所有漏洞信息，用于处理依赖链
 * @returns {Object|null} 标准化后的包信息
 */
function _normalizePackage(packageInfo, allVulnerabilities) {
  const { via = [], version, name: packageName } = packageInfo;
  
  // 处理via字段，过滤掉null和空字符串
  const validVia = via.filter((it) => it != null && it !== '');
  
  // 如果没有有效的via项，直接返回null
  if (validVia.length === 0) {
    return null;
  }
  
  // 标准化problems字段，确保包含模板所需的所有字段
  const problems = [];
  
  // 处理viaItem - 可以是对象数组（直接包含漏洞信息）或字符串数组（依赖包名称）
  validVia.forEach((viaItem) => {
    // 情况1: viaItem是对象，直接包含漏洞信息
    if (typeof viaItem === 'object' && viaItem !== null) {
      problems.push({
        source: viaItem.source || '',
        name: viaItem.name || packageName,
        dependency: viaItem.dependency || packageName,
        title: viaItem.title || '',
        url: viaItem.url || '',
        severity: viaItem.severity || '',
        cwe: viaItem.cwe || [],
        cvss: viaItem.cvss || {},
        range: viaItem.range || ''
      });
    }
    // 情况2: viaItem是字符串，表示依赖包名称
    else if (typeof viaItem === 'string') {
      // 如果依赖包在allVulnerabilities中，递归获取其漏洞信息
      if (allVulnerabilities[viaItem]) {
        const dependencyPackage = allVulnerabilities[viaItem];
        // 递归处理依赖包的漏洞信息
        if (dependencyPackage.via && Array.isArray(dependencyPackage.via)) {
          dependencyPackage.via.forEach((depViaItem) => {
            if (typeof depViaItem === 'object' && depViaItem !== null) {
              problems.push({
                source: depViaItem.source || '',
                name: depViaItem.name || viaItem,
                dependency: depViaItem.dependency || viaItem,
                title: depViaItem.title || '',
                url: depViaItem.url || '',
                severity: depViaItem.severity || '',
                cwe: depViaItem.cwe || [],
                cvss: depViaItem.cvss || {},
                range: depViaItem.range || ''
              });
            }
          });
        }
      }
    }
  });
  
  // 如果没有提取到有效的漏洞信息，返回null
  if (problems.length === 0) {
    return null;
  }
  
  // 注意：npm audit已经为我们过滤了当前版本的漏洞，只报告实际安装的依赖版本中存在的漏洞
  // 因此，我们不需要自己实现复杂的版本过滤逻辑
  
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
    name: packageInfo.name || 'unknown',
    version: packageInfo.version || '',
    severity: packageInfo.severity,
    via: validVia,
    problems: problems, // 使用标准化后的problems字段
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
  
  // 获取所有漏洞信息，用于处理依赖链
  const allVulnerabilities = auditResult.vulnerabilities || {};
  
  for (const key in allVulnerabilities) {
    const packageInfo = allVulnerabilities[key];
    const normalizedPackage = _normalizePackage(packageInfo, allVulnerabilities);
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