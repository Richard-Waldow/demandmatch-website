/* #pricing: every price and the license method in one place. The build (tools/build.mjs) writes the section, the worked
   examples, the FAQ answer, the formulas, the structured data and the Markdown from these numbers; roi.js prices the
   business case with PRICES.fee. On the page this script only switches the currency: each price carries both versions
   (data-eur, data-usd), the choice is remembered per browser; and it runs the one slider in the offer document.
   Prices are net. US dollar prices are the euro prices × 1.1, for customers in the US.

   The license is not a price list but a method: base + a share of the value measured together in the value assessment
   and the pilot (conservative case only), never more than a third of that value. The value grows with the size of the
   business, so the price does too, without tiers or cutoffs. */
const PRICES = {
  assess: { eur: 20000, usd: 22000 },                      // value assessment, 3 weeks, credited to the pilot
  pilot: { eur: 60000, usd: 66000 },                       // 30-day pilot, "from": a bigger scope costs more; credited to year one
  license: {
    base: { eur: 90000, usd: 99000 },                      // per year: the first connected company with its ERP (running, connections, support)
    extra: { eur: 30000, usd: 33000 },                     // per year: each further company or country with its own ERP
    setup: { eur: 60000, usd: 66000 },                     // one-time: setup for the first company
    setupExtra: { eur: 20000, usd: 22000 },                // one-time: setup for each further company
    share: 0.15,                                           // of the agreed annual value, conservative case
    keep: 3,                                               // the customer always keeps at least 3× the license: license ≤ value ÷ 3
    ramp: 0.5                                              // year one counts half the value (ramp-up), as in the business case
  },
  // the conservative case of the business case (the first preset in roi.js), used for the worked examples in the section
  example: { gm: 12, stock: 12, sales: 0.5, margin: 0.1, freed: 3.5, hold: 9,
    rows: [[1e9, 1], [1.2e9, 3], [3e9, 6], [1e10, 12]],    // revenue in scope, connected companies (we work from 1bn revenue)
    slider: { min: 1e9, max: 2e10, start: 1.2e9 } },       // the one slider in the offer document: annual revenue, log scale
  // one year's license for an agreed value (in the same currency); companies = connected companies with their own ERP
  fee(value, companies = 1, cur = 'eur') {
    const L = this.license, base = L.base[cur] + Math.max(0, companies - 1) * L.extra[cur];
    const share = L.share * value, cap = value / L.keep, full = base + share;
    // below the base the cap would not cover running costs: the license stays at the base and we say it is not a fit yet
    return { base, share, cap, fee: Math.max(base, Math.min(full, cap)), capped: full > cap, fit: cap >= base };
  },
  setupFee(companies = 1, cur = 'eur') { return this.license.setup[cur] + Math.max(0, companies - 1) * this.license.setupExtra[cur]; },
  // the slider position (0 to 1000, log scale) and the revenue it stands for, rounded the way people say it
  revAt(x) { const { min, max } = this.example.slider, r = min * Math.pow(max / min, x / 1000); return r < 5e9 ? Math.round(r / 5e7) * 5e7 : Math.round(r / 5e8) * 5e8; },
  posOf(rev) { const { min, max } = this.example.slider; return Math.round(1000 * Math.log(rev / min) / Math.log(max / min)); },
  // the conservative value per year for a revenue in scope, with the example's assumptions
  exampleValue(rev) {
    const e = this.example;
    return rev * e.sales / 100 * e.gm / 100 + rev * e.margin / 100 + rev * e.stock / 100 * e.freed / 100 * e.hold / 100;
  }
};
window.PRICES = PRICES;

(() => {
  const sec = document.getElementById('pricing'); if (!sec) return;
  const seg = sec.querySelector('.pr-cur'), btns = [...seg.querySelectorAll('button')];

  // the estimate in the offer document: one slider (annual revenue), the license it gives, conservative case, one company
  const est = sec.querySelector('.pr-est'), de = document.documentElement.lang === 'de';
  const nf = (v, d = 0) => new Intl.NumberFormat(de ? 'de-DE' : 'en-US', { maximumFractionDigits: d }).format(v);
  const money = (v, cur) => new Intl.NumberFormat(de ? 'de-DE' : 'en-US', { style: 'currency', currency: cur.toUpperCase(), maximumFractionDigits: 0 }).format(Math.round(v / 1000) * 1000);
  const big = (v, cur) => { const sym = cur === 'eur' ? '€' : '$', bn = v >= 1e9, n = nf(v / (bn ? 1e9 : 1e6), 1);
    return de ? `${n}\u00a0${bn ? 'Mrd.' : 'Mio.'}\u00a0${sym}` : `${sym}${n}${bn ? 'bn' : 'm'}`; };
  const pct = v => (de ? `${nf(v * 100)}\u00a0%` : `${nf(v * 100)}%`);
  const paint = () => {
    if (!est) return;
    const r = est.querySelector('input'), cur = sec.dataset.cur, rev = PRICES.revAt(+r.value), val = PRICES.exampleValue(rev), f = PRICES.fee(val, 1, cur);
    est.querySelector('output').textContent = big(rev, cur);
    est.querySelector('.pr-est-v b').textContent = money(f.fee, cur);
    est.querySelector('.pr-est-s').textContent = est.dataset.s.replace('{v}', big(val, cur)).replace('{k}', pct(1 - f.fee / val));
    r.style.setProperty('--p', `${r.value / 10}%`); r.setAttribute('aria-valuetext', big(rev, cur));
  };
  if (est) est.querySelector('input').addEventListener('input', paint);

  const set = (cur, save) => {
    sec.querySelectorAll('[data-eur]').forEach(el => { el.textContent = el.dataset[cur]; });
    btns.forEach(b => b.setAttribute('aria-checked', String(b.dataset.cur === cur)));
    sec.dataset.cur = cur; paint();
    if (save) try { localStorage.setItem('dm-cur', cur); } catch (e) { /* private mode: the choice just is not kept */ }
  };
  btns.forEach(b => b.addEventListener('click', () => set(b.dataset.cur, true)));
  seg.hidden = false;
  let saved = null; try { saved = localStorage.getItem('dm-cur'); } catch (e) { /* no storage */ }
  if ((saved === 'eur' || saved === 'usd') && saved !== sec.dataset.cur) set(saved, false); else paint();
})();
