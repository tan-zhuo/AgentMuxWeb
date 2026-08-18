# AgentMux 官网

AgentMux（<https://github.com/tan-zhuo/AgentMux>）的宣传官网。纯静态站点，无构建步骤、无外部依赖。

## 结构

```
index.html          中文主页（默认）
en.html / ja.html / ru.html        英 / 日 / 俄语主页
docs.html           中文使用文档（安装 / 快速开始 / 操作 / 编排器 / 故障排查）
docs-en.html / docs-ja.html / docs-ru.html   英 / 日 / 俄语使用文档
sitemap.xml         站点地图（8 个 URL，含 hreflang，SEO）
robots.txt          爬虫规则（SEO）
assets/css/style.css  全站样式（设计系统：深海军蓝 + 信号蓝 + 翠绿，取自应用图标）
assets/js/main.js     交互（吸顶导航、语言下拉、滚动渐显、Hero 活动流动画、文档侧栏 scrollspy、GitHub 星标）
assets/img/           图标与产品实拍截图（来自主仓库 docs/）
```

语言切换为导航右上角的下拉菜单；四种语言通过 hreflang 互链，新增语言时记得同步
所有页面的 hreflang 块、语言下拉与 sitemap。

## 域名与 SEO 策略

**主域名：`agentmux.pro`** —— canonical / hreflang / og:url / 结构化数据 / sitemap 全部指向它。

**辅域名：`agentmux.ink`** —— 必须配置 **301 永久重定向**到 agentmux.pro 的对应路径
（保留 path，如 `agentmux.ink/docs.html` → `agentmux.pro/docs.html`）。
两个域名同时提供内容会被搜索引擎判为重复内容、分散权重，切勿双解析到同一站点。

301 配置方式（按托管平台选其一）：

- **Cloudflare**（推荐）：两个域名都接入，agentmux.ink 加 Redirect Rule：
  `(http.host eq "agentmux.ink")` → 动态重定向 `concat("https://agentmux.pro", http.request.uri.path)`，301。
- **Nginx / Caddy 自托管**：agentmux.ink 的 server 块只写一条
  `return 301 https://agentmux.pro$request_uri;`（Caddy：`redir https://agentmux.pro{uri} permanent`）。
- **GitHub Pages**：Pages 只支持单个自定义域名，绑 agentmux.pro；agentmux.ink 用域名注册商
  的 URL 转发（选 301）指到 https://agentmux.pro。

上线后到 Google Search Console / Bing Webmaster 提交 `https://agentmux.pro/sitemap.xml`。

## 本地预览

```bash
python3 -m http.server 8931
# 打开 http://localhost:8931/
```

## 部署

任何静态托管均可：GitHub Pages、Cloudflare Pages、Vercel、Netlify、对象存储 + CDN。
把整个目录作为站点根目录发布即可，无需构建命令。

- GitHub Pages：推送本目录到仓库，Settings → Pages → 选择分支根目录。
- 自定义域名：在托管平台绑定后，如需可添加 `CNAME` 文件。

## 更新截图

产品截图直接取自主仓库：

```bash
cp /root/AgentMux/docs/{terminal,broadcast,install,themes}.png assets/img/
cp /root/AgentMux/docs/demo.gif assets/img/
```
