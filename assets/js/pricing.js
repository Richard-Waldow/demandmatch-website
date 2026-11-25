/* #pricing: every price and the license method in one place. The build (tools/build.mjs) writes the section, the worked
   examples, the FAQ answer, the formulas, the structured data and the Markdown from these numbers; roi.js prices the
   business case with PRICES.fee. On the page this script only switches the currency: each price carries both versions
   (data-eur, data-usd), the choice is remembered per browser.
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
    rows: [[1e9, 1], [1.2e9, 3], [3e9, 6], [1e10, 12]] },   // revenue in scope, connected companies (we work from 1bn revenue)
  // one year's license for an agreed value (in the same currency); companies = connected companies with their own ERP
  fee(value, companies = 1, cur = 'eur') {
    const L = this.license, base = L.base[cur] + Math.max(0, companies - 1) * L.extra[cur];
    const share = L.share * value, cap = value / L.keep, full = base + share;
    // below the base the cap would not cover running costs: the license stays at the base and we say it is not a fit yet
    return { base, share, cap, fee: Math.max(base, Math.min(full, cap)), capped: full > cap, fit: cap >= base };
  },
  setupFee(companies = 1, cur = 'eur') { return this.license.setup[cur] + Math.max(0, companies - 1) * this.license.setupExtra[cur]; },
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
  const set = (cur, save) => {
    sec.querySelectorAll('[data-eur]').forEach(el => { el.textContent = el.dataset[cur]; });
    btns.forEach(b => b.setAttribute('aria-checked', String(b.dataset.cur === cur)));
    sec.dataset.cur = cur;
    if (save) try { localStorage.setItem('dm-cur', cur); } catch (e) { /* private mode: the choice just is not kept */ }
  };
  btns.forEach(b => b.addEventListener('click', () => set(b.dataset.cur, true)));
  seg.hidden = false;
  let saved = null; try { saved = localStorage.getItem('dm-cur'); } catch (e) { /* no storage */ }
  if ((saved === 'eur' || saved === 'usd') && saved !== sec.dataset.cur) set(saved, false);
})();
