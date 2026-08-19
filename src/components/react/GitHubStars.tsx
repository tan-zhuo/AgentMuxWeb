import { useEffect, useState } from 'react';

/**
 * 导航栏 GitHub 星标徽章 —— 站内首个 React 岛屿，作为后续迭代的范式：
 * 在 .astro 中以 <GitHubStars client:load /> 挂载，仅此组件水合，页面其余部分保持纯静态。
 */
export default function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.github.com/repos/tan-zhuo/AgentMux')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d && typeof d.stargazers_count === 'number' && d.stargazers_count > 0) {
          setStars(d.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (stars === null) return null;
  const text = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars);

  return (
    <span className="gh-stars">
      <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
      </svg>
      {text}
    </span>
  );
}
