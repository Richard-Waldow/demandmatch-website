/* The product: the real app (assets/app) with sample data, in a window over the page (#app-dlg, a native modal dialog).
   "Click to try it" under the systems graphic, and every other [data-open-app], opens it; the first open starts the tour.
   Other sections open a screen of it through the dm:open event: a tab id ('offer') or a screen ({ page, push, case }).
   The app is mounted on the first open, so the page loads without it. Esc, the close button or a click beside the window closes it. */
(() => {
  const dlg = document.getElementById('app-dlg'); if (!dlg || !window.BFApp) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const win = dlg.querySelector('.win'), el = win.querySelector('.win-app');
  const SCREENS = { today: { page: 'today' }, inbox: { page: 'inbox' }, offer: { case: 'C-113' }, opps: { page: 'opps' }, gpt: { page: 'gpt' } };
  let app = null, toured = false;

  function open(screen) {
    if (!dlg.open) dlg.showModal();
    win.classList.add('live');
    if (!app) app = window.BFApp.mount(el);
    const wait = reduced ? 0 : 320;
    if (screen) {
      toured = true;
      setTimeout(() => {
        app.open?.(screen);
        // the offer goes one step further, into the document view of that case's offer
        if (screen === SCREENS.offer) el.querySelector('[data-act="offer"]')?.click();
      }, wait);
    } else if (!toured) { toured = true; setTimeout(() => app.startTour(), wait); }
  }

  document.addEventListener('click', e => {
    const b = e.target.closest('[data-open-app]'); if (!b) return;
    e.preventDefault(); open();
  });
  document.addEventListener('dm:open', e => open(typeof e.detail === 'string' ? SCREENS[e.detail] : e.detail));

  dlg.querySelector('.win-close').addEventListener('click', () => dlg.close());
  // a click on the backdrop (the dialog itself, outside the window) closes it
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  const full = dlg.querySelector('.win-full');
  full.addEventListener('click', async () => { try { document.fullscreenElement ? await document.exitFullscreen() : await win.requestFullscreen(); } catch (err) {} });
  document.addEventListener('fullscreenchange', () => { full.innerHTML = `<i class="ph-light ph-corners-${document.fullscreenElement ? 'in' : 'out'}" aria-hidden="true"></i>`; });
  dlg.addEventListener('close', () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); });

  // a shared link to …#try opens the product straight away
  if (location.hash === '#try') open();
})();
