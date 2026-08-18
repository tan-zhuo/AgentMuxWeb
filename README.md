# AgentMux 官网

AgentMux（<https://github.com/tan-zhuo/AgentMux>）的宣传官网。基于 **Astro** 的静态站点，
产物为纯静态 HTML，默认零客户端框架 JS。

## 开发

```bash
npm install
npm run dev      # 开发服务器（热更新）
npm run build    # 构建到 dist/
npm run preview  # 本地预览构建产物
```

## 结构

```
astro.config.mjs        site: agentmux.pro；build.format 'file' 保持 en.html 等平铺 URL
src/
  layouts/Base.astro    head（SEO/hreflang/OG/JSON-LD）+ 导航 + 脚本（含 Vercel 监控）
  components/Nav.astro  导航（含语言下拉），文案取自 i18n 字典
  components/Footer.astro  页脚（仅落地页使用）
  i18n/ui.js            四种语言的公共区文案（导航/页脚/无障碍标签）与语言表
  pages/                8 个页面：index/en/ja/ru（落地页）+ docs 四语（正文按语言各自维护）
  styles/global.css     全站样式（设计系统：深海军蓝 + 信号蓝 + 翠绿，取自应用图标）
  scripts/site.js       交互（吸顶导航、语言下拉、滚动渐显、Hero 活动流、scrollspy、GitHub 星标）
public/
  assets/img/           图标与产品实拍截图（来自主仓库 docs/）
  sitemap.xml           站点地图（8 个 URL，含 hreflang）
  robots.txt
```

改公共区（导航/页脚/SEO 头部）只需动 `src/i18n/ui.js` 或对应组件，一处生效全部 8 页。
新增语言：在 `ui.js` 的 `LANGS` 与 `UI` 加一项，再添加两个 pages 文件即可。
资产缓存指纹由 Astro 自动处理（`_astro/*.hash.css`），无需手动版本号。

## 部署（Vercel）

仓库导入 Vercel 即可——自动识别 Astro，构建命令 `astro build`，输出 `dist/`。

- **监控**：代码已接入 `@vercel/analytics`（访问统计）与 `@vercel/speed-insights`
  （Core Web Vitals），仅在生产构建注入。首次部署后需在 Vercel 项目里启用
  **Analytics** 与 **Speed Insights** 两个开关，数据才开始采集。
  非 Vercel 环境下探针脚本 404，静默无副作用。
- 其他静态托管同样可用：`npm run build` 后发布 `dist/` 目录。

## 域名与 SEO 策略

**主域名：`agentmux.pro`** —— canonical / hreflang / og:url / 结构化数据 / sitemap 全部指向它
（写在 `astro.config.mjs` 的 `site` 与 `src/i18n/ui.js` 的 `SITE`）。

**辅域名：`agentmux.ink`** —— 配置 **301 永久重定向**到 agentmux.pro 的对应路径。
两个域名同时出内容会被判重复内容、分散权重。

- **Vercel**：两个域名都加到项目 Domains，把 agentmux.ink 设为
  "Redirect to agentmux.pro"（308/301），Vercel 会自动保留路径。
- **Cloudflare**：agentmux.ink 加 Redirect Rule 动态重定向
  `concat("https://agentmux.pro", http.request.uri.path)`，301。
- **Nginx / Caddy**：`return 301 https://agentmux.pro$request_uri;`
  （Caddy：`redir https://agentmux.pro{uri} permanent`）。

上线后到 Google Search Console / Bing Webmaster 提交 `https://agentmux.pro/sitemap.xml`。

## 更新截图

产品截图直接取自主仓库：

```bash
cp /root/AgentMux/docs/{terminal,broadcast,install,themes}.png public/assets/img/
cp /root/AgentMux/docs/demo.gif public/assets/img/
```
