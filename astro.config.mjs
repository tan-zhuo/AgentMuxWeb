import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://agentmux.pro',
  // 产出 en.html / docs.html 等平铺文件，保持与旧静态站完全一致的 URL
  build: { format: 'file' },
  // React 岛屿：静态内容零 JS，交互组件用 React 写并按需水合（client:load / client:visible）
  integrations: [react()],
});
