/* #pricing: the price list, the price tool and the business case, all from the numbers in PRICES below.
   Change a number here and run the build (tools/build.mjs): the page, the FAQ, the structured data and the Markdown follow.
   Everything above the line marked "page" is plain arithmetic that the build and the tests run as well; below it, the page.
   Revenue (R) is counted in millions of the chosen currency. All prices are net. In US dollars the same rates apply per $100m. */
const PRICES = {
  assess: { eur: 20000, usd: 25000 },                    // value assessment, 3 weeks, credited in full to the pilot
  pilot: { eur: 60000, usd: 65000 },                     // 30-day pilot, credited to the year-one license if signed within 30 days
  license: {
    // per 100 million of revenue in scope. Like tax brackets: each rate counts only for the revenue inside its band
    bands: [{ upTo: 1000, rate: 45000 }, { upTo: 3000, rate: 20000 }, { upTo: Infinity, rate: 10000 }],
    min: { eur: 180000, usd: 200000 },                   // per year
    round: 5000
  },
  onboarding: { share: 30, min: { eur: 60000, usd: 65000 }, round: 5000 }, // % of the annual license; included in a 3-year term
  terms: { start: 3 },                                   // 3 years (onboarding included) or 1 year (onboarding charged in year one)
  revenue: {                                             // the slider: a log scale from min to max, snapped to round steps
    min: 400, max: 20000, start: 1200,
    snap: [{ below: 1000, step: 50 }, { below: 5000, step: 100 }, { below: Infinity, step: 500 }],
    presets: [400, 1000, 2500, 5000, 10000]
  },
  roi: {
    cases: {                                             // % more revenue, margin points, % of stock sold earlier, % of sales time freed
      conservative: { uplift: .5, margin: .1, stock: 3.5, time: 10 },
      expected: { uplift: 1, margin: .3, stock: 10.5, time: 20 }
    },
    start: 'conservative',
    holding: 9,                                          // holding cost of stock, % per year
    ramp: 50,                                            // % of the annual value realised in year one
    effort: 32000,                                       // your own effort in year one
    gm: { min: 8, max: 25, step: .5, start: 12 },         // gross margin, %
    inventory: { min: 5, max: 25, step: .5, start: 12 },  // stock, % of revenue
    share: { min: 20, max: 100, step: 5, start: 60 },     // share of the business that runs through DemandMatch, %
    people: { min: 20, max: 2000, step: 10, start: 400 }, // people in sales and inside sales (freed time only)
    pcost: { min: 50000, max: 150000, step: 1000, start: 84000 } // cost per person and year (freed time only)
  }
};

const roundTo = (v, step) => Math.round(v / step) * step;
const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));

// the annual license for R million of revenue in scope
function licenseFee(R, cur) {
  const L = PRICES.license; let fee = 0, from = 0;
  for (const b of L.bands) { fee += b.rate * Math.max(0, Math.min(R, b.upTo) - from) / 100; from = b.upTo; }
  return Math.max(L.min[cur], roundTo(fee, L.round));
}
const onboardingFee = (license, cur) => { const O = PRICES.onboarding; return Math.max(O.min[cur], roundTo(license * O.share / 100, O.round)); };

// the slider: position 0 to 1000 <-> revenue on a log scale, snapped to the step of its range
const snapRev = R => { const V = PRICES.revenue, b = V.snap.find(x => R < x.below); return Math.min(V.max, Math.max(V.min, roundTo(R, b.step))); };
const revAt = x => { const V = PRICES.revenue; return snapRev(V.min * Math.pow(V.max / V.min, x / 1000)); };
const posOf = R => { const V = PRICES.revenue; return Math.round(1000 * Math.log(Math.min(V.max, Math.max(V.min, R)) / V.min) / Math.log(V.max / V.min)); };
const revStep = (R, dir) => { const b = PRICES.revenue.snap.find(x => (dir > 0 ? R : R - 1e-9) < x.below); return snapRev(R + dir * b.step); };

// the business case. s: { R, cur, term, kase, gm, inv, share, people, pcost, cap }
function businessCase(s) {
  const C = PRICES.roi, k = C.cases[s.kase], rev = s.R * 1e6, sh = s.share / 100, stock = rev * s.inv / 100;
  const levers = [rev * k.uplift / 100 * s.gm / 100, rev * k.margin / 100, stock * k.stock / 100 * C.holding / 100].map(v => v * sh);
  const cash = levers[0] + levers[1] + levers[2];
  const capFte = s.people * sh * k.time / 100, capVal = capFte * s.pcost;
  const value = cash + (s.cap ? capVal : 0);
  const license = licenseFee(s.R, s.cur), onboarding = onboardingFee(license, s.cur), onb = s.term === 1 ? onboarding : 0;
  const val = [value * C.ramp / 100, value, value], cost = [license + onb + C.effort, license, license];
  let cum = 0; const net = val.map((v, i) => (cum += v - cost[i]));
  const V3 = val[0] + val[1] + val[2], C3 = cost[0] + cost[1] + cost[2];
  // payback: each year's cost falls due at its start, the value arrives evenly month by month
  let pay = null, cv = 0, cc = 0;
  for (let m = 0; m < 36 && pay === null; m++) {
    const y = Math.floor(m / 12); if (m % 12 === 0) cc += cost[y];
    const mv = val[y] / 12;
    if (cv + mv >= cc && mv > 0) pay = m + (cc - cv) / mv;
    cv += mv;
  }
  return { license, onboarding, onb, effort: C.effort, year1: license + onb, per100: license / s.R * 100, levers, cash, capFte, capVal, value,
    perLicense: value / license, val, cost, net, V3, C3, roi: (V3 - C3) / C3, pay, release: stock * k.stock / 100 * sh };
}

// number formats. German: 490.000 €, 1,2 Mrd. €, 12 %. English: €490,000, €1.2bn, 12%
function formats(lang, cur) {
  const de = lang === 'de', sym = cur === 'usd' ? '$' : '€', loc = de ? 'de-DE' : 'en-US';
  const num = (v, d = 0) => new Intl.NumberFormat(loc, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
  const num1 = v => new Intl.NumberFormat(loc, { maximumFractionDigits: 1 }).format(v);
  const unit = (n, uDe, uEn) => (de ? `${n} ${uDe} ${sym}` : `${sym}${n}${uEn}`);
  const money = v => (de ? `${num(v)} ${sym}` : `${sym}${num(v)}`);
  // revenue, R in millions: 400 Mio. € / 1,2 Mrd. €; bn() always in billions: 0,4 Mrd. €
  const rev = R => (R >= 1000 ? unit(num1(R / 1000), 'Mrd.', 'bn') : unit(num1(R), 'Mio.', 'm'));
  const bn = R => unit(num1(R / 1000), 'Mrd.', 'bn');
  // amounts: below a million to the thousand, above in millions (d decimals, by default one below 100)
  const amt = (v, d) => {
    const a = Math.abs(v), s = v < 0 ? '−' : '';
    if (a >= 1e9) { const x = a / 1e9; return s + unit(num(x, d ?? (x >= 100 ? 0 : 1)), 'Mrd.', 'bn'); }
    if (a >= 1e6) { const x = a / 1e6; return s + unit(num(x, d ?? (x >= 100 ? 0 : 1)), 'Mio.', 'm'); }
    return s + money(roundTo(a, 1000));
  };
  const pct = (v, d = 0) => (de ? `${num(v, d)} %` : `${num(v, d)}%`).replace('-', '−');
  // a number in the unit of another: 1 (of 1 bis 3 Mrd. €)
  const short = (R, of) => num1(of >= 1000 ? R / 1000 : R);
  return { lang, cur, sym, num, money, rev, bn, amt, pct, short };
}

// the rate table: [label, value] rows from the bands and the minimum. t: key -> text
function rateRows(t, f) {
  const B = PRICES.license.bands, u = f.rev(100);
  return B.map((b, i) => {
    const from = i ? B[i - 1].upTo : 0, lab = t('pq_band')[i === 0 ? 0 : b.upTo === Infinity ? 2 : 1];
    return [fill(lab, { to: f.rev(b.upTo), from: f.rev(from), fromN: f.short(from, b.upTo) }), fill(t('pq_rate'), { rate: f.money(b.rate), u })];
  }).concat([[t('pq_min')[0], fill(t('pq_min')[1], { min: f.money(PRICES.license.min[f.cur]) })]]);
}

/* ---------------------------------------------------------------- page */
window.PRICES = PRICES;
(() => {
  const sec = document.getElementById('pricing'); if (!sec || !window.UI) return;
  const t = k => window.UI.t(k), lang = window.UI.lang;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pq = document.getElementById('pq-app'), ra = document.getElementById('roi-app');
  const C = PRICES.roi, V = PRICES.revenue, CASES = Object.keys(C.cases);
  const S = { cur: sec.dataset.cur === 'usd' ? 'usd' : 'eur', R: V.start, term: PRICES.terms.start, kase: C.start,
    gm: C.gm.start, inv: C.inventory.start, share: C.share.start, people: C.people.start, pcost: C.pcost.start, cap: false };
  let f = formats(lang, S.cur);

  // ------------------------------------------------------------------ the business case inputs (revenue comes from the price tool)
  const IN = [
    { k: 'gm', c: C.gm, g: 1, fmt: v => f.pct(v, v % 1 ? 1 : 0) },
    { k: 'inv', c: C.inventory, g: 1, fmt: v => f.pct(v, v % 1 ? 1 : 0), hint: () => `≈ ${f.amt(S.R * 1e6 * S.inv / 100)}` },
    { k: 'share', c: C.share, g: 1, fmt: v => f.pct(v), hint: () => t('roi_scope_h') },
    { k: 'people', c: C.people, g: 2, fmt: v => `${f.num(v)} ${t('roi_people_u')}` },
    { k: 'pcost', c: C.pcost, g: 2, fmt: v => f.amt(v) }
  ];
  const LABEL = { gm: 'roi_gm', inv: 'roi_stock', share: 'roi_scope', people: 'roi_people', pcost: 'roi_pcost' };

  // ------------------------------------------------------------------ markup
  const fact = (k, label = '') => `<div class="roi-f ${k}"><dt>${esc(label)}</dt><dd><b></b><small></small></dd></div>`;
  const row = i => `
    <div class="roi-r" data-k="${i.k}">
      <label for="roi-${i.k}">${esc(t(LABEL[i.k]))}</label><output for="roi-${i.k}"></output>
      <input type="range" id="roi-${i.k}" min="${i.c.min}" max="${i.c.max}" step="${i.c.step}">
      ${i.hint ? '<small></small>' : ''}
    </div>`;

  if (pq) pq.innerHTML = `
    <div class="pq">
      <div class="pq-in">
        <div class="pq-rev">
          <label class="pq-l" for="pq-range">${esc(t('pq_rev'))}</label>
          <div class="pq-field"><span class="pq-pre" aria-hidden="true"></span><input class="pq-num" id="pq-num" type="text" inputmode="decimal" autocomplete="off" spellcheck="false"><span class="pq-suf" aria-hidden="true"></span></div>
          <input class="pq-range" type="range" id="pq-range" min="0" max="1000" step="1">
          <p class="pq-help">${esc(t('pq_help'))}</p>
        </div>
        <div class="pq-chips" role="group" aria-label="${esc(t('pq_presets'))}">${V.presets.map(v => `<button type="button" data-rev="${v}"></button>`).join('')}</div>
        <div class="pq-term"><span class="pq-l" id="pq-term-l">${esc(t('pq_term'))}</span>
          <div class="roi-seg roi-seg-s" role="radiogroup" aria-labelledby="pq-term-l">${[3, 1].map(n =>
            `<button type="button" role="radio" data-term="${n}">${esc(t(`pq_term_${n}`))}</button>`).join('')}</div></div>
      </div>
      <div class="pq-out">
        <dl class="roi-facts pq-facts">${fact('pq-lic', t('pq_lic'))}${fact('pq-per')}${fact('pq-y1', t('pq_y1'))}</dl>
        <p class="pq-max" hidden></p>
        <ul class="pq-rates"></ul>
        <p class="pq-note">${esc(t('pq_brackets'))}</p>
        <p class="pq-exp">${esc(t('pq_expand'))}</p>
        <p class="pq-disc">${esc(t('pq_disc'))}</p>
      </div>
    </div>`;

  if (ra) ra.innerHTML = `
    <div class="roi-sheet rv">
      <div class="roi-in">
        <div class="roi-seg roi-presets" role="radiogroup" aria-label="${esc(t('roi_cases_label'))}">
          ${CASES.map((k, i) => `<button type="button" role="radio" data-case="${k}">${esc(t('roi_cases')[i])}</button>`).join('')}
        </div>
        <div class="roi-mini" aria-hidden="true"><span></span><span></span></div>
        <fieldset class="roi-g"><legend>${esc(t('roi_g1'))}</legend>
          <div class="roi-r roi-rev"><span class="roi-lbl">${esc(t('pq_rev'))}</span><output></output><small>${esc(t('roi_rev_h'))}</small></div>
          ${IN.filter(i => i.g === 1).map(row).join('')}
        </fieldset>
        <fieldset class="roi-g"><legend>${esc(t('roi_g2'))}</legend>${IN.filter(i => i.g === 2).map(row).join('')}
          <p class="roi-g-h">${esc(t('roi_g2_h'))}</p></fieldset>
      </div>
      <div class="roi-side"><aside class="roi-out">
        <img class="roi-art" src="${window.SHARED_BASE || 'assets/'}art/roi-silos.jpg" alt="" loading="lazy" decoding="async">
        <div class="roi-memo">
          <p class="roi-memo-h"><span>${esc(t('roi_memo'))}</span><span class="roi-memo-c"></span></p>
          <dl class="roi-facts">${fact('roi-f-val', t('roi_value'))}${fact('roi-f-per')}${fact('roi-f-pay', t('roi_payback'))}${fact('roi-f-roi', t('roi_roi'))}</dl>
          <p class="roi-cash"></p>
          <p class="roi-assume"></p>
          <div class="roi-blk">
            <p class="roi-h">${esc(t('roi_levers'))}</p>
            <div class="roi-bar" aria-hidden="true"><i></i><i></i><i></i></div>
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

  const q = s => sec.querySelector(s), qa = s => [...sec.querySelectorAll(s)];
  const num = q('#pq-num'), range = q('#pq-range');
  const rows = Object.fromEntries(IN.map(i => [i.k, { i, el: q(`.roi-r[data-k="${i.k}"]`), input: q(`#roi-${i.k}`) }]));
  const cta = q('.pr-foot [data-mail]'), mailTo = cta ? cta.getAttribute('href').split('?')[0] : null;
  const setFact = (k, b, s) => { const el = q(`.roi-f.${k}`); if (!el) return; el.querySelector('b').textContent = b; el.querySelector('small').textContent = s; };

  // ------------------------------------------------------------------ paint: every number and every label that carries the currency
  function paint() {
    f = formats(lang, S.cur);
    const m = businessCase(S), atMax = S.R >= V.max, maxText = fill(t('pq_max'), { v: f.bn(V.max) });
    const caseName = t('roi_cases')[CASES.indexOf(S.kase)], termName = t(S.term === 3 ? 'pq_term_3s' : 'pq_term_1');

    if (pq) {
      const [pre, suf] = t('pq_unit').map(x => fill(x, { c: f.sym }));
      q('.pq-pre').textContent = pre; q('.pq-suf').textContent = suf;
      num.setAttribute('aria-label', fill(t('pq_rev_in'), { c: f.sym }));
      if (document.activeElement !== num) num.value = f.num(S.R);
      range.value = posOf(S.R);
      range.style.setProperty('--p', `${range.value / 10}%`);
      range.setAttribute('aria-valuetext', atMax ? maxText : f.rev(S.R));
      qa('[data-rev]').forEach((b, i) => { const v = +b.dataset.rev;
        b.textContent = i === 0 ? fill(t('pq_one'), { v: f.bn(v) }) : f.bn(v); b.setAttribute('aria-pressed', String(S.R === v)); });
      qa('[data-term]').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.term === S.term)));

      q('.pq-facts').hidden = atMax;
      const mx = q('.pq-max'); mx.hidden = !atMax; mx.textContent = maxText;
      setFact('pq-lic', f.money(m.license), t('pr_year'));
      q('.roi-f.pq-per dt').textContent = fill(t('pq_per'), { u: f.rev(100) });
      setFact('pq-per', f.money(roundTo(m.per100, 100)), fill(t('pq_per_s'), { r: f.rev(S.R) }));
      setFact('pq-y1', f.money(m.year1), S.term === 3 ? t('pq_onb_incl') : fill(t('pq_onb'), { o: f.money(m.onb) }));
      const B = PRICES.license.bands, isMin = m.license === PRICES.license.min[S.cur];
      q('.pq-rates').innerHTML = rateRows(t, f).map(([a, b], i) => {
        const on = i < B.length ? (i === 0 || S.R > B[i - 1].upTo) && !isMin : isMin;
        return `<li${on ? ' class="on"' : ''}><span>${esc(a)}</span><b>${esc(b)}</b></li>`; }).join('');
    }

    if (ra) {
      q('.roi-rev output').textContent = atMax ? maxText : f.rev(S.R);
      IN.forEach(i => {
        const { el, input } = rows[i.k], v = S[i.k];
        input.value = v;
        el.querySelector('output').textContent = i.fmt(v);
        input.setAttribute('aria-valuetext', i.fmt(v));
        input.style.setProperty('--p', `${((v - i.c.min) / (i.c.max - i.c.min)) * 100}%`);
        if (i.hint) el.querySelector('small').textContent = i.hint();
      });
      qa('[data-case]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.case === S.kase)));
      q('.roi-sw input').checked = S.cap;
      q('.roi-memo-c').textContent = [caseName, f.rev(S.R), termName].join(' · ');

      const payTxt = m.pay === null ? t('roi_never') : `${f.num(m.pay, 1)} ${t('roi_months')}`;
      setFact('roi-f-val', f.amt(m.value, m.value >= 1e6 ? 2 : undefined), t('roi_value_s'));
      q('.roi-f.roi-f-per dt').textContent = fill(t('roi_per'), { one: f.money(1) });
      const per = f.num(m.perLicense, 1);
      setFact('roi-f-per', lang === 'de' ? `${per} ${f.sym}` : `${f.sym}${per}`, fill(t('roi_per_s'), { l: f.money(m.license) }));
      setFact('roi-f-pay', payTxt, fill(t('roi_pay_s'), { c: f.amt(m.cost[0]) }));
      setFact('roi-f-roi', f.pct(m.roi * 100), fill(t('roi_roi_s'), { v: f.amt(m.V3), c: f.amt(m.C3) }));
      const rel = m.release / 1e6;
      q('.roi-cash').textContent = fill(t('roi_cash'), { x: f.amt(m.release, rel >= 1 ? (rel < 10 ? 2 : 1) : undefined) });
      const k = C.cases[S.kase], d1 = v => (v % 1 ? 1 : 0);
      q('.roi-assume').textContent = fill(t('roi_assume'), { case: caseName, u: f.pct(k.uplift, d1(k.uplift)), m: f.num(k.margin, 1),
        s: f.pct(k.stock, d1(k.stock)), sh: f.pct(S.share) });

      const tot = m.cash || 1;
      qa('.roi-bar i').forEach((el, i) => { el.style.width = `${(m.levers[i] / tot) * 100}%`; });
      qa('.roi-leg b').forEach((el, i) => { el.textContent = f.amt(m.levers[i]); });
      q('.roi-cap-s').textContent = fill(t('roi_cap_s'), { f: f.num(m.capFte), v: f.amt(m.capVal) });
      q('.roi-capb').classList.toggle('on', S.cap);
      const cells = qa('.roi-yrs tbody tr');
      [m.val, m.cost, m.net].forEach((arr, r) => [...cells[r].querySelectorAll('td')].forEach((td, i) => {
        td.textContent = f.amt(arr[i]); td.classList.toggle('neg', arr[i] < 0 && r === 2);
      }));
      q('.roi-costl').textContent = fill(t('roi_cost_l'), { l: f.money(m.license), o: S.term === 3 ? t('roi_onb_incl') : f.money(m.onb),
        d: f.money(m.effort), p: f.money(PRICES.pilot[S.cur]) });
      const mini = qa('.roi-mini span');
      mini[0].textContent = `${t('roi_payback')} ${payTxt}`; mini[1].textContent = `ROI ${f.pct(m.roi * 100)}`;
    }

    // the fit check request carries the chosen revenue and term
    if (cta && mailTo) {
      const body = fill(t('pq_mail_body'), { r: f.rev(S.R), t: termName, l: atMax ? maxText : f.money(m.license) }).replace(/\n/g, '\r\n');
      cta.href = `${mailTo}?subject=${encodeURIComponent(t('pq_mail_subject'))}&body=${encodeURIComponent(body)}`;
    }
  }

  // ------------------------------------------------------------------ the price tool: slider, number field, presets, term
  if (pq) {
    range.addEventListener('input', () => { S.R = revAt(+range.value); paint(); });
    // keys move from one round step to the next (the log scale alone would stay on the same snapped value for several presses)
    range.addEventListener('keydown', e => {
      const n = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (n) { e.preventDefault(); let R = S.R; for (let i = 0; i < Math.abs(n); i++) R = revStep(R, Math.sign(n)); S.R = R; paint(); }
      else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); S.R = e.key === 'Home' ? V.min : V.max; paint(); }
    });
    const parse = s => {
      let x = s.replace(/[^\d.,]/g, '');
      x = lang === 'de' ? x.replace(/\./g, '').replace(',', '.') : x.replace(/,/g, '');
      const v = parseFloat(x); return Number.isFinite(v) && v >= .5 ? Math.min(100000, Math.round(v)) : null;
    };
    num.addEventListener('input', () => { const v = parse(num.value); if (v !== null) { S.R = v; paint(); } });
    num.addEventListener('change', () => { num.value = f.num(S.R); });
    num.addEventListener('blur', () => { num.value = f.num(S.R); });
    num.addEventListener('keydown', e => { if (e.key === 'Enter') { num.value = f.num(S.R); num.select(); } });
    qa('[data-rev]').forEach(b => b.addEventListener('click', () => { S.R = +b.dataset.rev; paint(); }));
    qa('[data-term]').forEach(b => b.addEventListener('click', () => { S.term = +b.dataset.term; paint(); }));
  }

  // ------------------------------------------------------------------ the business case: case, sliders, freed time
  if (ra) {
    IN.forEach(i => rows[i.k].input.addEventListener('input', e => { S[i.k] = +e.target.value; paint(); }));
    qa('[data-case]').forEach(b => b.addEventListener('click', () => { S.kase = b.dataset.case; paint(); }));
    q('.roi-sw input').addEventListener('change', e => { S.cap = e.target.checked; paint(); });
  }

  // ------------------------------------------------------------------ currency: every price carries both versions (data-eur, data-usd)
  const seg = q('.pr-cur'), btns = seg ? [...seg.querySelectorAll('button')] : [];
  const setCur = (cur, save) => {
    sec.querySelectorAll('[data-eur]').forEach(el => { el.textContent = el.dataset[cur]; });
    btns.forEach(b => b.setAttribute('aria-checked', String(b.dataset.cur === cur)));
    sec.dataset.cur = cur; S.cur = cur;
    if (save) try { localStorage.setItem('dm-cur', cur); } catch (e) { /* private mode: the choice just is not kept */ }
    paint();
  };
  btns.forEach(b => b.addEventListener('click', () => setCur(b.dataset.cur, true)));
  if (seg) seg.hidden = false;

  // ------------------------------------------------------------------ share and print. The link carries only the numbers, nothing personal
  const KEYS = ['R', 'term', 'kase', 'gm', 'inv', 'share', 'people', 'pcost', 'cap', 'cur'];
  const enc = { kase: v => CASES.indexOf(v), cap: v => (v ? 1 : 0), cur: v => (v === 'usd' ? 1 : 0) };
  function link() {
    const u = new URL(location.href);
    u.search = ''; u.hash = 'roi';
    u.searchParams.set('roi', KEYS.map(k => (enc[k] ? enc[k](S[k]) : S[k])).join('_'));
    return u.href;
  }
  const lb = q('[data-roi-link]');
  if (lb) lb.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(link()); } catch (e) { history.replaceState(null, '', link()); }
    lb.querySelector('span').textContent = t('roi_copied');
    setTimeout(() => { lb.querySelector('span').textContent = t('roi_link'); }, 1800);
  });
  q('[data-roi-print]')?.addEventListener('click', () => window.print());

  let saved = null; try { saved = localStorage.getItem('dm-cur'); } catch (e) { /* no storage */ }
  if (saved === 'eur' || saved === 'usd') S.cur = saved;
  const shared = new URLSearchParams(location.search).get('roi');
  const v = shared ? shared.split('_').map(Number) : [];
  if (v.length === KEYS.length && v.every(Number.isFinite)) {
    const clamp = (x, c) => Math.min(c.max, Math.max(c.min, x));
    S.R = Math.min(100000, Math.max(1, Math.round(v[0]))); S.term = v[1] === 1 ? 1 : 3; S.kase = CASES[v[2]] || C.start;
    IN.forEach(i => { S[i.k] = clamp(v[KEYS.indexOf(i.k)], i.c); });
    S.cap = v[8] === 1; S.cur = v[9] === 1 ? 'usd' : 'eur';
  }
  if (S.cur !== sec.dataset.cur) setCur(S.cur, false); else paint();
  if (shared) requestAnimationFrame(() => document.getElementById('roi')?.scrollIntoView());

  // the reveal observer in site.js has already run, so this sheet reveals on its own
  const sheet = q('.roi-sheet');
  if (sheet) new IntersectionObserver(([e], io) => { if (e.isIntersecting) { sheet.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -12% 0px' }).observe(sheet);
  // a memo taller than the window sticks by its bottom edge instead, so its last lines can always be read
  const out = q('.roi-out');
  if (out) { const fit = () => { out.style.setProperty('--roi-top', `${Math.min(76, innerHeight - out.offsetHeight - 16)}px`); };
    addEventListener('resize', fit); new ResizeObserver(fit).observe(out); fit(); }
  window.PRICING = { S, paint, licenseFee, businessCase };
})();
