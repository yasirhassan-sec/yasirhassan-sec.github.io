/* ==========================================================================
   Yasir Hassan · Portfolio
   Vanilla JS, no dependencies. Each feature is a small self-contained module.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'yasirb169@gmail.com';

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, val) { try { localStorage.setItem(key, val); } catch { /* storage unavailable */ } }
  };

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Theme ---------- */
  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    store.set('theme', root.dataset.theme);
    $('meta[name="theme-color"]').content = root.dataset.theme === 'light' ? '#f6f8fb' : '#070b12';
  }
  $('#themeBtn').addEventListener('click', toggleTheme);

  /* ---------- Clipboard ---------- */
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast('Email copied to clipboard');
    } catch {
      location.href = `mailto:${EMAIL}`;
    }
  }
  $$('[data-copy-email]').forEach(btn => btn.addEventListener('click', copyEmail));

  /* ---------- Mobile menu ---------- */
  const navLinks = $('#navLinks');
  const menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Scroll: progress bar, header state, back-to-top ---------- */
  const header = $('header');
  const progress = $('#progress');
  const toTop = $('#toTop');
  let ticking = false;
  function onScroll() {
    const max = root.scrollHeight - innerHeight;
    const y = scrollY;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle('scrolled', y > 8);
    toTop.classList.toggle('show', y > innerHeight);
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ---------- Active nav link ---------- */
  const sections = $$('main section[id]');
  const linkFor = id => $(`#navLinks a[href="#${id}"]`);
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$('#navLinks a').forEach(a => a.classList.remove('active'));
      linkFor(e.target.id)?.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counterObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterObserver.unobserve(e.target);
    const el = e.target;
    const end = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split('.')[1] || '').length;
    if (reduceMotion) { el.textContent = end.toFixed(decimals); return; }
    const start = performance.now();
    const dur = 1200;
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (end * eased).toFixed(decimals);
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => counterObserver.observe(el));

  /* ---------- Rotating role ---------- */
  const roleEl = $('#role');
  if (roleEl && !reduceMotion) {
    const roles = JSON.parse(roleEl.dataset.roles);
    let r = 0, c = roles[0].length, deleting = true;
    (function tick() {
      roleEl.textContent = roles[r].slice(0, c);
      let delay = deleting ? 35 : 70;
      if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 300; }
      else if (!deleting && c === roles[r].length) { deleting = true; delay = 2200; }
      c += deleting ? -1 : 1;
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Terminal intro ---------- */
  const term = $('#term');
  const prompt = '<span class="t-p">yasir@kali</span>:<span class="t-c">~</span>$ ';
  const script = [
    { cmd: 'whoami' },
    { out: 'Yasir Hassan, Cybersecurity Intern @ Safe City Islamabad' },
    { cmd: 'cat focus.txt' },
    { out: '[+] Vulnerability Assessment\n[+] Web App Security (OWASP Top 10)\n[+] Cyber Threat Intelligence\n[+] Network Security' },
    { cmd: 'ls ~/projects' },
    { html: '<span class="t-w">vigilense/  milkiyat/  dastarkhwan/  hrms/  enterprise-net/</span>' },
    { cmd: '' }
  ];
  const wait = ms => new Promise(res => setTimeout(res, reduceMotion ? 0 : ms));
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let buffer = '';
  const render = (extra = '') => { term.innerHTML = buffer + extra + '<span class="cursor"></span>'; };
  (async () => {
    await wait(400);
    for (const line of script) {
      if ('cmd' in line) {
        buffer += prompt;
        for (let i = 0; i <= line.cmd.length; i++) { render(esc(line.cmd.slice(0, i))); await wait(55); }
        buffer += esc(line.cmd) + (line.cmd ? '\n' : '');
        await wait(280);
      } else {
        buffer += (line.html ?? esc(line.out)) + '\n';
        render();
        await wait(240);
      }
    }
    render();
  })();

  /* ---------- Project filters ---------- */
  const filterBtns = $$('.filter');
  const projectCards = $$('[data-cat]');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filterBtns.forEach(b => b.setAttribute('aria-pressed', b === btn));
    projectCards.forEach(card => {
      const match = f === 'all' || card.dataset.cat.split(' ').includes(f);
      card.classList.toggle('is-hidden', !match);
    });
  }));

  /* ---------- Card spotlight (follows the cursor) ---------- */
  if (matchMedia('(hover: hover)').matches) {
    $$('.spot').forEach(card => card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  }

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const f = new FormData(form);
    const body = `${f.get('message')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio inquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app with the message ready to send…';
    form.reset();
  });

  /* ---------- Command palette (Ctrl/⌘ + K) ---------- */
  const palette = $('#palette');
  const pInput = $('#paletteInput');
  const pList = $('#paletteList');
  const go = id => () => $(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  const open = url => () => window.open(url, '_blank', 'noopener');
  const commands = [
    { group: 'Navigate', label: 'About', hint: '#about', run: go('#about') },
    { group: 'Navigate', label: 'Experience', hint: '#experience', run: go('#experience') },
    { group: 'Navigate', label: 'Projects', hint: '#projects', run: go('#projects') },
    { group: 'Navigate', label: 'Skills', hint: '#skills', run: go('#skills') },
    { group: 'Navigate', label: 'Contact', hint: '#contact', run: go('#contact') },
    { group: 'Actions', label: 'Download résumé', hint: 'PDF', run: () => $('#resumeLink').click() },
    { group: 'Actions', label: 'Copy email address', hint: EMAIL, run: copyEmail },
    { group: 'Actions', label: 'Toggle light / dark theme', hint: 'theme', run: toggleTheme },
    { group: 'Links', label: 'GitHub', hint: 'yasirhassan-sec', run: open('https://github.com/yasirhassan-sec') },
    { group: 'Links', label: 'LinkedIn', hint: 'yasir-hassan-', run: open('https://www.linkedin.com/in/yasir-hassan-') },
    { group: 'Links', label: 'VigiLense repository', hint: 'github', run: open('https://github.com/yasirhassan-sec/vigilense') }
  ];
  let filtered = commands, active = 0, lastFocus = null;

  function renderPalette() {
    const q = pInput.value.trim().toLowerCase();
    filtered = commands.filter(c => (c.label + ' ' + c.group + ' ' + c.hint).toLowerCase().includes(q));
    active = Math.min(active, Math.max(filtered.length - 1, 0));
    if (!filtered.length) { pList.innerHTML = '<li class="p-empty">No results</li>'; return; }
    let html = '', group = '';
    filtered.forEach((c, i) => {
      if (c.group !== group) { group = c.group; html += `<li class="p-group" role="presentation">${group}</li>`; }
      html += `<li role="option" id="p-${i}" data-i="${i}" aria-selected="${i === active}" class="p-item${i === active ? ' active' : ''}">` +
              `<span>${c.label}</span><kbd>${c.hint}</kbd></li>`;
    });
    pList.innerHTML = html;
    pInput.setAttribute('aria-activedescendant', `p-${active}`);
    $(`#p-${active}`, pList)?.scrollIntoView({ block: 'nearest' });
  }
  function openPalette() {
    lastFocus = document.activeElement;
    palette.hidden = false;
    document.body.style.overflow = 'hidden';
    pInput.value = ''; active = 0; renderPalette();
    requestAnimationFrame(() => pInput.focus());
  }
  function closePalette() {
    palette.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus?.();
  }
  function runActive(i = active) {
    const cmd = filtered[i];
    if (!cmd) return;
    closePalette();
    cmd.run();
  }

  $$('[data-open-palette]').forEach(b => b.addEventListener('click', openPalette));
  pInput.addEventListener('input', () => { active = 0; renderPalette(); });
  pList.addEventListener('click', e => {
    const item = e.target.closest('.p-item');
    if (item) runActive(+item.dataset.i);
  });
  palette.addEventListener('click', e => { if (e.target === palette) closePalette(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (palette.hidden) return;
    if (e.key === 'Escape') closePalette();
    else if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % filtered.length; renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + filtered.length) % filtered.length; renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runActive(); }
  });
  $('#kbdHint').textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
