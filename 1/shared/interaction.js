/* Local examples only. No remote calls, tracking, or customer data. */
(() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Entrances clarify hierarchy once. Content stays available without JS or IO.
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('enhanced');
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    motion.addEventListener('change', () => {
      if (motion.matches) {
        document.documentElement.classList.remove('enhanced');
        observer.disconnect();
      }
    });
  }

  document.querySelectorAll('[data-flow]').forEach(flow => {
    const buttons = [...flow.querySelectorAll('[data-step-button]')];
    const status = flow.querySelector('[data-flow-status]');
    const statuses = flow.dataset.statuses.split('|');
    buttons.forEach((button, i) => button.addEventListener('click', event => {
      // Keyboard actions change instantly; pointer actions gently resolve the diagram.
      flow.classList.toggle('keyboard-change', event.detail === 0);
      flow.dataset.step = i;
      buttons.forEach((item, j) => item.setAttribute('aria-pressed', String(i === j)));
      status.textContent = statuses[i];
    }));
  });

  const consoleEl = document.querySelector('[data-console]');
  if (consoleEl) {
    const log = consoleEl.querySelector('[data-log]');
    const initialRows = [...log.children].map(row => row.cloneNode(true));
    const status = consoleEl.querySelector('[data-console-status]');
    const command = consoleEl.querySelector('[data-command]');
    const input = consoleEl.querySelector('input');
    const runButton = document.querySelector('[data-run-demo]');
    let timers = [];
    const cancel = () => { timers.forEach(clearTimeout); timers = []; };
    const line = text => {
      const li = document.createElement('li');
      const code = document.createElement('code');
      code.textContent = '[help]';
      const span = document.createElement('span');
      span.textContent = text;
      li.append(code, span);
      log.append(li);
    };
    function run(animate) {
      cancel();
      command.textContent = 'demandmatch demo';
      log.replaceChildren();
      status.textContent = consoleEl.dataset.idle;
      initialRows.forEach((row, i) => {
        if (animate && !motion.matches) {
          timers.push(setTimeout(() => {
            log.append(row.cloneNode(true));
            if (i === initialRows.length - 1) status.textContent = consoleEl.dataset.status;
          }, i * 450 + 150));
        } else log.append(row.cloneNode(true));
      });
      if (!animate || motion.matches) status.textContent = consoleEl.dataset.status;
      if (runButton) runButton.querySelector('span').textContent = document.body.dataset.replay;
    }
    runButton?.addEventListener('click', event => run(event.detail !== 0));
    consoleEl.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const value = input.value.trim().toLowerCase();
      input.value = '';
      cancel();
      if (value === 'demo' || value === 'demandmatch demo') { run(false); return; }
      command.textContent = value || 'help';
      log.replaceChildren();
      if (value === 'clear') { status.textContent = consoleEl.dataset.idle; return; }
      if (value === 'contact') {
        status.textContent = consoleEl.dataset.idle;
        const contact = document.getElementById('contact');
        contact.scrollIntoView({ behavior: 'instant' });
        contact.querySelector('a').focus({ preventScroll: true });
        return;
      }
      if (value === 'help' || value === '') consoleEl.dataset.help.split('\n').forEach(line);
      else line(consoleEl.dataset.unknown);
      status.textContent = consoleEl.dataset.idle;
    });
    motion.addEventListener('change', () => { if (motion.matches && timers.length) run(false); });
    document.addEventListener('visibilitychange', () => { if (document.hidden && timers.length) run(false); });
  }

  // Relay comparison keys when this page is shown inside the comparison frame.
  if (parent !== window) document.addEventListener('keydown', event => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName) || event.target.isContentEditable) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (['1', '2', '3', 'ArrowLeft', 'ArrowRight', 'r', 'R'].includes(event.key)) {
      event.preventDefault();
      parent.postMessage({ type: 'demandmatch-comparison-key', key: event.key }, '*');
    }
  });
})();
