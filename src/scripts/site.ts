/* AgentMux 站点交互（TypeScript）。
   GitHub 星标徽章已迁移为 React 岛屿：src/components/react/GitHubStars.tsx */

/* 吸顶导航状态 */
const nav = document.querySelector<HTMLElement>('.nav');
if (nav) {
  const onScroll = (): void => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 移动端菜单 */
  const burger = nav.querySelector<HTMLButtonElement>('.nav-burger');
  if (burger) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });
    nav.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((a) => {
      a.addEventListener('click', () => nav.classList.remove('menu-open'));
    });
  }

  /* 语言下拉 */
  const langMenu = nav.querySelector<HTMLElement>('.lang-menu');
  const langBtn = langMenu?.querySelector<HTMLButtonElement>('.lang-switch');
  if (langMenu && langBtn) {
    langBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => langMenu.classList.remove('open'));
  }
}

/* 滚动渐显 */
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

/* Hero 活动流：错峰入场，周期性重播 */
const logBody = document.querySelector<HTMLElement>('[data-log]');
if (logBody) {
  const lines = Array.from(logBody.children) as HTMLElement[];
  const play = (): void => {
    lines.forEach((el, i) => {
      el.style.animation = 'none';
      void el.offsetWidth; /* 触发 reflow 以重启动画 */
      el.style.animation = '';
      el.style.animationDelay = `${0.35 + i * 0.38}s`;
    });
  };
  play();
  window.setInterval(play, 14000);
}

/* 文档侧栏 scrollspy */
const toc = document.querySelector<HTMLElement>('[data-toc]');
if (toc && 'IntersectionObserver' in window) {
  const byId = new Map<string, HTMLAnchorElement>();
  toc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    byId.set(a.getAttribute('href')!.slice(1), a);
  });
  let current: HTMLAnchorElement | null = null;
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          current?.classList.remove('active');
          current = byId.get(entry.target.id) ?? null;
          current?.classList.add('active');
        }
      }
    },
    { rootMargin: '-15% 0px -70% 0px' },
  );
  for (const id of byId.keys()) {
    const section = document.getElementById(id);
    if (section) spy.observe(section);
  }
}
