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
      result[normalizedPackage.severity].push(normalizedPackage);
    }
  }
  return result;

  function _normalizePackage(packageInfo) {
    const { via = [] } = packageInfo;
    const validVia = via.filter((it) => typeof it === 'object');
    if (validVia.length === 0) {
      return null;
    }
    const info = {
      name: packageInfo.name,
      severity: packageInfo.severity,
      problems: validVia,
      nodes: packageInfo.nodes || [],
      fixAvailable: packageInfo.fixAvailable || null
    };
    // 简化实现：使用nodes作为依赖链信息
    // 使用原始的依赖链信息，而不是文件路径信息
    info.depChains = packageInfo.depChains || [];
    return info;
  }
}

function isInvalidChain(chain, packageName) {
  return chain.length === 0 || (chain.length === 1 && chain[0] === packageName);
}

export function normalizeAuditResult(auditResult) {
  return {
    vulnerabilities: _normalizeVulnerabilities(auditResult),
  };
}
