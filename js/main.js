/* ==========================================================================
   Yasir Hassan · Portfolio
   Vanilla JS, no dependencies.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'yasirb169@gmail.com';

  /* Analytics event helper: a no-op until GoatCounter is configured in js/analytics.js */
  const track = name => { window.goatcounter?.count?.({ path: name, title: name, event: true }); };

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
  }

  /* ---------- Theme ---------- */
  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* storage unavailable */ }
    $('meta[name="theme-color"]').content = root.dataset.theme === 'light' ? '#ffffff' : '#0a0a0a';
  }
  $('#themeBtn').addEventListener('click', toggleTheme);

  /* ---------- Copy email ---------- */
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast('Email copied');
    } catch {
      location.href = `mailto:${EMAIL}`;
    }
  }
  $$('[data-copy-email]').forEach(btn => btn.addEventListener('click', copyEmail));

  /* ---------- Mobile menu ---------- */
  const navLinks = $('#navLinks');
  const menuBtn = $('#menuBtn');
  const setMenu = open => {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  $$('a', navLinks).forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- Header border on scroll ---------- */
  const header = $('.header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 4);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$('a', navLinks).forEach(a => a.classList.toggle('active', a.hash === `#${e.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => navObserver.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); }
  }), { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealObserver.observe(el));

  /* ---------- Command palette (Ctrl/⌘ + K) ---------- */
  const palette = $('#palette');
  const pInput = $('#paletteInput');
  const pList = $('#paletteList');
  const go = id => () => $(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  const open = url => () => window.open(url, '_blank', 'noopener');
  const commands = [
    { group: 'Go to', label: 'Work', hint: '', run: go('#work') },
    { group: 'Go to', label: 'Experience', hint: '', run: go('#experience') },
    { group: 'Go to', label: 'Skills', hint: '', run: go('#skills') },
    { group: 'Go to', label: 'Contact', hint: '', run: go('#contact') },
    { group: 'Actions', label: 'Download résumé', hint: 'PDF', run: () => $('#resumeLink').click() },
    { group: 'Actions', label: 'Copy email', hint: EMAIL, run: copyEmail },
    { group: 'Actions', label: 'Toggle theme', hint: '', run: toggleTheme },
    { group: 'Links', label: 'GitHub', hint: '↗', run: open('https://github.com/yasirhassan-sec') },
    { group: 'Links', label: 'LinkedIn', hint: '↗', run: open('https://www.linkedin.com/in/yasir-hassan-') }
  ];
  let filtered = commands, active = 0, lastFocus = null;

  function renderPalette() {
    const q = pInput.value.trim().toLowerCase();
    filtered = commands.filter(c => `${c.label} ${c.group} ${c.hint}`.toLowerCase().includes(q));
    active = Math.min(active, Math.max(filtered.length - 1, 0));
    if (!filtered.length) { pList.innerHTML = '<li class="p-empty">No results</li>'; return; }
    let html = '', group = '';
    filtered.forEach((c, i) => {
      if (c.group !== group) { group = c.group; html += `<li class="p-group" role="presentation">${group}</li>`; }
      html += `<li role="option" id="p-${i}" data-i="${i}" aria-selected="${i === active}" class="p-item${i === active ? ' active' : ''}">` +
              `<span>${c.label}</span>${c.hint ? `<kbd>${c.hint}</kbd>` : ''}</li>`;
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
  function runCommand(i = active) {
    const cmd = filtered[i];
    if (!cmd) return;
    closePalette();
    cmd.run();
  }

  $$('[data-open-palette]').forEach(b => b.addEventListener('click', openPalette));
  pInput.addEventListener('input', () => { active = 0; renderPalette(); });
  pList.addEventListener('click', e => {
    const item = e.target.closest('.p-item');
    if (item) runCommand(Number(item.dataset.i));
  });
  palette.addEventListener('click', e => { if (e.target === palette) closePalette(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      palette.hidden ? openPalette() : closePalette();
      return;
    }
    if (palette.hidden || !filtered.length) {
      if (!palette.hidden && e.key === 'Escape') closePalette();
      return;
    }
    if (e.key === 'Escape') closePalette();
    else if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % filtered.length; renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + filtered.length) % filtered.length; renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runCommand(); }
  });
  $('#kbdHint').textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  const statusEl = $('#formStatus');
  const submitBtn = $('#formSubmit');
  const setStatus = (msg, kind = '') => { statusEl.textContent = msg; statusEl.className = `form-status ${kind}`; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // bot filled the honeypot

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      // No form service configured yet: hand off to the visitor's email app
      const body = `${data.message}\n\n${data.name}\n${data.email}`;
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('Opening your email app…');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    setStatus('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("Thanks, your message is on its way. I'll get back to you soon.", 'ok');
      track('contact-form-sent');
    } catch {
      setStatus(`Something went wrong. Please email me directly at ${EMAIL}.`, 'err');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  /* ---------- Analytics events ---------- */
  $$('a[href$="Yasir_Hassan_Resume.pdf"]').forEach(a => a.addEventListener('click', () => track('resume-download')));

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
