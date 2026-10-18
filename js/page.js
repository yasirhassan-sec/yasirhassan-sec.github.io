/* Lightweight script for the writeup pages: theme, header, code copy buttons. */
(() => {
  'use strict';
  const root = document.documentElement;

  document.getElementById('themeBtn')?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* storage unavailable */ }
  });

  const header = document.querySelector('.header');
  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('.prose pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-code';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code')?.innerText ?? pre.innerText);
        btn.textContent = 'Copied';
      } catch {
        btn.textContent = 'Failed';
      }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });
    pre.appendChild(btn);
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
