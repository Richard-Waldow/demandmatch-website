/* #pricing: every price in one place. The build (tools/build.mjs) writes the section, the FAQ answer, the structured data
   and the Markdown from these numbers; roi.js takes the license fees from here. On the page this script only switches
   the currency: each price carries both versions (data-eur, data-usd), the choice is remembered per browser.
   Prices are net. US dollar prices are the euro prices × 1.1, for customers in the US. */
const PRICES = {
  assess: { eur: 20000, usd: 22000 },                      // value assessment, 3 weeks, credited to the pilot
  pilot: { eur: 60000, usd: 66000 },                       // 30-day pilot, credited to year one
  tiers: {                                                 // annual license and one-time implementation
    division: { fee: { eur: 180000, usd: 198000 }, impl: { eur: 60000, usd: 66000 } },
    group: { fee: { eur: 450000, usd: 495000 }, impl: { eur: 150000, usd: 165000 } },
    global: { fee: { eur: 600000, usd: 660000 }, impl: { eur: 150000, usd: 165000 }, from: true }
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
