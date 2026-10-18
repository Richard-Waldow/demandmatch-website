/* DemandMatch company site.
   1. Text in German and English (T), the contact address, the language switch.
   2. The hero field: demand particles drift in from the left, stock from the right; where they meet they pair up.
   3. The headline reveals word by word; sections fade in as they arrive (IntersectionObserver, no scroll listeners).
   4. The approach story: the panel follows the step being read (understand, match, act).
   5. Small pointer effects: spotlight on tiles, magnetic primary buttons.
   Everything runs without third-party code and stays still for visitors who prefer reduced motion. */
(() => {
  // the contact address: change it here once the domain and mailbox exist
  const EMAIL = 'hello@waldowautomation.com';

  const T = {
    de: {
      nav_problem: 'Problem', nav_approach: 'Ansatz', nav_principles: 'So arbeiten wir', nav_team: 'Team',
      eyebrow: 'Vertriebsautomatisierung für den B2B-Handel',
      h1: 'Kundenbedarf, abgeglichen mit Ihrem Bestand.',
      lead: 'Wir gleichen jede Kundenanfrage mit Ihrem Bestand ab, damit Ihr Vertrieb weiß, wem er was anbieten kann.',
      cta: 'Sprechen Sie uns an', cta2: 'So funktioniert es',
      m_demand: 'Bedarf', m_stock: 'Bestand', m_match: 'Abgleich',
      c1: 'E-Mail', c2: 'Telefon', c7: 'Lager', c8: 'Zulauf', c9: 'Kontingent',
      md: [['envelope-simple', 'E-Mail', 'Anfrage über 20 t', '20 t · KW 46'], ['phone', 'Anruf', '3 Preisstaffeln', '1, 3, 5 t'], ['database', 'CRM', 'Rahmenabruf', '8 Paletten'], ['whatsapp-logo', 'WhatsApp', '„Wie immer“', '12 t wie zuletzt']],
      ms: [['warehouse', 'Lager', 'sofort verfügbar'], ['boat', 'Zulauf', 'in 2 Wochen'], ['factory', 'Kontingent', 'beim Hersteller'], ['buildings', 'Lager', 'zweiter Standort']],
      draft_t: 'Angebot vorbereitet', draft_s: 'Wartet auf Ihre Freigabe', approve: 'Freigeben',
      p_h: 'Im Großhandel wird mit verstreuten Informationen verkauft.',
      p_lead: 'Anfragen gehen per E-Mail, Telefon und CRM ein. Der Bestand ändert sich täglich. DemandMatch führt beides zusammen, damit Ihr Vertrieb seine Zeit mit Verkaufen verbringt.',
      p1_t: 'Der Bedarf kommt von überall', p1_d: 'Anfragen, Abrufe und Preisfragen gehen per E-Mail, Telefon, Messenger und CRM ein, in jedem Format.',
      p2_t: 'Der Bestand steht nie still', p2_d: 'Lagerbestände, Zuläufe, Kontingente und Preise ändern sich schneller, als jede Tabelle mithalten kann.',
      p3_t: 'Statt zu verkaufen, wird gesucht', p3_d: 'Ihr Vertrieb sucht Daten zusammen, überträgt sie von Hand und läuft Rückmeldungen hinterher, statt mit Kunden zu sprechen.',
      a_h: 'Was DemandMatch leistet', a_lead: 'Eine Ebene über Ihren bestehenden Systemen, die die Vorarbeit übernimmt, damit sich Ihr Team aufs Verkaufen konzentrieren kann.',
      a1_t: 'Verstehen', a1_d: 'Jede eingehende Anfrage wird gelesen und in klaren Bedarf übersetzt: was, wie viel, bis wann.',
      a2_t: 'Abgleichen', a2_d: 'Der Bedarf wird mit Lager, Zulauf und Marge abgeglichen, jeweils nachvollziehbar begründet.',
      a3_t: 'Handeln', a3_d: 'Ihr Vertrieb erhält priorisierte nächste Schritte und fertige Entwürfe. Was rausgeht, entscheidet er selbst.',
      o1: 'Mehr Zeit für Kunden', o2: 'Schnellere Antworten', o3: 'Nachfassen, das stattfindet', o4: 'Marge im Blick',
      w_h: 'So arbeiten wir',
      w1_t: 'Maßgeschneidert für Ihr Unternehmen', w1_d: 'Jede Einführung wird auf Ihr Sortiment, Ihre Regeln und Ihr Team zugeschnitten. Keine Standardsoftware.',
      w2_t: 'Auf Ihren bestehenden Systemen', w2_d: 'Funktioniert mit dem ERP, CRM und Postfach, die Sie schon nutzen. Nichts zu migrieren, kein neues Tool zu lernen.',
      w3_t: 'Menschen entscheiden', w3_d: 'Ohne Freigabe durch Ihr Team erreicht nichts einen Kunden.',
      w4_t: 'Ihre Daten bleiben bei Ihnen', w4_d: 'Klare Regeln, auf welche Daten zugegriffen und wo sie verarbeitet werden, abgestimmt mit Ihrer IT.',
      w5_t: 'Klein anfangen', w5_d: 'Ein Pilot mit einer Produktgruppe zeigt den Nutzen innerhalb weniger Wochen, bevor Sie ausweiten.',
      f_h: 'Für den Handel mit physischen Gütern', f_d: 'Großhändler und Distributoren mit großem Sortiment, vielen Kunden und Bestand in Bewegung.',
      f1: 'Chemie und Kunststoffe', f2: 'Energie und Elektrotechnik', f3: 'Industriebedarf', f4: 'Technische Komponenten',
      t_h: 'Wer wir sind', t_d: 'DemandMatch wurde von Richard von Waldow und Bing Cai gegründet. Wir entwickeln Vertriebssoftware gemeinsam mit den Unternehmen, die sie nutzen.',
      t_role: 'Mitgründer',
      c_h: 'Sprechen wir über Ihren Vertrieb.', c_d: 'Erzählen Sie uns kurz, wie Sie heute verkaufen. Wir melden uns persönlich bei Ihnen.',
      mail_subject: 'Anfrage über die Website',
      imprint: 'Impressum', privacy: 'Datenschutz',
      title: 'DemandMatch · Vertriebsautomatisierung für den B2B-Handel',
    },
    en: {
      nav_problem: 'Problem', nav_approach: 'Approach', nav_principles: 'How we work', nav_team: 'Team',
      eyebrow: 'Sales automation for B2B distribution',
      h1: 'Customer demand, matched to your stock.',
      lead: 'We match every customer request to your stock, so your sales team knows what to offer to whom.',
      cta: 'Talk to us', cta2: 'How it works',
      m_demand: 'Demand', m_stock: 'Stock', m_match: 'Match',
      c1: 'Email', c2: 'Phone', c7: 'Warehouse', c8: 'Inbound', c9: 'Allocation',
      md: [['envelope-simple', 'Email', 'Request for 20 t', '20 t · week 46'], ['phone', 'Call', '3 price tiers', '1, 3, 5 t'], ['database', 'CRM', 'Call-off', '8 pallets'], ['whatsapp-logo', 'WhatsApp', '"The usual"', '12 t as last time']],
      ms: [['warehouse', 'Warehouse', 'Available now'], ['boat', 'Inbound', 'In 2 weeks'], ['factory', 'Allocation', 'At the producer'], ['buildings', 'Warehouse', 'Second site']],
      draft_t: 'Offer drafted', draft_s: 'Waiting for your approval', approve: 'Approve',
      p_h: 'Distributors sell from scattered information.',
      p_lead: 'Requests arrive by email, phone and CRM. Stock changes every day. DemandMatch brings both together, so your account managers spend their time selling.',
      p1_t: 'Demand is everywhere', p1_d: 'Requests, call-offs and price questions arrive by email, phone, messenger and CRM, in every format.',
      p2_t: 'Stock never stands still', p2_d: 'Inventory, inbound goods, allocations and prices change faster than any spreadsheet can follow.',
      p3_t: 'Selling time goes to searching', p3_d: 'Account managers look things up, copy data and chase follow-ups instead of talking to customers.',
      a_h: 'What DemandMatch does', a_lead: 'A layer on top of your existing systems that does the preparation, so your team can do the selling.',
      a1_t: 'Understand', a1_d: 'Every incoming request is read and turned into clear demand: what, how much, by when.',
      a2_t: 'Match', a2_d: 'Demand is matched against stock, inbound goods and margin, with the reasons shown.',
      a3_t: 'Act', a3_d: 'Account managers get prioritised next steps and prepared drafts. They decide what goes out.',
      o1: 'More time with customers', o2: 'Faster answers', o3: 'Follow-ups that happen', o4: 'Margin in view',
      w_h: 'How we work',
      w1_t: 'Built for your business', w1_d: 'Every setup is tailored to your catalogue, your rules and your team. No off-the-shelf software.',
      w2_t: 'On top of your systems', w2_d: 'Works with the ERP, CRM and inbox you already have. Nothing to migrate, no new tool to learn.',
      w3_t: 'People decide', w3_d: 'Nothing reaches a customer without approval by your team.',
      w4_t: 'Your data stays yours', w4_d: 'Clear rules on what is accessed and where it is processed, agreed with your IT.',
      w5_t: 'Start small', w5_d: 'A pilot on one product family shows the value within weeks, before anything grows.',
      f_h: 'Made for distributors of physical goods', f_d: 'Wholesalers and distributors with large catalogues, many customers and stock that moves.',
      f1: 'Chemicals and plastics', f2: 'Energy and electrical', f3: 'Industrial supplies', f4: 'Technical components',
      t_h: 'Who we are', t_d: 'DemandMatch was founded by Richard von Waldow and Bing Cai. We build sales software together with the companies that use it.',
      t_role: 'Co-founder',
      c_h: "Let's talk about your sales process.", c_d: 'Tell us briefly how you sell today. We will get back to you personally.',
      mail_subject: 'Enquiry via the website',
      imprint: 'Legal notice', privacy: 'Privacy',
      title: 'DemandMatch · Sales automation for B2B distribution',
    },
  };

  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const store = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } } };
  // each language has its own address (/ German, /en/ English); the page says which one it is
  let lang = window.PAGE_LANG || store.get('dm-lang') || 'de';
  if (!T[lang]) lang = 'de';
  if (!reduced) root.classList.add('motion');
  if (!reduced && CSS.supports?.('animation-timeline: view()')) root.classList.add('sda'); // scroll-driven animations for the problem section

  // ------------------------------------------------------------------ 4. the approach story (defined first: apply() fills it)
  const story = (() => {
    const panel = document.querySelector('.panel'); if (!panel) return { fill() {}, set() {} };
    const body = panel.querySelector('.panel-body'), svg = panel.querySelector('.pl-links');
    const dl = panel.querySelector('.pl-d'), sl = panel.querySelector('.pl-s');
    const PAIRS = [[0, 1], [1, 0], [2, 2], [3, 3]]; // which stock item answers which request
    function draw() {
      const r0 = body.getBoundingClientRect(); if (!r0.width) return;
      svg.setAttribute('viewBox', `0 0 ${r0.width} ${r0.height}`);
      const at = (l, i) => l.children[i]?.getBoundingClientRect();
      svg.innerHTML = PAIRS.map(([d, s], i) => {
        const a = at(dl, d), b = at(sl, s); if (!a || !b) return '';
        const x1 = a.right - r0.left, y1 = a.top + a.height / 2 - r0.top, x2 = b.left - r0.left, y2 = b.top + b.height / 2 - r0.top, m = (x1 + x2) / 2;
        return `<path style="--i:${i}" pathLength="1" d="M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}"/>`;
      }).join('');
    }
    addEventListener('resize', () => requestAnimationFrame(draw));
    return {
      fill(t) {
        dl.innerHTML = t.md.map(([icon, title, meta, tag], i) => `<li style="--i:${i}"><span class="mi"><i class="ph-light ph-${icon}"></i></span><span class="mt"><b>${title}</b><small>${meta}</small></span><em class="tag">${tag}</em></li>`).join('');
        sl.innerHTML = t.ms.map(([icon, title, meta], i) => `<li style="--i:${i}"><span class="mi"><i class="ph-light ph-${icon}"></i></span><span class="mt"><b>${title}</b><small>${meta}</small></span></li>`).join('');
        requestAnimationFrame(draw);
      },
      set(s) {
        panel.dataset.step = s;
        document.querySelectorAll('.step').forEach(el => el.classList.toggle('on', +el.dataset.s === s));
        requestAnimationFrame(draw);
      },
    };
  })();
  // the step in the middle of the screen drives the panel
  const stepIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) story.set(+e.target.dataset.s); }), { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('.step').forEach(el => stepIO.observe(el));
  // on phones the panel sits above the steps, so it plays the three states on its own while it is on screen
  const panelEl = document.querySelector('.panel');
  if (panelEl && !reduced) {
    let auto = null, k = 0;
    new IntersectionObserver(([e]) => {
      const small = matchMedia('(max-width: 680px)').matches;
      if (e.isIntersecting && small && !auto) auto = setInterval(() => { k = (k + 1) % 3; story.set(k); }, 2600);
      else if ((!e.isIntersecting || !small) && auto) { clearInterval(auto); auto = null; }
    }, { threshold: .5 }).observe(panelEl);
  }

  // ------------------------------------------------------------------ 1. text
  function apply() {
    const t = T[lang];
    root.lang = lang;
    document.title = t.title;
    document.querySelectorAll('[data-i]').forEach(el => { el.textContent = t[el.dataset.i]; });
    document.querySelectorAll('[data-mail]').forEach(a => { a.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.mail_subject)}`; });
    document.querySelectorAll('[data-email]').forEach(el => { el.textContent = EMAIL; });
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang));
    // the headline, word by word
    const h1 = document.querySelector('.kin');
    if (h1) { h1.setAttribute('aria-label', t.h1); h1.innerHTML = t.h1.split(' ').map((w, i) => `<span class="w" aria-hidden="true" style="--d:${i + 1}"><span>${w}</span></span>`).join(' '); }
    // the sectors band: the four sectors, repeated so the loop is seamless
    const mq = document.querySelector('.mq-track');
    if (mq) { const set = ['f1', 'f2', 'f3', 'f4'].map((k, i) => `<span class="mq-i"><i class="ph-light ph-${['flask', 'lightning', 'gear-six', 'cpu'][i]}"></i>${t[k]}</span>`).join(''); mq.innerHTML = set + set; }
    story.fill(t);
  }
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
    const to = b.dataset.lang, url = window.LANG_URLS?.[to];
    if (url && to !== lang) { location.href = url + location.hash; return; }
    lang = to; store.set('dm-lang', lang); apply();
  }));
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // ------------------------------------------------------------------ 2. the hero field
  (() => {
    const cv = document.querySelector('.field'); if (!cv) return;
    const ctx = cv.getContext('2d');
    const DEM = '232,236,255', STK = '99,128,255';
    let W = 0, H = 0, P = [], flashes = [], running = false, mouse = { x: -999, y: -999 };
    const rnd = (a, b) => a + Math.random() * (b - a);
    function spawn(p, side, anywhere) {
      p.side = side;
      p.x = anywhere ? (side < 0 ? rnd(0, W * .7) : rnd(W * .55, W)) : (side < 0 ? rnd(-20, W * .02) : rnd(W * .98, W + 20));
      p.y = rnd(H * .06, H * .94);
      p.v = rnd(.25, .7); p.r = rnd(.9, 2.3); p.ph = rnd(0, Math.PI * 2); p.a = rnd(.3, .85);
      return p;
    }
    function size() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(100, Math.max(34, W / 14)));
      P = Array.from({ length: n * 2 }, (_, i) => spawn({}, i % 2 ? 1 : -1, true));
    }
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      const mid = W * .64; // they meet right of centre, away from the headline
      ctx.lineWidth = 1;
      // faint threads from each demand particle to its nearest stock particle; very close pairs near the meeting line match
      for (let i = 0; i < P.length; i += 2) {
        const a = P[i]; let best = null, bd = 120 * 120;
        for (let j = 1; j < P.length; j += 2) { const b = P[j]; const dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = b; } }
        if (!best) continue;
        ctx.strokeStyle = `rgba(${STK},${(1 - Math.sqrt(bd) / 120) * .25})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(best.x, best.y); ctx.stroke();
        if (bd < 16 * 16 && Math.abs(a.x - mid) < W * .22) { flashes.push({ x: (a.x + best.x) / 2, y: (a.y + best.y) / 2, t: 0 }); spawn(a, -1); spawn(best, 1); }
      }
      for (const p of P) {
        // demand streams right, stock streams left; they cross around the meeting line, unmatched ones fade out beyond it
        p.x += -p.side * p.v + Math.sin(t / 900 + p.ph) * .12;
        p.y += Math.sin(t / 1300 + p.ph * 2) * .25;
        const past = (p.x - mid) * -p.side; // how far it has travelled beyond the meeting line
        const fade = past > 0 ? Math.max(0, 1 - past / (W * .18)) : 1;
        if (fade <= 0) { spawn(p, p.side); continue; }
        const mx = p.x - mouse.x, my = p.y - mouse.y, md = Math.sqrt(mx * mx + my * my);
        if (md < 120) { const f = (1 - md / 120) * 2.2; p.x += mx / (md || 1) * f; p.y += my / (md || 1) * f; } // the pointer pushes particles aside
        if (p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) spawn(p, p.side);
        ctx.fillStyle = `rgba(${p.side < 0 ? DEM : STK},${p.a * fade})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      flashes = flashes.filter(f => f.t < 1);
      for (const f of flashes) {
        f.t += .02;
        ctx.strokeStyle = `rgba(255,255,255,${(1 - f.t) * .75})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(f.x, f.y, 4 + f.t * 28, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = `rgba(${STK},${(1 - f.t) * .95})`; ctx.beginPath(); ctx.arc(f.x, f.y, 3.2, 0, Math.PI * 2); ctx.fill();
      }
      if (running) requestAnimationFrame(frame);
    }
    size(); addEventListener('resize', size);
    if (reduced) { frame(0); return; }
    const hero = cv.parentElement;
    hero.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    hero.addEventListener('pointerleave', () => { mouse = { x: -999, y: -999 }; });
    const start = () => { if (!running) { running = true; requestAnimationFrame(frame); } };
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !document.hidden) start(); else running = false; }).observe(cv);
    document.addEventListener('visibilitychange', () => { if (document.hidden) running = false; else if (visible) start(); });
  })();

  // ------------------------------------------------------------------ 3. header and fade-ins
  const top = document.querySelector('.top'), sentinel = document.getElementById('top-sentinel');
  if (top && sentinel) new IntersectionObserver(([e]) => top.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);
  if (!reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .18, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv, .scatter').forEach(el => io.observe(el));
  } else document.querySelectorAll('.rv, .scatter').forEach(el => el.classList.add('in'));

  // ------------------------------------------------------------------ 5. pointer effects (mouse and trackpad only)
  if (fine && !reduced) {
    document.querySelectorAll('.b, .person').forEach(el => el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`); }));
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .18}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`; });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  apply();
  story.set(0);
})();
