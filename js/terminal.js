/* ==========================================================================
   Terminal easter egg: press ` (or use the footer link / command palette).
   All output is written with textContent, never innerHTML.
   ========================================================================== */
(() => {
  'use strict';

  const $ = sel => document.querySelector(sel);
  const term = $('#term');
  const out = $('#termOut');
  const body = $('#termBody');
  const form = $('#termForm');
  const input = $('#termInput');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'yasirb169@gmail.com';
  const RESUME = 'assets/Yasir_Hassan_Resume.pdf';

  const projects = {
    vigilense: { url: 'projects/vigilense/', about: 'AI surveillance: multi-camera fire, smoke, weapon and person detection' },
    netguard: { url: 'https://github.com/yasirhassan-sec/netguard', about: 'Network vulnerability scanner for homes and small offices' },
    milkiyat: { url: 'projects/milkiyat/', about: 'Tamper-evident land records on a signed SHA-256 hash chain' },
    dastarkhwan: { url: 'projects/dastarkhwan/', about: 'Commission-free restaurant ordering and management' },
    hrms: { url: 'https://github.com/yasirhassan-sec', about: 'Role-based HR system in Java Swing with an audit log' },
    'enterprise-network': { url: 'https://github.com/yasirhassan-sec', about: 'Three-layer campus network with VLANs, ACLs and QoS' }
  };
  const writeups = {
    'tamper-evident-land-registry': { url: 'writeups/tamper-evident-land-registry/', about: 'Hash chains, AES-256-GCM and RSA signatures in Milkiyat' },
    'fire-smoke-detection-yolo': { url: 'writeups/fire-smoke-detection-yolo/', about: 'Training YOLO on D-Fire for VigiLense' }
  };
  const files = ['projects/', 'writeups/', 'resume.pdf', 'contact.txt', 'skills.txt'];

  /* ---------- Output helpers ---------- */
  function print(text = '', cls = '') {
    const line = document.createElement('div');
    line.className = `t-line${cls ? ` ${cls}` : ''}`;
    line.textContent = text;
    out.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return line;
  }
  function printLink(label, href, note = '') {
    const line = print('', 't-pad');
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    line.append(a, note ? `  ${note}` : '');
  }
  const pad = (s, n) => s.padEnd(n);
  const sleep = ms => new Promise(r => setTimeout(r, reduceMotion ? 0 : ms));

  /* ---------- Commands ---------- */
  const help = [
    ['whoami', 'who is Yasir'],
    ['ls [dir]', 'list files, projects/ or writeups/'],
    ['cat <file>', 'read resume.pdf, contact.txt or skills.txt'],
    ['open <name>', 'open a project, writeup or the résumé'],
    ['nmap <host>', 'scan a host (authorised targets only)'],
    ['email', 'copy my email address'],
    ['theme', 'switch light / dark'],
    ['history', 'show previous commands'],
    ['clear', 'clear the screen'],
    ['exit', 'close the terminal']
  ];

  const commands = {
    help() {
      print('Available commands:', 't-dim');
      help.forEach(([c, d]) => print(`  ${pad(c, 14)}${d}`));
      print('Tab completes, ↑ ↓ walk history.', 't-dim');
    },
    whoami() {
      print('Yasir Hassan', 't-ok');
      print('Computer Engineering student, Bahria University, Islamabad.');
      print('Former Cybersecurity Intern at Safe City Islamabad.');
      print('Vulnerability assessment · web app security · threat intelligence.');
      print('Status: open to cybersecurity roles.', 't-acc');
    },
    ls(args) {
      const dir = (args[0] || '').replace(/\/$/, '');
      if (!dir || dir === '.' || dir === '~') return print(files.join('   '), 't-acc');
      const list = dir === 'projects' ? projects : dir === 'writeups' ? writeups : null;
      if (!list) return print(`ls: cannot access '${args[0]}': No such file or directory`, 't-err');
      Object.entries(list).forEach(([name, p]) => print(`${pad(name, 32)}${p.about}`));
    },
    cat(args) {
      const file = args[0] || '';
      if (/^resume(\.pdf)?$/.test(file)) {
        print('B.E. Computer Engineering, Bahria University (2023 to 2027)');
        print('Cybersecurity Intern, Safe City Islamabad (Jun to Sep 2026)');
        print('Projects: VigiLense, NetGuard, Milkiyat, Dastarkhwan, HRMS, Enterprise Network');
        printLink('Download the full résumé (PDF)', RESUME);
      } else if (/^contact(\.txt)?$/.test(file)) {
        printLink(EMAIL, `mailto:${EMAIL}`);
        printLink('linkedin.com/in/yasir-hassan-', 'https://www.linkedin.com/in/yasir-hassan-');
        printLink('github.com/yasirhassan-sec', 'https://github.com/yasirhassan-sec');
      } else if (/^skills(\.txt)?$/.test(file)) {
        print(`${pad('AppSec', 12)}OWASP Top 10, Burp Suite, vulnerability assessment`);
        print(`${pad('Threat intel', 12)}CTI research, OSINT, incident response`);
        print(`${pad('Crypto', 12)}AES-256-GCM, RSA-PSS, SHA-256 hash chains, TOTP`);
        print(`${pad('Network', 12)}VLANs, ACLs, NAT, SSH hardening, Wireshark, Nmap, NetGuard`);
        print(`${pad('Build', 12)}Python, PyTorch/YOLO, FastAPI, Node.js, Java`);
      } else if (!file) {
        print('cat: missing file operand. Try: cat resume.pdf', 't-err');
      } else if (/^(projects|writeups)\/?$/.test(file)) {
        print(`cat: ${file}: Is a directory. Try: ls ${file}`, 't-err');
      } else {
        print(`cat: ${file}: No such file or directory`, 't-err');
      }
    },
    open(args) {
      const name = (args[0] || '').toLowerCase().replace(/\/$/, '');
      const target = /^resume(\.pdf)?$/.test(name) ? { url: RESUME } : projects[name] || writeups[name];
      if (!target) return print(name ? `open: ${name}: not found. Try: ls projects` : 'open: which one? Try: ls projects', 't-err');
      print(`Opening ${name}…`, 't-dim');
      if (/^https?:/.test(target.url)) window.open(target.url, '_blank', 'noopener');
      else location.href = target.url;
    },
    async nmap(args) {
      const host = args.filter(a => !a.startsWith('-')).pop() || '';
      if (!host) return print('Usage: nmap <host>', 't-err');
      if (!/^(www\.)?yasirhassan\.tech$|^localhost$|^127\.0\.0\.1$/.test(host)) {
        print(`Refusing to scan ${host}: it is not in scope.`, 't-err');
        print('Only scan systems you have written permission to test. Try: nmap yasirhassan.tech', 't-dim');
        return;
      }
      print('Starting Nmap 7.95 ( https://nmap.org )', 't-dim');
      await sleep(400);
      print(`Nmap scan report for ${host}`);
      print('PORT       STATE     SERVICE   NOTES', 't-dim');
      const rows = [
        ['22/tcp', 'filtered', 'ssh', 'nothing to see here', ''],
        ['80/tcp', 'open', 'http', 'redirects to 443', ''],
        ['443/tcp', 'open', 'https', 'strict CSP, no trackers', ''],
        ['1337/tcp', 'open', 'hire-me', 'try: cat contact.txt', 't-ok']
      ];
      for (const [port, state, svc, note, cls] of rows) {
        await sleep(250);
        print(`${pad(port, 11)}${pad(state, 10)}${pad(svc, 10)}${note}`, cls);
      }
      await sleep(250);
      print('Nmap done: 1 IP address (1 host up) scanned in 1.37 seconds', 't-dim');
    },
    async email() {
      try {
        await navigator.clipboard.writeText(EMAIL);
        print(`Copied ${EMAIL} to the clipboard.`, 't-ok');
      } catch {
        printLink(EMAIL, `mailto:${EMAIL}`);
      }
    },
    theme() {
      $('#themeBtn')?.click();
      print(`Theme set to ${document.documentElement.dataset.theme || 'dark'}.`, 't-dim');
    },
    history() { hist.forEach((c, i) => print(`${String(i + 1).padStart(4)}  ${c}`)); },
    clear() { out.textContent = ''; },
    exit() { close(); },
    pwd() { print('/home/visitor'); },
    date() { print(new Date().toString()); },
    echo(args) { print(args.join(' ')); },
    sudo() { print('visitor is not in the sudoers file. This incident will be reported.', 't-err'); },
    rm(args) {
      print(args.includes('-rf') ? 'rm: permission denied. Nice try though.' : 'rm: permission denied', 't-err');
    },
    cd(args) {
      print(args[0] ? `cd: no need, try: ls ${args[0]}` : '', 't-dim');
    }
  };
  commands.about = commands.whoami;
  commands.contact = () => commands.cat(['contact.txt']);
  commands.resume = () => commands.cat(['resume.pdf']);
  commands.cls = commands.clear;

  /* ---------- Input, history and completion ---------- */
  const hist = [];
  let histPos = 0, busy = false;

  async function run(raw) {
    const line = raw.trim();
    print(`visitor@yasirhassan.tech:~$ ${line}`, 't-cmd');
    if (!line) return;
    hist.push(line);
    histPos = hist.length;
    const [name, ...args] = line.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    if (!cmd) return print(`${name}: command not found. Type 'help' for a list.`, 't-err');
    busy = true;
    try { await cmd(args); } finally { busy = false; }
  }

  function complete() {
    const parts = input.value.split(/\s+/);
    const word = parts[parts.length - 1].toLowerCase();
    let pool;
    if (parts.length === 1) pool = Object.keys(commands);
    else if (parts[0] === 'open') pool = [...Object.keys(projects), ...Object.keys(writeups), 'resume.pdf'];
    else if (parts[0] === 'ls') pool = ['projects/', 'writeups/'];
    else if (parts[0] === 'cat') pool = files.filter(f => !f.endsWith('/'));
    else if (parts[0] === 'nmap') pool = ['yasirhassan.tech'];
    else return;
    const hits = pool.filter(p => p.startsWith(word));
    if (hits.length === 1) {
      parts[parts.length - 1] = hits[0];
      input.value = parts.join(' ') + (hits[0].endsWith('/') ? '' : ' ');
    } else if (hits.length > 1) {
      print(`visitor@yasirhassan.tech:~$ ${input.value}`, 't-cmd');
      print(hits.join('   '), 't-dim');
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (busy) return;
    const value = input.value;
    input.value = '';
    run(value);
  });

  input.addEventListener('keydown', e => {
    e.stopPropagation(); // keep the page's own shortcuts (Ctrl K) out of the terminal
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'Tab') { e.preventDefault(); complete(); }
    else if (e.key === 'ArrowUp' && hist.length) {
      e.preventDefault();
      histPos = Math.max(histPos - 1, 0);
      input.value = hist[histPos];
    } else if (e.key === 'ArrowDown' && hist.length) {
      e.preventDefault();
      histPos = Math.min(histPos + 1, hist.length);
      input.value = hist[histPos] ?? '';
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault();
      commands.clear();
    }
  });

  /* ---------- Open / close ---------- */
  let lastFocus = null, greeted = false;

  function open() {
    if (!term.hidden) return;
    lastFocus = document.activeElement;
    term.hidden = false;
    document.body.style.overflow = 'hidden';
    if (!greeted) {
      greeted = true;
      print('Welcome. This is a small terminal for poking around the portfolio.', 't-dim');
      print("Type 'help' to see what it can do, or 'exit' to leave.", 't-dim');
      print();
    }
    input.focus();
    window.goatcounter?.count?.({ path: 'terminal-open', title: 'terminal-open', event: true });
  }
  function close() {
    term.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus?.();
  }

  addEventListener('keydown', e => {
    if (e.key !== '`' || e.ctrlKey || e.metaKey || e.altKey) return;
    const t = e.target;
    if (t.closest?.('input, textarea, select, [contenteditable]')) return;
    if ($('#palette')?.hidden === false) return;
    e.preventDefault();
    term.hidden ? open() : close();
  });
  addEventListener('open-terminal', open);
  document.querySelectorAll('[data-open-terminal]').forEach(b => b.addEventListener('click', open));
  $('#termClose').addEventListener('click', close);
  term.addEventListener('click', e => { if (e.target === term) close(); });
  body.addEventListener('click', () => { if (!getSelection().toString()) input.focus(); });
})();
