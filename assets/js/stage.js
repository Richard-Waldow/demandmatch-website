/* #product: the real app (assets/app) inside a glass window on the harbour painting, plus the dock below it:
   five tabs that jump to a screen, an ink line that slides to the active tab, one sentence about that screen.
   The window starts inert behind a "click to try" pill; a click on a control goes straight to it, anywhere else starts the tour. */
(() => {
  const win = document.getElementById('win'); if (!win || !window.BFApp) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el = win.querySelector('.win-app');
  const app = window.BFApp.mount(el);
  const T = () => window.UI.t('tabs');

  // screens the tabs open (the offer tab opens a real case in the split offer view)
  const OPEN = { today: { page: 'today' }, inbox: { page: 'inbox' }, offer: { case: 'C-113' }, opps: { page: 'opps' }, gpt: { page: 'gpt' } };

  const live = () => win.classList.add('live');
  let toured = false;
  win.querySelector('.win-try').addEventListener('click', e => {
    live();
    const under = e.clientX || e.clientY ? document.elementFromPoint(e.clientX, e.clientY) : null;
    const ctl = under?.closest('.win-app button, .win-app [data-act], .win-app input, .win-app select');
    if (ctl) { if (ctl.matches('input, select')) ctl.focus(); else ctl.click(); return; }
    if (!toured) { toured = true; setTimeout(() => app.startTour(), reduced ? 0 : 300); }
  });
  const full = win.querySelector('.win-full');
  full.addEventListener('click', async () => { live(); try { document.fullscreenElement ? await document.exitFullscreen() : await win.requestFullscreen(); } catch (err) {} });
  document.addEventListener('fullscreenchange', () => { full.innerHTML = `<i class="ph-light ph-corners-${document.fullscreenElement ? 'in' : 'out'}" aria-hidden="true"></i>`; });

  // ---------------------------------------------------------------- dock
  const dock = document.getElementById('dock'), tabs = dock.querySelector('.dock-tabs'), ind = dock.querySelector('.dock-ind'), line = dock.querySelector('.dock-line');
  let cur = 'today';
  function drawTabs() {
    qa(tabs, 'button').forEach(b => b.remove());
    T().forEach(([id, icon, name]) => tabs.insertAdjacentHTML('beforeend',
      `<button type="button" role="tab" data-tab="${id}" aria-selected="${id === cur}"><i class="ph-light ph-${icon}" aria-hidden="true"></i><span>${name}</span></button>`));
    say(false); place(false);
  }
  const qa = (host, s) => [...host.querySelectorAll(s)];
  function say(anim = true) {
    const [, , name, text] = T().find(t => t[0] === cur);
    const html = `<b>${name}.</b> ${text}`;
    if (!anim || reduced) { line.innerHTML = html; return; }
    line.classList.add('swap');
    setTimeout(() => { line.innerHTML = html; line.classList.remove('swap'); }, 140);
  }
  // the ink line under the active tab: one element moved with transform (translateX + scaleX), never width/left
  function place(anim = true) {
    const b = tabs.querySelector(`[data-tab="${cur}"]`); if (!b) return;
    const r = b.getBoundingClientRect(), p = tabs.getBoundingClientRect();
    ind.style.transition = anim && !reduced ? '' : 'none';
    ind.style.transform = `translateX(${r.left - p.left + tabs.scrollLeft}px) scaleX(${r.width / 100})`;
    if (!anim) requestAnimationFrame(() => { ind.style.transition = ''; });
  }
  function go(id, { scroll = false } = {}) {
    cur = id;
    qa(tabs, 'button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === id)));
    say(); place();
    live(); toured = true;
    if (scroll) win.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    app.open?.(OPEN[id]);
    // the offer tab goes one step further, into the document view of that case's offer (the case's own "View" button)
    if (id === 'offer') el.querySelector('[data-act="offer"]')?.click();
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b) go(b.dataset.tab); });
  // other sections open a screen: a tab id ('offer') selects that tab; an object ({ page, push, case }) opens that screen directly
  document.addEventListener('dm:open', e => {
    if (typeof e.detail === 'string') return go(e.detail, { scroll: true });
    live(); toured = true;
    win.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => app.open?.(e.detail), reduced ? 0 : 450);
  });
  addEventListener('resize', () => place(false));
  window.UI.onLang(drawTabs);
  drawTabs();
  document.fonts?.ready.then(() => place(false));

  // ---------------------------------------------------------------- the stage plays in when it first comes into view (it sits below the film now)
  new IntersectionObserver(([e], io) => { if (!e.isIntersecting) return; win.closest('.stage-sec').classList.add('seen'); io.disconnect(); }, { threshold: .15 }).observe(win.closest('.stage-sec'));

  // ---------------------------------------------------------------- the painting fades in once it is decoded (no half-loaded flash)
  const img = document.querySelector('.stage-art img');
  const shown = () => document.querySelector('.stage').classList.add('art-in');
  if (img.complete) shown(); else (img.decode?.() || Promise.resolve()).then(shown, shown);
})();
