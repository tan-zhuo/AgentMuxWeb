import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://agentmux.pro',
  // 产出 en.html / docs.html 等平铺文件，保持与旧静态站完全一致的 URL
  build: { format: 'file' },
});
