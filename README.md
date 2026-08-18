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

## SEO 域名占位符

canonical / hreflang / og:url / sitemap 里统一使用了占位域名 `https://agentmux.tanzhuo.xyz`。
正式域名定下来后全局替换一次即可：

```bash
grep -rl 'agentmux.tanzhuo.xyz' --include='*.html' --include='*.xml' --include='*.txt' . \
  | xargs sed -i 's|agentmux.tanzhuo.xyz|你的域名|g'
```

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
