/**
 * 解析代码托管平台 URL，支持 GitHub、GitLab、Gitee
 * 支持格式：
 *   - GitHub: https://github.com/owner/repo, https://github.com/owner/repo/tree/branch
 *   - GitLab: https://gitlab.com/owner/repo, https://gitlab.com/owner/repo/-/tree/branch
 *   - Gitee: https://gitee.com/owner/repo, https://gitee.com/owner/repo/tree/branch
 *
 * @param {string} url - 代码仓库 URL
 * @returns {Object} { platform, owner, repo, path }
 * @throws {Error} 如果 URL 格式不合法或无法解析
 */
function parseGitUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    let platform;

    // 识别平台
    if (hostname.endsWith('github.com')) {
      platform = 'github';
    } else if (hostname.endsWith('gitlab.com') || hostname.includes('gitlab.')) {
      platform = 'gitlab';
    } else if (hostname.endsWith('gitee.com')) {
      platform = 'gitee';
    } else {
      throw new Error(`Unsupported platform: ${hostname}. Only GitHub, GitLab, and Gitee are supported.`);
    }

    // 获取路径并去除空字符串（如开头的 /）
    let pathParts = parsedUrl.pathname.split('/').filter(Boolean);

    // 处理 GitLab 的特殊前缀 "-/
    if (platform === 'gitlab' && pathParts[2] === '-') {
      pathParts = pathParts.slice(0, 2).concat(pathParts.slice(3));
    }

    // 至少需要 owner 和 repo 两段
    if (pathParts.length < 2) {
      throw new Error(
        `Invalid ${platform} repository URL: insufficient path segments. Expected format: https://${hostname}/owner/repo`
      );
    }

    const owner = pathParts[0];
    let repo = pathParts[1];
    // 移除仓库名末尾的 .git 后缀
    if (repo.endsWith('.git')) {
      repo = repo.slice(0, -4);
    }
    const restPath = pathParts.slice(2); // 剩余路径，如 ['tree', 'v5.2.2']

    // 构造 path：如果有后续路径，则以 '/' 开头拼接；否则为空字符串
    const path = restPath.length > 0 ? '/' + restPath.join('/') : '';

    return { platform, owner, repo, path };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Invalid URL format. Please provide a valid URL like https://github.com/owner/repo');
    }
    throw error;
  }
}

/**
 * 根据不同平台生成对应的 package.json Raw URL
 *
 * @param {Object} gitInfo - 解析后的git信息对象 { platform, owner, repo, path }
 * @returns {string} package.json 的 Raw URL
 */
async function getPackageJsonUrl(gitInfo) {
  const { platform, owner, repo, path } = gitInfo;
  let branch = 'main'; // 默认使用main分支
  
  // 从path中提取分支名
  if (path.startsWith('/tree/')) {
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      branch = pathParts[1]; // 使用tree后的分支名
    }
  }
  
  // 根据平台生成不同的Raw URL
  switch (platform) {
    case 'github':
      return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/package.json`;
    case 'gitlab':
      return `https://gitlab.com/${owner}/${repo}/-/raw/${branch}/package.json`;
    case 'gitee':
      return `https://gitee.com/${owner}/${repo}/raw/${branch}/package.json`;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

/**
 * 解析远程项目，获取package.json内容
 *
 * @param {string} repoUrl - 代码仓库URL
 * @returns {Object} package.json内容
 * @throws {Error} 如果解析失败或无法获取package.json
 */
export async function parseRemoteProject(repoUrl) {
  try {
    const gitInfo = parseGitUrl(repoUrl);
    
    // 尝试获取package.json，先使用main分支，如果失败则使用master分支
    let packageJsonUrl = await getPackageJsonUrl(gitInfo);
    let response = await fetch(packageJsonUrl);
    
    // 如果main分支失败且不是因为URL路径中的tree指定了分支，则尝试master分支
    if (!response.ok && response.status === 404 && !gitInfo.path.startsWith('/tree/')) {
      // 修改gitInfo中的路径，使用master分支
      const gitInfoWithMaster = { ...gitInfo };
      gitInfoWithMaster.path = '/tree/master';
      packageJsonUrl = await getPackageJsonUrl(gitInfoWithMaster);
      response = await fetch(packageJsonUrl);
    }
    
    if (!response.ok) {
      // 针对不同状态码提供更具体的错误信息
      if (response.status === 404) {
        throw new Error(`Failed to find package.json at ${packageJsonUrl}. Make sure the repository has a package.json file and the branch is correct.`);
      }
      throw new Error(`Failed to fetch package.json: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    // 包装错误信息，提供更友好的提示
    throw new Error(`Remote project parsing failed: ${error.message}`);
  }
}
