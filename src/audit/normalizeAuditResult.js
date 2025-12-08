function _normalizeVulnerabilities(auditResult) {
  const result = {
    critical: [],
    high: [],
    moderate: [],
    low: [],
  };
  for (const key in auditResult.vulnerabilities) {
    const packageInfo = auditResult.vulnerabilities[key];
    const normalizedPackage = _normalizePackage(packageInfo, auditResult.vulnerabilities);
    if (normalizedPackage) {
      result[normalizedPackage.severity].push(normalizedPackage);
    }
  }
  return result;

  function _normalizePackage(packageInfo, allVulnerabilities) {
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
    
    // 构建完整的依赖链：从当前包开始，通过effects字段向上追踪
    info.depChains = _buildDependencyChains(packageInfo.name, allVulnerabilities);
    return info;
  }
  
  function _buildDependencyChains(packageName, allVulnerabilities) {
    const chains = [];
    const visited = new Set();
    
    function dfs(currentName, path) {
      // 避免循环依赖
      if (visited.has(currentName)) {
        chains.push(path);
        return;
      }
      
      visited.add(currentName);
      const currentPackage = allVulnerabilities[currentName];
      
      // 如果没有effects或者effects为空，说明已经到达顶层依赖
      if (!currentPackage || !currentPackage.effects || currentPackage.effects.length === 0) {
        chains.push(path);
        visited.delete(currentName);
        return;
      }
      
      // 遍历所有上层依赖
      currentPackage.effects.forEach(effectName => {
        dfs(effectName, [effectName, ...path]);
      });
      
      visited.delete(currentName);
    }
    
    // 从当前包开始构建依赖链
    dfs(packageName, [packageName]);
    return chains;
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
