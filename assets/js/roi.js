/* #roi: the business case a CFO can run, and the mirror of the price. Inputs in three groups (company, effect, cost),
   presets for the effect (conservative / expected), results in a calm panel: payback, 3-year ROI, value per year, the
   license, how the value splits between the customer and DemandMatch, where it comes from, freed capacity (shown,
   counted only on request), the three years, the cost line. The license is priced with PRICES.fee (pricing.js) on the
   conservative value for this company, or on the visitor's own effect if that is lower; freed capacity never counts.
   So picking "expected" raises the value but not the license: everything above the conservative case stays with the
   customer. The formulas are also written out in the page (roi_formulas). */
(() => {
  const host = document.getElementById('roi-app'); if (!host || !window.UI) return;
  const t = k => window.UI.t(k), de = window.UI.lang === 'de';
  const PR = window.PRICES; if (!PR) return;
  const DAY = 800, RAMP = PR.license.ramp;

  // ------------------------------------------------------------------ number formats (German: 1,2 Mrd. € / English: €1.2bn)
  const nf = (v, d = 0) => new Intl.NumberFormat(de ? 'de-DE' : 'en-US', { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const big = (v, unitDe, unitEn) => { const d = v >= 100 ? 0 : 1; return de ? `${nf(v, d)} ${unitDe} €` : `€${nf(v, d)}${unitEn}`; };
  const eur = v => {
    const a = Math.abs(v), s = v < 0 ? '−' : '';
    if (a >= 1e9) return s + big(a / 1e9, 'Mrd.', 'bn');
    if (a >= 1e6) return s + big(a / 1e6, 'Mio.', 'm');
    return s + (de ? `${nf(Math.round(a / 1000) * 1000)} €` : `€${nf(Math.round(a / 1000) * 1000)}`);
  };
  const pct = (v, d = 0) => (de ? `${nf(v, d)} %` : `${nf(v, d)}%`).replace('-', '−');

  // ------------------------------------------------------------------ inputs. "rev" runs on a log scale (€1bn, where we start, to €20bn)
  const LOG = { min: 1e9, max: 2e10 };
  const toRev = x => { const r = LOG.min * Math.pow(LOG.max / LOG.min, x / 1000); return r < 5e9 ? Math.round(r / 5e7) * 5e7 : Math.round(r / 5e8) * 5e8; };
  const fromRev = r => Math.round(1000 * Math.log(r / LOG.min) / Math.log(LOG.max / LOG.min));
  const IN = [
    { k: 'rev', g: 1, min: 0, max: 1000, step: 1, v: 1.2e9, log: true, f: v => eur(v) },
    { k: 'gm', g: 1, min: 5, max: 30, step: .5, v: 12, f: v => pct(v, v % 1 ? 1 : 0) },
    { k: 'stock', g: 1, min: 5, max: 25, step: .5, v: 12, f: v => pct(v, v % 1 ? 1 : 0), hint: s => `≈ ${eur(s.rev * s.stock / 100)}` },
    { k: 'hold', g: 1, min: 5, max: 30, step: .5, v: 9, f: v => pct(v, v % 1 ? 1 : 0), hint: () => t('roi_hold_h') },
    { k: 'people', g: 1, min: 20, max: 1000, step: 10, v: 400, f: v => `${nf(v)} ${t('roi_people_u')}` },
    { k: 'pcost', g: 1, min: 50000, max: 150000, step: 1000, v: 84000, f: v => eur(v) },
    { k: 'scope', g: 1, min: 10, max: 100, step: 5, v: 100, f: v => pct(v), hint: () => t('roi_scope_h') },
    { k: 'sales', g: 2, min: 0, max: 3, step: .1, v: [.5, 1], f: v => pct(v, 1) },
    { k: 'margin', g: 2, min: 0, max: 1, step: .05, v: [.1, .3], f: v => `+${nf(v, 2)} ${t('roi_pts')}` },
    { k: 'freed', g: 2, min: 0, max: 20, step: .5, v: [3.5, 10.5], f: v => pct(v, 1), hint: s => `≈ ${eur(s.rev * s.stock / 100 * s.freed / 100)} ${t('roi_of_stock')}` },
    { k: 'time', g: 2, min: 0, max: 40, step: 1, v: [10, 20], f: v => pct(v) },
    { k: 'days', g: 3, min: 0, max: 200, step: 5, v: 40, f: v => `${nf(v)} ${t('roi_days_u')}`, hint: () => t('roi_days_h') },
    { k: 'co', g: 3, min: 1, max: 20, step: 1, v: 1, f: v => nf(v), hint: () => t('roi_co_h') }
  ];
  const LABEL = { rev: 'roi_rev', gm: 'roi_gm', stock: 'roi_stock', people: 'roi_people', pcost: 'roi_pcost', scope: 'roi_scope',
    sales: 'roi_sales', margin: 'roi_margin', freed: 'roi_freed', hold: 'roi_hold', time: 'roi_time', days: 'roi_days', co: 'roi_co' };
  // the conservative effect (the first preset), which the license is priced on
  const CONS = Object.fromEntries(IN.filter(i => Array.isArray(i.v)).map(i => [i.k, i.v[0]]));

  // opens on the conservative case: the first figure a CFO sees should be the one we would sign
  const S = { preset: 0, cap: false }; // preset 0 conservative, 1 expected, 2 your numbers
  IN.forEach(i => { S[i.k] = Array.isArray(i.v) ? i.v[0] : i.v; });

  // ------------------------------------------------------------------ the model
  function model(s) {
    const scope = s.scope / 100, gm = s.gm / 100, inPeople = s.people * scope;
    const lev = e => [s.rev * e.sales / 100 * gm, s.rev * e.margin / 100, s.rev * s.stock / 100 * e.freed / 100 * s.hold / 100].map(v => v * scope);
    const sum = a => a.reduce((x, y) => x + y, 0);
    const levers = lev(s), capFte = inPeople * s.time / 100, capEur = capFte * s.pcost;
    const cash = sum(levers), value = cash + (s.cap ? capEur : 0);
    // the license: base + share of the priced value (conservative, or lower if you say so), half the value in year one
    const priced = Math.min(cash, sum(lev(CONS)));
    const f1 = PR.fee(priced * RAMP, s.co), f2 = PR.fee(priced, s.co), setup = PR.setupFee(s.co), own = s.days * DAY;
    const val = [value * RAMP, value, value], cost = [f1.fee + setup + own, f2.fee, f2.fee];
    let cum = 0; const net = val.map((v, i) => (cum += v - cost[i]));
    const V3 = val[0] + val[1] + val[2], C3 = cost[0] + cost[1] + cost[2];
    // payback: costs fall due at the start of each year, value arrives evenly month by month
    let pay = null, cv = 0, cc = 0;
    for (let m = 0; m < 36 && pay === null; m++) {
      const y = Math.floor(m / 12); if (m % 12 === 0) cc += cost[y];
      const mv = val[y] / 12;
      if (cv + mv >= cc && mv > 0) pay = m + (cc - cv) / mv;
      cv += mv;
    }
    return { levers, cash, value, capFte, capEur, priced, f1, f2, setup, own, val, cost, net, V3, C3, roi: (V3 - C3) / C3, pay,
      ours: value > 0 ? Math.min(1, f2.fee / value) : 1 };
  }

  // ------------------------------------------------------------------ markup
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const row = i => `
    <div class="roi-r" data-k="${i.k}">
      <label for="roi-${i.k}">${esc(t(LABEL[i.k]))}</label><output for="roi-${i.k}"></output>
      <input type="range" id="roi-${i.k}" min="${i.min}" max="${i.max}" step="${i.step}">
      ${i.hint ? '<small></small>' : ''}
    </div>`;
  const group = (n, name, extra = '') => `
    <fieldset class="roi-g"><legend>${esc(name)}</legend>${IN.filter(i => i.g === n).map(row).join('')}${extra}</fieldset>`;
  const fact = (k, label) => `<div class="roi-f roi-f-${k}"><dt>${esc(label)}</dt><dd><b></b><small></small></dd></div>`;

  host.innerHTML = `
    <div class="roi-sheet rv">
      <div class="roi-in">
        <div class="roi-seg roi-presets" role="radiogroup" aria-label="${esc(t('roi_presets_label'))}">
          ${t('roi_presets').map((n, i) => `<button type="button" role="radio" data-preset="${i}">${esc(n)}</button>`).join('')}
        </div>
        <div class="roi-mini" aria-hidden="true"><span></span><span></span></div>
        ${group(1, t('roi_g1'))}${group(2, t('roi_g2'))}${group(3, t('roi_g3'))}
      </div>
      <div class="roi-side"><aside class="roi-out">
        <img class="roi-art" src="${window.SHARED_BASE || 'assets/'}art/roi-silos-1536.webp" alt="" loading="lazy" decoding="async">
        <div class="roi-memo">
        <p class="roi-memo-h"><span>${esc(t('roi_memo'))}</span><span class="roi-memo-c"></span></p>
        <p class="roi-verdict" aria-live="polite"></p>
        <dl class="roi-facts">${fact('val', t('roi_value'))}${fact('fee', t('roi_fee'))}</dl>
        <div class="roi-blk roi-split">
          <p class="roi-h">${esc(t('roi_split'))}</p>
          <div class="roi-bar" aria-hidden="true"><i></i><i></i></div>
          <ul class="roi-leg">${t('roi_split_l').map((n, i) => `<li><i class="s${i}"></i><span>${esc(n)}</span><b></b></li>`).join('')}</ul>
          <p class="roi-split-s">${esc(t('roi_split_s'))}</p>
        </div>
        <div class="roi-blk">
          <p class="roi-h">${esc(t('roi_levers'))}</p>
          <div class="roi-bar roi-src" aria-hidden="true"><i></i><i></i><i></i></div>
          <ul class="roi-leg">${t('roi_l').map((n, i) => `<li><i class="c${i}"></i><span>${esc(n)}</span><b></b></li>`).join('')}</ul>
        </div>
        <div class="roi-blk roi-capb">
          <div><p class="roi-h">${esc(t('roi_cap'))}</p><p class="roi-cap-s"></p></div>
          <label class="roi-sw"><input type="checkbox"><span aria-hidden="true"></span>${esc(t('roi_cap_in'))}</label>
        </div>
        <table class="roi-yrs">
          <thead><tr><th></th>${t('roi_years').map(y => `<th scope="col">${esc(y)}</th>`).join('')}</tr></thead>
          <tbody>
            <tr><th scope="row">${esc(t('roi_t_val'))}</th><td></td><td></td><td></td></tr>
            <tr><th scope="row">${esc(t('roi_t_cost'))}</th><td></td><td></td><td></td></tr>
            <tr class="roi-cum"><th scope="row">${esc(t('roi_t_cum'))}</th><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        <p class="roi-costl"></p>
        <div class="roi-act">
          <button type="button" data-roi-link><i class="ph-light ph-link-simple" aria-hidden="true"></i><span>${esc(t('roi_link'))}</span></button>
          <button type="button" data-roi-print><i class="ph-light ph-printer" aria-hidden="true"></i><span>${esc(t('roi_print'))}</span></button>
        </div>
        </div>
      </aside></div>
    </div>
    <p class="roi-note">${esc(t('roi_note'))}</p>`;

  const q = s => host.querySelector(s), qa = s => [...host.querySelectorAll(s)];
  const rows = Object.fromEntries(IN.map(i => [i.k, { i, el: q(`.roi-r[data-k="${i.k}"]`), input: q(`#roi-${i.k}`) }]));

  // ------------------------------------------------------------------ state <-> controls
  function setControls() {
    IN.forEach(i => { const r = rows[i.k]; r.input.value = i.log ? fromRev(S[i.k]) : S[i.k]; });
    paint();
  }
  function paint() {
    const m = model(S);
    IN.forEach(i => {
      const { el, input } = rows[i.k], v = S[i.k];
      el.querySelector('output').textContent = i.f(v);
      input.setAttribute('aria-valuetext', i.f(v));
      input.style.setProperty('--p', `${((input.value - i.min) / (i.max - i.min)) * 100}%`);
      if (i.hint) el.querySelector('small').textContent = i.hint(S);
    });
    qa('[data-preset]').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.preset === S.preset)));
    q('.roi-sw input').checked = S.cap;

    const payTxt = m.pay === null ? t('roi_never') : `${nf(m.pay, m.pay < 10 ? 1 : 0)} ${t('roi_months')}`;
    // the verdict, one sentence; every number in it comes from the model and the formatters above
    q('.roi-verdict').innerHTML = t(m.pay === null ? 'roi_verdict_late' : 'roi_verdict')
      .replace('{p}', m.pay === null ? '' : `${nf(m.pay, m.pay < 10 ? 1 : 0)}\u00a0${t('roi_months_in')}`)
      .replace('{v}', esc(eur(m.V3))).replace('{c}', esc(eur(m.C3))).replace('{r}', esc(pct(m.roi * 100)));
    q('.roi-memo-c').textContent = [t('roi_memo_rev').replace('{r}', eur(S.rev)), S.scope < 100 ? t('roi_memo_scope').replace('{x}', pct(S.scope)) : ''].filter(Boolean).join(' · ');
    const set = (k, b, s) => { q(`.roi-f-${k} b`).textContent = b; q(`.roi-f-${k} small`).textContent = s; };
    set('val', eur(m.value), t('roi_value_s'));
    set('fee', eur(m.f2.fee), !m.f2.fit ? t('roi_fee_fit') : m.f2.capped ? t('roi_fee_cap').replace('{v}', eur(m.priced))
      : t('roi_fee_s').replace('{b}', eur(m.f2.base)).replace('{p}', pct(PR.license.share * 100)).replace('{v}', eur(m.priced)));

    // how the value splits, from year two: what the customer keeps and what the license takes
    const split = [1 - m.ours, m.ours];
    qa('.roi-split .roi-bar i').forEach((el, i) => { el.style.width = `${split[i] * 100}%`; });
    qa('.roi-split .roi-leg b').forEach((el, i) => { el.textContent = `${pct(split[i] * 100)} · ${eur(i ? m.f2.fee : Math.max(0, m.value - m.f2.fee))}`; });

    const tot = m.cash || 1;
    qa('.roi-src i').forEach((el, i) => { el.style.width = `${(m.levers[i] / tot) * 100}%`; });
    qa('.roi-blk:not(.roi-split) .roi-leg b').forEach((el, i) => { el.textContent = eur(m.levers[i]); });
    q('.roi-cap-s').textContent = t('roi_cap_s').replace('{f}', nf(m.capFte)).replace('{v}', eur(m.capEur));
    q('.roi-capb').classList.toggle('on', S.cap);

    const cells = qa('.roi-yrs tbody tr');
    [m.val, m.cost, m.net].forEach((arr, r) => [...cells[r].querySelectorAll('td')].forEach((td, i) => {
      td.textContent = eur(arr[i]); td.classList.toggle('neg', arr[i] < 0 && r === 2);
    }));
    q('.roi-costl').textContent = t('roi_cost_l').replace('{l1}', eur(m.f1.fee)).replace('{l}', eur(m.f2.fee)).replace('{i}', eur(m.setup)).replace('{d}', eur(m.own));
    const mini = qa('.roi-mini span');
    mini[0].textContent = `${t('roi_payback')} ${payTxt}`; mini[1].textContent = `ROI ${pct(m.roi * 100)}`;
  }
  function preset(n) {
    S.preset = n;
    if (n < 2) IN.forEach(i => { if (Array.isArray(i.v)) S[i.k] = i.v[n]; });
    setControls();
  }

  IN.forEach(i => rows[i.k].input.addEventListener('input', e => {
    const x = +e.target.value; S[i.k] = i.log ? toRev(x) : x;
    if (i.g === 2 && S.preset !== 2) S.preset = 2;
    paint();
  }));
  qa('[data-preset]').forEach(b => b.addEventListener('click', () => preset(+b.dataset.preset)));
  q('.roi-sw input').addEventListener('change', e => { S.cap = e.target.checked; paint(); });

  // ------------------------------------------------------------------ share and print. The link carries only the numbers, nothing personal
  const KEYS = IN.map(i => i.k);
  function link() {
    const u = new URL(location.href);
    u.search = ''; u.hash = 'roi';
    u.searchParams.set('roi', [...KEYS.map(k => S[k]), S.cap ? 1 : 0].join('_'));
    return u.href;
  }
  const lb = q('[data-roi-link]');
  lb.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(link()); } catch (e) { history.replaceState(null, '', link()); }
    lb.querySelector('span').textContent = t('roi_copied');
    setTimeout(() => { lb.querySelector('span').textContent = t('roi_link'); }, 1800);
  });
  q('[data-roi-print]').addEventListener('click', () => window.print());

  const shared = new URLSearchParams(location.search).get('roi');
  if (shared) {
    const v = shared.split('_').map(Number);
    if (v.length === KEYS.length + 1 && v.every(Number.isFinite)) {
      KEYS.forEach((k, i) => { const d = rows[k].i; S[k] = d.log ? Math.min(LOG.max, Math.max(LOG.min, v[i])) : Math.min(d.max, Math.max(d.min, v[i])); });
      S.cap = v[KEYS.length] === 1; S.preset = 2;
    }
  }
  setControls();
  if (shared) requestAnimationFrame(() => document.getElementById('roi')?.scrollIntoView());

  // the reveal observer in site.js has already run, so this sheet reveals on its own
  const sheet = q('.roi-sheet');
  new IntersectionObserver(([e], io) => { if (e.isIntersecting) { sheet.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -12% 0px' }).observe(sheet);
  // a memo taller than the window sticks by its bottom edge instead, so its last lines can always be read
  const out = q('.roi-out');
  const fit = () => { const h = out.offsetHeight; out.style.setProperty('--roi-top', `${Math.min(76, innerHeight - h - 16)}px`); };
  addEventListener('resize', fit); new ResizeObserver(fit).observe(out); fit();
  window.ROI = { model, S };
})();
