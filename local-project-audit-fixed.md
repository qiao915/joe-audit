# `oyetalk-front-adminPortal-pc`审计结果

## 检测目标

**文件路径:** `/Users/wuqiao/Job/YBD/oyetalk/Code/oyetalk-front-adminPortal-pc`

您所审计的工程总共有 **33** 个风险漏洞。

其中：

- **严重漏洞**：共计 **7** 个
- **高危漏洞**：共计 **18** 个
- **中危漏洞**：共计 **6** 个
- **低危漏洞**：共计 **2** 个

> 说明：
>
> - **严重**漏洞被认为是极其严重的，应该立即修复。
> - **高危**漏洞被认为是严重的，应该尽快修复。
> - **中危**漏洞被认为是中等严重的，可以选择在时间允许时修复。
> - **低危**漏洞被认为是轻微的，可以根据自行需要进行修复。

下面是漏洞的详细信息

## 严重漏洞
共计 **7** 个

### `babel-traverse`
**漏洞描述**：
- Babel vulnerable to arbitrary code execution when compiling specifically crafted malicious code
  - npm漏洞编号：`1096879`
  - 漏洞详细说明：https://github.com/advisories/GHSA-67hx-6x53-jw92
  - 漏洞等级：严重
  - 受影响的版本：`<7.23.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/babel-traverse`

**漏洞包所在目录**：
- `node_modules/babel-traverse`

**修复建议**：
- 将 `babel-traverse` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `ejs`
**漏洞描述**：
- ejs template injection vulnerability
  - npm漏洞编号：`1089270`
  - 漏洞详细说明：https://github.com/advisories/GHSA-phwq-j96m-2c2q
  - 漏洞等级：严重
  - 受影响的版本：`<3.1.7`
- ejs lacks certain pollution protection
  - npm漏洞编号：`1098366`
  - 漏洞详细说明：https://github.com/advisories/GHSA-ghr5-ch3p-vcr6
  - 漏洞等级：中危
  - 受影响的版本：`<3.1.10`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/ejs`

**漏洞包所在目录**：
- `node_modules/ejs`

**修复建议**：
- 将 `ejs` 更新到版本 ``

### `form-data`
**漏洞描述**：
- form-data uses unsafe random function in form-data for choosing boundary
  - npm漏洞编号：`1109540`
  - 漏洞详细说明：https://github.com/advisories/GHSA-fjxv-7rqg-78g4
  - 漏洞等级：严重
  - 受影响的版本：`<2.5.4`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/form-data`

**漏洞包所在目录**：
- `node_modules/form-data`

**修复建议**：
- 将 `form-data` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `loader-utils`
**漏洞描述**：
- Prototype pollution in webpack loader-utils
  - npm漏洞编号：`1094088`
  - 漏洞详细说明：https://github.com/advisories/GHSA-76p3-8jx3-jpfq
  - 漏洞等级：严重
  - 受影响的版本：`<1.4.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/loader-utils`

**漏洞包所在目录**：
- `node_modules/@vue/cli-service/node_modules/loader-utils`

**修复建议**：
- 将 `loader-utils` 更新到版本 ``

### `lodash`
**漏洞描述**：
- Command Injection in lodash
  - npm漏洞编号：`1106913`
  - 漏洞详细说明：https://github.com/advisories/GHSA-35jh-r3h4-6jhm
  - 漏洞等级：高危
  - 受影响的版本：`<4.17.21`
- Prototype Pollution in lodash
  - npm漏洞编号：`1106918`
  - 漏洞详细说明：https://github.com/advisories/GHSA-jf85-cpcp-j695
  - 漏洞等级：严重
  - 受影响的版本：`<4.17.12`
- Prototype Pollution in lodash
  - npm漏洞编号：`1106920`
  - 漏洞详细说明：https://github.com/advisories/GHSA-p6mc-m468-83gw
  - 漏洞等级：高危
  - 受影响的版本：`>=3.7.0 <4.17.19`
- Regular Expression Denial of Service (ReDoS) in lodash
  - npm漏洞编号：`1108258`
  - 漏洞详细说明：https://github.com/advisories/GHSA-29mw-wpgm-hmr9
  - 漏洞等级：中危
  - 受影响的版本：`>=4.0.0 <4.17.21`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/lodash`

**漏洞包所在目录**：
- `node_modules/microcli/node_modules/lodash`

**修复建议**：
- 将 `lodash` 更新到版本 `4.1.3`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `request`
**漏洞描述**：
- Server-Side Request Forgery in Request
  - npm漏洞编号：`1096727`
  - 漏洞详细说明：https://github.com/advisories/GHSA-p8p7-x288-28g6
  - 漏洞等级：中危
  - 受影响的版本：`<=2.88.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/request`

**漏洞包所在目录**：
- `node_modules/request`

**修复建议**：
- 将 `request` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `underscore`
**漏洞描述**：
- Arbitrary Code Execution in underscore
  - npm漏洞编号：`1109570`
  - 漏洞详细说明：https://github.com/advisories/GHSA-cf4h-3jhx-xvhq
  - 漏洞等级：严重
  - 受影响的版本：`>=1.3.2 <1.12.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/underscore`

**漏洞包所在目录**：
- `node_modules/underscore`

**修复建议**：
- 将 `underscore` 更新到版本 ``

## 高危漏洞
共计 **18** 个

### `axios`
**漏洞描述**：
- Axios vulnerable to Server-Side Request Forgery
  - npm漏洞编号：`1090049`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4w2v-q235-vp99
  - 漏洞等级：中危
  - 受影响的版本：`<0.21.1`
- Axios Cross-Site Request Forgery Vulnerability
  - npm漏洞编号：`1097679`
  - 漏洞详细说明：https://github.com/advisories/GHSA-wf5p-g6vw-rhxx
  - 漏洞等级：中危
  - 受影响的版本：`>=0.8.1 <0.28.0`
- axios Inefficient Regular Expression Complexity vulnerability
  - npm漏洞编号：`1102326`
  - 漏洞详细说明：https://github.com/advisories/GHSA-cph5-m8f7-6c5x
  - 漏洞等级：高危
  - 受影响的版本：`<0.21.2`
- Axios is vulnerable to DoS attack through lack of data size check
  - npm漏洞编号：`1108262`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4hjh-wcwx-xvwj
  - 漏洞等级：高危
  - 受影响的版本：`<0.30.2`
- axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL
  - npm漏洞编号：`1111034`
  - 漏洞详细说明：https://github.com/advisories/GHSA-jr5f-v2jv-69x6
  - 漏洞等级：高危
  - 受影响的版本：`<0.30.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/axios`

**漏洞包所在目录**：
- `node_modules/axios`

**修复建议**：
- 将 `axios` 更新到版本 `1.13.2`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `braces`
**漏洞描述**：
- Regular Expression Denial of Service in braces
  - npm漏洞编号：`1085715`
  - 漏洞详细说明：https://github.com/advisories/GHSA-g95f-p29q-9xw4
  - 漏洞等级：低危
  - 受影响的版本：`<2.3.1`
- Uncontrolled resource consumption in braces
  - npm漏洞编号：`1098094`
  - 漏洞详细说明：https://github.com/advisories/GHSA-grv7-fg5c-xmjg
  - 漏洞等级：高危
  - 受影响的版本：`<3.0.3`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/braces`

**漏洞包所在目录**：
- `node_modules/braces`
- `node_modules/jest-cli/node_modules/braces`
- `node_modules/jest-config/node_modules/braces`
- `node_modules/jest-haste-map/node_modules/braces`
- `node_modules/jest-message-util/node_modules/braces`
- `node_modules/jest-runtime/node_modules/braces`
- `node_modules/test-exclude/node_modules/braces`

**修复建议**：
- 将 `braces` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `cross-spawn`
**漏洞描述**：
- Regular Expression Denial of Service (ReDoS) in cross-spawn
  - npm漏洞编号：`1104663`
  - 漏洞详细说明：https://github.com/advisories/GHSA-3xgq-45jj-v275
  - 漏洞等级：高危
  - 受影响的版本：`<6.0.6`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/cross-spawn`

**漏洞包所在目录**：
- `node_modules/clipboardy/node_modules/cross-spawn`
- `node_modules/yorkie/node_modules/cross-spawn`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

### `follow-redirects`
**漏洞描述**：
- Exposure of Sensitive Information to an Unauthorized Actor in follow-redirects
  - npm漏洞编号：`1092623`
  - 漏洞详细说明：https://github.com/advisories/GHSA-pw2r-vq6v-hr8c
  - 漏洞等级：中危
  - 受影响的版本：`<1.14.8`
- follow-redirects' Proxy-Authorization header kept across hosts
  - npm漏洞编号：`1096856`
  - 漏洞详细说明：https://github.com/advisories/GHSA-cxjh-pqwp-8mfp
  - 漏洞等级：中危
  - 受影响的版本：`<=1.15.5`
- Exposure of sensitive information in follow-redirects
  - npm漏洞编号：`1102323`
  - 漏洞详细说明：https://github.com/advisories/GHSA-74fj-2j2h-c42q
  - 漏洞等级：高危
  - 受影响的版本：`<1.14.7`
- Follow Redirects improperly handles URLs in the url.parse() function
  - npm漏洞编号：`1109569`
  - 漏洞详细说明：https://github.com/advisories/GHSA-jchw-25xp-jwwc
  - 漏洞等级：中危
  - 受影响的版本：`<1.15.4`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/follow-redirects`

**漏洞包所在目录**：
- `node_modules/follow-redirects`

**修复建议**：
- 将 `follow-redirects` 更新到版本 `1.13.2`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `html-minifier`
**漏洞描述**：
- kangax html-minifier REDoS vulnerability
  - npm漏洞编号：`1105440`
  - 漏洞详细说明：https://github.com/advisories/GHSA-pfq8-rq6v-vf5m
  - 漏洞等级：高危
  - 受影响的版本：`<=4.0.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/html-minifier`

**漏洞包所在目录**：
- `node_modules/html-minifier`

**修复建议**：
- 将 `html-minifier` 更新到版本 ``

### `http-proxy-middleware`
**漏洞描述**：
- Denial of service in http-proxy-middleware
  - npm漏洞编号：`1100223`
  - 漏洞详细说明：https://github.com/advisories/GHSA-c7qv-q95q-8v27
  - 漏洞等级：高危
  - 受影响的版本：`<2.0.7`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/http-proxy-middleware`

**漏洞包所在目录**：
- `node_modules/http-proxy-middleware`

**修复建议**：
- 将 `http-proxy-middleware` 更新到版本 ``

### `ip`
**漏洞描述**：
- ip SSRF improper categorization in isPublic
  - npm漏洞编号：`1101851`
  - 漏洞详细说明：https://github.com/advisories/GHSA-2p57-rm9w-gvfp
  - 漏洞等级：高危
  - 受影响的版本：`<=2.0.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/ip`

**漏洞包所在目录**：
- `node_modules/ip`

**修复建议**：
- 将 `ip` 更新到版本 ``

### `json5`
**漏洞描述**：
- Prototype Pollution in JSON5 via Parse Method
  - npm漏洞编号：`1096543`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9c47-m6qq-7p4h
  - 漏洞等级：高危
  - 受影响的版本：`<1.0.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/json5`

**漏洞包所在目录**：
- `node_modules/json5`

**修复建议**：
- 将 `json5` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `merge`
**漏洞描述**：
- Prototype Pollution in merge
  - npm漏洞编号：`1096479`
  - 漏洞详细说明：https://github.com/advisories/GHSA-7wpw-2hjm-89gp
  - 漏洞等级：高危
  - 受影响的版本：`<2.1.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/merge`

**漏洞包所在目录**：
- `node_modules/merge`

**修复建议**：
- 将 `merge` 更新到版本 ``

### `micromatch`
**漏洞描述**：
- Regular Expression Denial of Service (ReDoS) in micromatch
  - npm漏洞编号：`1098681`
  - 漏洞详细说明：https://github.com/advisories/GHSA-952p-6rrq-rcjv
  - 漏洞等级：中危
  - 受影响的版本：`<4.0.8`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/micromatch`

**漏洞包所在目录**：
- `node_modules/jest-cli/node_modules/micromatch`
- `node_modules/jest-config/node_modules/micromatch`
- `node_modules/jest-haste-map/node_modules/micromatch`
- `node_modules/jest-message-util/node_modules/micromatch`
- `node_modules/jest-runtime/node_modules/micromatch`
- `node_modules/micromatch`
- `node_modules/svg-baker/node_modules/micromatch`
- `node_modules/test-exclude/node_modules/micromatch`

**修复建议**：
- 将 `micromatch` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `node-forge`
**漏洞描述**：
- Prototype Pollution in node-forge debug API.
  - npm漏洞编号：`1088227`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5rrq-pxf6-6jx5
  - 漏洞等级：低危
  - 受影响的版本：`<1.0.0`
- URL parsing in node-forge could lead to undesired behavior.
  - npm漏洞编号：`1088229`
  - 漏洞详细说明：https://github.com/advisories/GHSA-gf8q-jrpm-jvxq
  - 漏洞等级：低危
  - 受影响的版本：`<1.0.0`
- Improper Verification of Cryptographic Signature in `node-forge`
  - npm漏洞编号：`1088746`
  - 漏洞详细说明：https://github.com/advisories/GHSA-2r2c-g63r-vccr
  - 漏洞等级：中危
  - 受影响的版本：`<1.3.0`
- Open Redirect in node-forge
  - npm漏洞编号：`1093719`
  - 漏洞详细说明：https://github.com/advisories/GHSA-8fr3-hfg3-gpgp
  - 漏洞等级：中危
  - 受影响的版本：`<1.0.0`
- Improper Verification of Cryptographic Signature in node-forge
  - npm漏洞编号：`1102321`
  - 漏洞详细说明：https://github.com/advisories/GHSA-x4jg-mjrx-434g
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.0`
- Improper Verification of Cryptographic Signature in node-forge
  - npm漏洞编号：`1102322`
  - 漏洞详细说明：https://github.com/advisories/GHSA-cfm4-qjh2-4765
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.0`
- node-forge has ASN.1 Unbounded Recursion
  - npm漏洞编号：`1110996`
  - 漏洞详细说明：https://github.com/advisories/GHSA-554w-wpv2-vw27
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.2`
- node-forge has an Interpretation Conflict vulnerability via its ASN.1 Validator Desynchronization
  - npm漏洞编号：`1110998`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5gfm-wpxj-wjgq
  - 漏洞等级：高危
  - 受影响的版本：`<1.3.2`
- node-forge is vulnerable to ASN.1 OID Integer Truncation
  - npm漏洞编号：`1111068`
  - 漏洞详细说明：https://github.com/advisories/GHSA-65ch-62r8-g69g
  - 漏洞等级：中危
  - 受影响的版本：`<1.3.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/node-forge`

**漏洞包所在目录**：
- `node_modules/node-forge`

**修复建议**：
- 将 `node-forge` 更新到版本 ``

### `nth-check`
**漏洞描述**：
- Inefficient Regular Expression Complexity in nth-check
  - npm漏洞编号：`1095141`
  - 漏洞详细说明：https://github.com/advisories/GHSA-rp65-9cf3-cjxr
  - 漏洞等级：高危
  - 受影响的版本：`<2.0.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/nth-check`

**漏洞包所在目录**：
- `node_modules/postcss-svgo/node_modules/nth-check`

**修复建议**：
- 将 `nth-check` 更新到版本 ``

### `path-to-regexp`
**漏洞描述**：
- path-to-regexp outputs backtracking regular expressions
  - npm漏洞编号：`1101848`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9wv6-86v2-598j
  - 漏洞等级：高危
  - 受影响的版本：`>=2.0.0 <3.3.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/path-to-regexp`

**漏洞包所在目录**：
- `node_modules/path-to-regexp`

**修复建议**：
- 将 `path-to-regexp` 更新到版本 `8.3.0`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `serialize-javascript`
**漏洞描述**：
- Cross-Site Scripting in serialize-javascript
  - npm漏洞编号：`1087544`
  - 漏洞详细说明：https://github.com/advisories/GHSA-h9rv-jmmf-4pgx
  - 漏洞等级：中危
  - 受影响的版本：`<2.1.1`
- Insecure serialization leading to RCE in serialize-javascript
  - npm漏洞编号：`1095131`
  - 漏洞详细说明：https://github.com/advisories/GHSA-hxcc-f52p-wc94
  - 漏洞等级：高危
  - 受影响的版本：`<3.1.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/serialize-javascript`

**漏洞包所在目录**：
- `node_modules/copy-webpack-plugin/node_modules/serialize-javascript`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

### `ssri`
**漏洞描述**：
- Regular Expression Denial of Service (ReDoS)
  - npm漏洞编号：`1094077`
  - 漏洞详细说明：https://github.com/advisories/GHSA-vx3p-948g-6vhq
  - 漏洞等级：高危
  - 受影响的版本：`>=5.2.2 <6.0.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/ssri`

**漏洞包所在目录**：
- `node_modules/copy-webpack-plugin/node_modules/ssri`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

### `webpack-dev-middleware`
**漏洞描述**：
- Path traversal in webpack-dev-middleware
  - npm漏洞编号：`1096729`
  - 漏洞详细说明：https://github.com/advisories/GHSA-wr3j-pwj9-hqq6
  - 漏洞等级：高危
  - 受影响的版本：`<=5.3.3`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/webpack-dev-middleware`

**漏洞包所在目录**：
- `node_modules/webpack-dev-middleware`

**修复建议**：
- 将 `webpack-dev-middleware` 更新到版本 ``

### `webpack-dev-server`
**漏洞描述**：
- webpack-dev-server users' source code may be stolen when they access a malicious web site with non-Chromium based browser
  - npm漏洞编号：`1108429`
  - 漏洞详细说明：https://github.com/advisories/GHSA-9jgg-88mc-972h
  - 漏洞等级：中危
  - 受影响的版本：`<=5.2.0`
- webpack-dev-server users' source code may be stolen when they access a malicious web site
  - npm漏洞编号：`1108430`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4v9v-hfq4-rm2v
  - 漏洞等级：中危
  - 受影响的版本：`<=5.2.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/webpack-dev-server`

**漏洞包所在目录**：
- `node_modules/webpack-dev-server`

**修复建议**：
- 将 `webpack-dev-server` 更新到版本 ``

### `xlsx`
**漏洞描述**：
- Denial of Service in SheetJS Pro
  - npm漏洞编号：`1089698`
  - 漏洞详细说明：https://github.com/advisories/GHSA-g973-978j-2c3p
  - 漏洞等级：中危
  - 受影响的版本：`<0.17.0`
- Denial of Service in SheetJS Pro
  - npm漏洞编号：`1089699`
  - 漏洞详细说明：https://github.com/advisories/GHSA-3x9f-74h4-2fqr
  - 漏洞等级：中危
  - 受影响的版本：`<0.17.0`
- Denial of Service in SheetsJS Pro
  - npm漏洞编号：`1089700`
  - 漏洞详细说明：https://github.com/advisories/GHSA-8vcr-vxm8-293m
  - 漏洞等级：中危
  - 受影响的版本：`<0.17.0`
- Prototype Pollution in sheetJS
  - npm漏洞编号：`1108110`
  - 漏洞详细说明：https://github.com/advisories/GHSA-4r6h-8v6p-xvw6
  - 漏洞等级：高危
  - 受影响的版本：`<0.19.3`
- SheetJS Regular Expression Denial of Service (ReDoS)
  - npm漏洞编号：`1108111`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5pgg-2g8v-p4x9
  - 漏洞等级：高危
  - 受影响的版本：`<0.20.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/xlsx`

**漏洞包所在目录**：
- `node_modules/xlsx`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

## 中危漏洞
共计 **6** 个

### `node-notifier`
**漏洞描述**：
- OS Command Injection in node-notifier
  - npm漏洞编号：`1086436`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5fw9-fq32-wv5p
  - 漏洞等级：中危
  - 受影响的版本：`<8.0.1`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/node-notifier`

**漏洞包所在目录**：
- `node_modules/node-notifier`

**修复建议**：
- 将 `node-notifier` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `postcss`
**漏洞描述**：
- Regular Expression Denial of Service in postcss
  - npm漏洞编号：`1093539`
  - 漏洞详细说明：https://github.com/advisories/GHSA-566m-qj78-rww5
  - 漏洞等级：中危
  - 受影响的版本：`<7.0.36`
- PostCSS line return parsing error
  - npm漏洞编号：`1109574`
  - 漏洞详细说明：https://github.com/advisories/GHSA-7fh5-64p2-3v2j
  - 漏洞等级：中危
  - 受影响的版本：`<8.4.31`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/postcss`

**漏洞包所在目录**：
- `node_modules/css-loader/node_modules/postcss`
- `node_modules/icss-utils/node_modules/postcss`
- `node_modules/postcss`
- `node_modules/postcss-modules-extract-imports/node_modules/postcss`
- `node_modules/postcss-modules-local-by-default/node_modules/postcss`
- `node_modules/postcss-modules-scope/node_modules/postcss`
- `node_modules/postcss-modules-values/node_modules/postcss`
- `node_modules/svg-baker/node_modules/postcss`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

### `tough-cookie`
**漏洞描述**：
- tough-cookie Prototype Pollution vulnerability
  - npm漏洞编号：`1097682`
  - 漏洞详细说明：https://github.com/advisories/GHSA-72xf-g2v4-qvf3
  - 漏洞等级：中危
  - 受影响的版本：`<4.1.3`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/tough-cookie`

**漏洞包所在目录**：
- `node_modules/tough-cookie`

**修复建议**：
- 将 `tough-cookie` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `vue-template-compiler`
**漏洞描述**：
- vue-template-compiler vulnerable to client-side Cross-Site Scripting (XSS)
  - npm漏洞编号：`1098721`
  - 漏洞详细说明：https://github.com/advisories/GHSA-g3ch-rx76-35fx
  - 漏洞等级：中危
  - 受影响的版本：`>=2.0.0 <3.0.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/vue-template-compiler`

**漏洞包所在目录**：
- `node_modules/vue-template-compiler`

**修复建议**：
- 目前没有自动修复建议，请关注官方公告或社区解决方案

### `yargs-parser`
**漏洞描述**：
- yargs-parser Vulnerable to Prototype Pollution
  - npm漏洞编号：`1088811`
  - 漏洞详细说明：https://github.com/advisories/GHSA-p9pc-299p-vxgp
  - 漏洞等级：中危
  - 受影响的版本：`>=6.0.0 <13.1.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/yargs-parser`

**漏洞包所在目录**：
- `node_modules/jest-cli/node_modules/yargs-parser`
- `node_modules/jest-runtime/node_modules/yargs-parser`

**修复建议**：
- 将 `yargs-parser` 更新到版本 `5.0.9`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `zrender`
**漏洞描述**：
- Prototype Pollution in the merge and clone helper methods
  - npm漏洞编号：`1101086`
  - 漏洞详细说明：https://github.com/advisories/GHSA-fhv8-fx5f-7fxf
  - 漏洞等级：中危
  - 受影响的版本：`<=4.3.2`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/zrender`

**漏洞包所在目录**：
- `node_modules/zrender`

**修复建议**：
- 将 `zrender` 更新到版本 `6.0.0`
- 注意：这是一个主版本升级，可能包含不兼容的更改

## 低危漏洞
共计 **2** 个

### `tmp`
**漏洞描述**：
- tmp allows arbitrary temporary file / directory write via symbolic link `dir` parameter
  - npm漏洞编号：`1109537`
  - 漏洞详细说明：https://github.com/advisories/GHSA-52f5-9888-hmc6
  - 漏洞等级：低危
  - 受影响的版本：`<=0.2.3`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/tmp`

**漏洞包所在目录**：
- `node_modules/tmp`

**修复建议**：
- 将 `tmp` 更新到版本 `9.39.1`
- 注意：这是一个主版本升级，可能包含不兼容的更改

### `vue`
**漏洞描述**：
- ReDoS vulnerability in vue package that is exploitable through inefficient regex evaluation in the parseHTML function
  - npm漏洞编号：`1100238`
  - 漏洞详细说明：https://github.com/advisories/GHSA-5j4c-8p2g-v4jx
  - 漏洞等级：低危
  - 受影响的版本：`>=2.0.0-alpha.1 <3.0.0-alpha.0`

**依赖关系**：

- `oyetalk-front-adminPortal-pc/vue`

**漏洞包所在目录**：
- `node_modules/vue`

**修复建议**：
- 将 `vue` 更新到版本 `0.2.6`
- 注意：这是一个主版本升级，可能包含不兼容的更改

## 依赖管理建议

### 修复优先级建议

1. **立即修复严重(Critical)漏洞**：
   - 这些漏洞可能导致系统被完全控制或数据泄露
   - 建议在24小时内修复所有严重漏洞

2. **尽快修复高危(High)漏洞**：
   - 这些漏洞可能导致重要功能被破坏或敏感信息泄露
   - 建议在7天内修复所有高危漏洞

3. **计划修复中危(Moderate)漏洞**：
   - 这些漏洞在特定条件下可能被利用
   - 建议在下一个版本更新中修复所有中危漏洞

4. **评估修复低危(Low)漏洞**：
   - 这些漏洞通常影响较小
   - 建议根据项目实际情况评估是否需要修复

### 依赖版本管理建议

1. **使用固定版本号**：
   - 避免在package.json中使用波浪号(~)或插入符号(^)指定版本
   - 使用精确版本号可以避免意外引入有漏洞的依赖版本

2. **定期更新依赖**：
   - 使用`npm outdated`命令检查过时的依赖
   - 考虑使用`npm-check-updates`或类似工具批量更新依赖
   - 定期更新依赖可以获取安全修复和性能改进

3. **移除未使用的依赖**：
   - 定期检查并移除项目中不再使用的依赖
   - 减少依赖数量可以降低安全风险和项目复杂度

4. **使用依赖锁定文件**：
   - 确保项目中包含package-lock.json或yarn.lock文件
   - 锁定文件可以确保团队成员和部署环境使用相同版本的依赖

### 安全审计建议

1. **集成到CI/CD流程**：
   - 将依赖审计集成到持续集成/持续部署流程中
   - 在代码提交或部署前自动运行依赖审计

2. **定期手动审计**：
   - 即使依赖没有变化，也建议定期手动运行依赖审计
   - 新的漏洞可能在依赖发布后被发现

3. **关注安全公告**：
   - 关注常用依赖的安全公告和更新
   - 考虑使用安全监控服务跟踪依赖的安全状态

