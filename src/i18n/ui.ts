// 站点四种语言的公共区文案（导航 / 页脚 / 无障碍标签）。
// 页面正文仍在各语言的 .astro 页面里维护。

export const SITE = 'https://agentmux.pro';
export const GITHUB = 'https://github.com/tan-zhuo/AgentMux';
export const BLOG = 'https://tanzhuo.xyz';

export type LangCode = 'zh' | 'en' | 'ja' | 'ru';
export type PageKind = 'landing' | 'docs';

export interface LangMeta {
  code: LangCode;
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  label: string;
  landing: string;
  docs: string;
}

export interface NavStrings {
  capabilities: string;
  features: string;
  security: string;
  docs: string;
  quickstart: string;
  download: string;
  faq: string;
}

export interface FooterStrings {
  tagline: string;
  social: { github: string; download: string; issues: string; blog: string };
  productTitle: string;
  product: { capabilities: string; features: string; security: string; download: string; faq: string };
  resourcesTitle: string;
  resources: { quickstart: string; docs: string; dev: string; orchestrator: string; releases: string };
  communityTitle: string;
  community: { github: string; issues: string; contribute: string; blog: string };
  license: string;
  motto: string;
  status: string;
}

export interface UIStrings {
  nav: NavStrings;
  langAria: string;
  menuAria: string;
  logoAlt: string;
  footer: FooterStrings;
}

// 语言顺序即下拉菜单顺序
export const LANGS: readonly LangMeta[] = [
  { code: 'zh', htmlLang: 'zh-CN', hreflang: 'zh-CN', ogLocale: 'zh_CN', label: '中文', landing: 'index.html', docs: 'docs.html' },
  { code: 'en', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', label: 'English', landing: 'en.html', docs: 'docs-en.html' },
  { code: 'ja', htmlLang: 'ja', hreflang: 'ja', ogLocale: 'ja_JP', label: '日本語', landing: 'ja.html', docs: 'docs-ja.html' },
  { code: 'ru', htmlLang: 'ru', hreflang: 'ru', ogLocale: 'ru_RU', label: 'Русский', landing: 'ru.html', docs: 'docs-ru.html' },
] as const;

export function langMeta(code: LangCode): LangMeta {
  const meta = LANGS.find((l) => l.code === code);
  if (!meta) throw new Error(`Unknown language: ${code}`);
  return meta;
}

export const UI: Record<LangCode, UIStrings> = {
  zh: {
    nav: { capabilities: '核心能力', features: '产品一览', security: '安全模型', docs: '文档', quickstart: '快速上手', download: '下载', faq: 'FAQ' },
    langAria: 'Language', menuAria: '菜单', logoAlt: 'AgentMux logo',
    footer: {
      tagline: 'AI 编程 Agent 的桌面控制平面。会话由 tmux 保障持久，状态是一份本地 SQLite——没有服务端，没有账号，没有守护进程。',
      social: { github: 'GitHub', download: '下载最新版本', issues: '反馈问题', blog: '作者博客 tanzhuo.xyz' },
      productTitle: '产品',
      product: { capabilities: '核心能力', features: '产品一览', security: '安全模型', download: '下载', faq: '常见问题' },
      resourcesTitle: '资源',
      resources: { quickstart: '快速上手', docs: '使用文档', dev: '构建与发布', orchestrator: '编排器设计', releases: '版本历史' },
      communityTitle: '社区',
      community: { github: 'GitHub', issues: 'Issue 反馈', contribute: '参与贡献', blog: '作者博客' },
      license: 'MIT License', motto: '为长时间值守而设计', status: '所有状态保存在本机',
    },
  },
  en: {
    nav: { capabilities: 'Capabilities', features: 'Tour', security: 'Security', docs: 'Docs', quickstart: 'Get Started', download: 'Download', faq: 'FAQ' },
    langAria: 'Language', menuAria: 'Menu', logoAlt: 'AgentMux logo',
    footer: {
      tagline: 'A desktop control plane for AI coding agents. Sessions persist through tmux, and all state is one local SQLite file — no server, no account, no daemon.',
      social: { github: 'GitHub', download: 'Download latest release', issues: 'Report an issue', blog: "Author's blog — tanzhuo.xyz" },
      productTitle: 'Product',
      product: { capabilities: 'Capabilities', features: 'Product Tour', security: 'Security Model', download: 'Download', faq: 'FAQ' },
      resourcesTitle: 'Resources',
      resources: { quickstart: 'Get Started', docs: 'Documentation', dev: 'Build & Release', orchestrator: 'Orchestrator Design', releases: 'Release History' },
      communityTitle: 'Community',
      community: { github: 'GitHub', issues: 'Issues', contribute: 'Contribute', blog: "Author's Blog" },
      license: 'MIT License', motto: 'Built for the long watch', status: 'All state stays on your machine',
    },
  },
  ja: {
    nav: { capabilities: '主な機能', features: 'ツアー', security: 'セキュリティ', docs: 'ドキュメント', quickstart: 'はじめる', download: 'ダウンロード', faq: 'FAQ' },
    langAria: '言語', menuAria: 'メニュー', logoAlt: 'AgentMuxのロゴ',
    footer: {
      tagline: 'AIコーディングエージェントのためのデスクトップコントロールプレーン。セッションはtmuxで永続化され、すべての状態はローカルのSQLiteファイル1つに収まります — サーバーも、アカウントも、デーモンも不要です。',
      social: { github: 'GitHub', download: '最新リリースをダウンロード', issues: '問題を報告', blog: '作者のブログ — tanzhuo.xyz' },
      productTitle: '製品',
      product: { capabilities: '主な機能', features: 'プロダクトツアー', security: 'セキュリティモデル', download: 'ダウンロード', faq: 'FAQ' },
      resourcesTitle: 'リソース',
      resources: { quickstart: 'はじめる', docs: 'ドキュメント', dev: 'ビルドとリリース', orchestrator: 'オーケストレーター設計', releases: 'リリース履歴' },
      communityTitle: 'コミュニティ',
      community: { github: 'GitHub', issues: 'Issues', contribute: 'コントリビュート', blog: '作者のブログ' },
      license: 'MIT License', motto: '長い見守りのために', status: 'すべての状態はあなたのマシンに留まります',
    },
  },
  ru: {
    nav: { capabilities: 'Возможности', features: 'Обзор', security: 'Безопасность', docs: 'Документация', quickstart: 'Старт', download: 'Скачать', faq: 'Вопросы' },
    langAria: 'Язык', menuAria: 'Меню', logoAlt: 'Логотип AgentMux',
    footer: {
      tagline: 'Настольная панель управления ИИ-агентами для кода. Сессии живут в tmux, а всё состояние — один локальный файл SQLite: без сервера, аккаунта и демона.',
      social: { github: 'GitHub', download: 'Скачать последний выпуск', issues: 'Сообщить о проблеме', blog: 'Блог автора — tanzhuo.xyz' },
      productTitle: 'Продукт',
      product: { capabilities: 'Возможности', features: 'Обзор продукта', security: 'Модель безопасности', download: 'Скачать', faq: 'Вопросы' },
      resourcesTitle: 'Ресурсы',
      resources: { quickstart: 'Начало работы', docs: 'Документация', dev: 'Сборка и выпуск', orchestrator: 'Устройство оркестратора', releases: 'История выпусков' },
      communityTitle: 'Сообщество',
      community: { github: 'GitHub', issues: 'Задачи', contribute: 'Участие в разработке', blog: 'Блог автора' },
      license: 'Лицензия MIT', motto: 'Создан для долгой вахты', status: 'Всё состояние остаётся на вашей машине',
    },
  },
};
