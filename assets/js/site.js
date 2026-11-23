/* DemandMatch, atelier edition. All page text (DE default, EN), the UI shim the product app reads (window.UI),
   entrance + scroll reveals, and the small product moments in the four cards. No libraries. */
(() => {
  const EMAIL = 'hello@waldowautomation.com';
  const root = document.documentElement;
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = {
    de: {
      title: 'DemandMatch · Ihr Bestand findet seine Kunden',
      skip: 'Zum Inhalt', nav_value: 'Nutzen', nav_product: 'Produkt', nav_why: 'Warum', nav_how: 'So funktioniert es', nav_pilot: 'Pilot',
      cta: 'Demo anfragen', cta_try: 'Produkt ausprobieren', mail_subject: 'DemandMatch: Demo',
      h1: 'Jede Tonne Bestand findet ihren Kunden.',
      lead: 'DemandMatch gleicht Ihren Bestand automatisch mit dem Bedarf Ihrer Kunden ab. Ihr Vertrieb verkauft mehr, mit besserer Marge, und gibt nur noch frei.',
      for: 'Für Distributoren von Chemie, Kunststoffen und Industriebedarf.',
      cta_see: 'So sieht es aus',
      match_cap: 'Ein Posten Ware, den noch niemand gekauft hat. DemandMatch findet die Kunden, die genau das brauchen.',
      both_eyebrow: 'In beide Richtungen', both_h: 'Bedarf findet Bestand.<br><span class="mute">Bestand findet Bedarf.</span>',
      b1_k: 'Wenn eine Anfrage kommt', b1_h: 'Die Anfrage findet den richtigen Bestand.', b1_p: 'Aus jeder E-Mail und jedem Anruf: welches Material, aus welchem Lager, mit welcher Marge. In Minuten statt Stunden.',
      b2_k: 'Wenn Ware liegt', b2_h: 'Der Bestand findet seine Kunden.', b2_p: 'Überbestand und Ware im Zulauf gehen an die Kunden, die genau das kaufen, bevor sie altert oder abgeschrieben wird.',
      b2_lot: 'HDPE Lebensmittel', b2_free: '40 t frei', b2_r1: 'Kauft alle 3 Wochen HDPE', b2_r2: 'Gleiche Type im Frühjahr', b2_foot: 'Zwei Nachrichten warten auf Freigabe',
      v_eyebrow: 'Was es bringt', v_h: 'Mehr Umsatz, bessere Marge.<br><span class="mute">Und ein Vertrieb, der verkauft statt sucht.</span>',
      o1_h: 'Mehr Umsatz', o1_p: 'Keine Anfrage bleibt liegen, kein Kunde wird vergessen. Jede Gelegenheit liegt als fertiges Angebot bereit.',
      o2_h: 'Bessere Marge', o2_p: 'Jedes Angebot rechnet mit Fracht, Lager und Ihren Preisregeln. Und Ware, die liegt, wird verkauft statt abgeschrieben.',
      o2_ui: 'Angebot geprüft', o2_r1: 'Preisregel', o2_v1: 'Kundenstaffel', o2_r2: 'Fracht', o2_v2: 'Hamburg nach Bremen', o2_r3: 'Lager', o2_v3: 'Altbestand zuerst', o2_r4: 'Marge', o2_v4: 'Über Ziel',
      o3_h: 'Automatisch', o3_p: 'Lesen, abgleichen, Angebot schreiben: das läuft von selbst, auf Ihren bestehenden Systemen. Ihr Team gibt nur frei.',
      film_eyebrow: 'Vorher und nachher', film_h: 'Ein Vormittag im Vertrieb.<br><span class="mute">Erst von Hand, dann mit DemandMatch.</span>',
      t1_h: 'Nur lesend', t1_p: 'DemandMatch liest aus ERP, CRM und Postfach und ändert dort nichts.',
      t2_h: 'Ein Mensch gibt frei', t2_p: 'Kein Angebot und keine E-Mail geht raus, bevor Ihr Vertrieb es gesehen hat.',
      t3_h: 'Ihre Daten bleiben bei Ihnen', t3_p: 'Kein Umzug, keine Kopie Ihrer Systeme. Die Daten bleiben, wo sie sind.',
      t4_h: 'Mit Ihrer IT abgestimmt', t4_p: 'Anbindung und Rechte legen wir gemeinsam mit Ihrer IT fest.',
      works: 'Liest aus Ihren bestehenden Systemen',
      film_cap: 'Gespielt mit Beispieldaten.',
      sy_eyebrow: 'So funktioniert es',
      sy_h: 'Verteilt auf drei Arten von Systemen.<br><span class="mute">Der Autopilot macht daraus eine Liste.</span>',
      sy_lead: 'Heute holt Ihr Vertrieb den Kontext aus Outlook, Excel, SAP und dem CRM und gleicht ihn im Kopf ab. Der Autopilot liest aus allen und bündelt es, von der ersten Anfrage bis zum Auftrag in SAP. Nichts wird ersetzt.',
      try_eyebrow: 'Selbst ausprobieren', try_h: 'Probieren Sie es selbst.<br><span class="mute">Das echte Produkt, mit Beispieldaten.</span>',
      try: 'Zum Ausprobieren klicken', full: 'Vollbild', tabs_label: 'Bereiche des Produkts',
      tabs: [
        ['today', 'sun-horizon', 'Heute', 'Ihr Arbeitstag, sortiert nach dem, was Umsatz bringt. Jede Aufgabe mit Grund und Quelle.'],
        ['inbox', 'tray', 'Posteingang', 'E-Mails, Anrufe und CRM-Einträge, schon gelesen und als Bedarf erfasst.'],
        ['offer', 'file-text', 'Angebot', 'Das Angebot ist geschrieben, Preise und Marge geprüft. Sie sehen es an und geben frei.'],
        ['opps', 'chart-bar-horizontal', 'Pipeline', 'Jede Gelegenheit auf einer Zeitleiste, auch die wiederkehrenden aus dem Kaufrhythmus.'],
        ['gpt', 'chat-circle-text', 'Fragen', 'Bestand, Preise, Datenblätter, Alternativen. Fragen Sie, die Antwort nennt ihre Quelle.']
      ],
      why_eyebrow: 'Das Problem',
      why1: 'Anfragen warten im Postfach.', why2: 'Bestand wartet im Lager.', why3: 'Dazwischen geht Umsatz verloren.', why4: 'DemandMatch bringt beides zusammen.',
      how_a: 'Also haben wir eine Ebene gebaut,', how_b: 'die über Ihren Systemen liegt.',
      c1_h: 'Liest, was schon da ist.', c1_p: 'ERP, CRM, Postfach und Telefon. Lesend, ohne Systemwechsel.',
      c1_ui: 'Verbundene Quellen', c1_mail: 'Postfach', c1_r1: 'Bestand, Preise', c1_r2: 'Kunden, Verlauf', c1_r3: 'Anfragen', c1_r4: 'Nachrichten',
      c2_h: 'Versteht jede Anfrage.', c2_p: 'Produkt, Menge, Termin und Ort, aus jeder E-Mail und jedem Anruf.',
      c2_mail: 'Hallo Lena, für Mai brauchen wir wieder <mark>3 t PP 7032E3</mark>, Lieferung bis <mark>KW 19</mark> nach <mark>Bremen</mark>. Geht das zum alten Preis?',
      k_prod: 'Produkt', k_qty: 'Menge', k_date: 'Termin', k_date_v: 'KW 19', k_to: 'Ort',
      c3_h: 'Findet den passenden Bestand.', c3_p: 'Lager, Zulauf und Alternativen, mit Marge und Lieferzeit.',
      c3_need: 'Bedarf 3 t', c3_w1: 'Lager Hamburg', c3_w1s: '4,2 t frei · ab sofort', c3_fit: 'Passt', c3_w2: 'Zulauf KW 18', c3_w2s: '20 t · Rotterdam', c3_alt: 'Reserve', c3_margin: 'Marge nach Fracht',
      c4_h: 'Und Ihr Vertrieb gibt frei.', c4_p: 'Nichts geht raus, bevor ein Mensch es gesehen hat.',
      c4_t1: 'Angebot', c4_now: 'Jetzt', c4_m1: 'Novaform: 3 t PP 7032E3 aus Hamburg, 11,4 % Marge. Bereit zum Versand.', c4_ok: 'Freigeben',
      c4_t2: 'Nachfassen', c4_m2: 'Harzer Kunststoff hat seit 9 Tagen nicht geantwortet. Entwurf liegt bereit.', c4_ok2: 'Senden',
      c4_t3: 'Preisstaffel', c4_m3: 'Medplast fragt nur den Preis an: Staffel für 1, 3 und 5 t ist vorbereitet.', c4_ok3: 'Freigeben',
      c4_view: 'Ansehen', c4_sent: 'Gesendet',
      rule_eyebrow: 'Prinzip', rule: 'Der Autopilot bereitet vor. Entscheiden tut Ihr Vertrieb.',
      sp_eyebrow: 'Andersherum',
      sp_h: 'Ihr Bestand findet<br><span class="mute">seine Kunden von selbst.</span>',
      sp_sub: 'Ware im Zulauf, die noch niemand gekauft hat. Überbestand, der seit Wochen liegt. DemandMatch sieht, welche Kunden genau das brauchen, und bereitet jedem eine persönliche Nachricht vor.',
      sp_lot_k: 'Noch nicht verkauft', sp_lot_h: 'HDPE Lebensmittel', sp_lot_1: 'Zulauf KW 49 und Lager Hamburg', sp_lot_2: 'Sonderpreis −40 €/t bis Monatsende', sp_lot_3: 'Freigegeben vom Produktmanagement',
      sp_list_label: 'Kunden, die zu diesem Bestand passen',
      sp_rows: [
        ['Hanse Closures GmbH', 'fit', 'Kauft alle 3 Wochen HDPE für Verschlüsse. Nächster Abruf in etwa 9 Tagen.', 'SAP-Historie', '24 t'],
        ['Weser Getränketechnik GmbH', 'fit', 'Hatte HMA 016 im Frühjahr im Einsatz. Dieselbe Type.', 'SAP-Historie', '12 t'],
        ['Sauerland Haushaltswaren GmbH', 'maybe', 'Sagte am Telefon, HDPE sei einen Versuch wert.', 'Anruf', '4 t'],
        ['Emsland Rohrsysteme GmbH', 'no', 'Braucht PE100-Rohrtypen. Kein Ersatz.', 'SAP', ''],
        ['Folienwerk Nordheide GmbH', 'no', 'Folie in LLDPE. Diese Type passt nicht.', 'SAP', '']
      ],
      sp_fit: 'Passt', sp_maybe: 'Vielleicht', sp_no: 'Ausgelassen',
      sp_sum_a: '40 t an 3 Kunden, 2 bewusst ausgelassen.', sp_sum_b: 'Drei persönliche E-Mails warten auf Freigabe.', sp_open: 'Im Produkt ansehen',
      cu_eyebrow: 'Basisprodukt + Anpassung',
      cu_h: 'Was Sie gerade ausprobiert haben, ist das Basisprodukt.<br><span class="mute">Ihre Lösung bauen wir auf Ihr Haus zu.</span>',
      p_eyebrow: 'Pilot', p_h: 'In 30 Tagen im Einsatz.<br><span class="mute">Mit Ihren echten Daten.</span>',
      p_sub: 'Kein Systemwechsel, kein Großprojekt. Wir verbinden uns lesend und arbeiten mit Ihrem Team.',
      p1_w: 'Woche 1', p1_h: 'Verbinden', p1_p: 'Lesender Zugriff auf ERP, CRM und Postfach. Ihre Daten bleiben, wo sie sind.',
      p2_w: 'Woche 2', p2_h: 'Abgleichen', p2_p: 'Ihre echten Anfragen gegen Ihren echten Bestand, mit Ihren Regeln zu Marge und Kunden.',
      p3_w: 'Woche 3 und 4', p3_h: 'Arbeiten', p3_p: 'Ihr Team arbeitet damit und gibt frei. Wir messen gemeinsam, was es bringt.',
      team: 'Gegründet in Berlin von', role_r: 'Vertrieb und Produkt', role_b: 'Technik und Daten',
      end_h: 'Der nächste Auftrag<br><span class="mute">liegt schon in Ihrem Postfach.</span>', end_try: 'Zurück zum Produkt',
      foot_tag: 'Bestand und Bedarf, automatisch abgeglichen. Für den B2B-Handel.', f_product: 'Produkt', f_company: 'Unternehmen', f_legal: 'Rechtliches',
      imprint: 'Impressum', privacy: 'Datenschutz', foot_note: 'Alle Daten in der Demo sind Beispieldaten.'
    },
    en: {
      title: 'DemandMatch · Your stock finds its customers',
      skip: 'Skip to content', nav_value: 'Value', nav_product: 'Product', nav_why: 'Why', nav_how: 'How it works', nav_pilot: 'Pilot',
      cta: 'Book a demo', cta_try: 'Try the product', mail_subject: 'DemandMatch: demo',
      h1: 'Every tonne of stock finds its customer.',
      lead: 'DemandMatch matches your inventory with your customers\' demand, automatically. Your sales team sells more, at better margin, and only approves.',
      for: 'For distributors of chemicals, plastics and industrial goods.',
      cta_see: 'See how it looks',
      match_cap: 'A lot of stock nobody has bought yet. DemandMatch finds the customers who need exactly that.',
      both_eyebrow: 'Both ways', both_h: 'Demand finds stock.<br><span class="mute">Stock finds demand.</span>',
      b1_k: 'When a request comes in', b1_h: 'The request finds the right stock.', b1_p: 'From every email and call: which material, from which warehouse, at what margin. In minutes, not hours.',
      b2_k: 'When stock sits', b2_h: 'The stock finds its customers.', b2_p: 'Overstock and inbound goods go to the customers who buy exactly that, before they age or get written off.',
      b2_lot: 'HDPE food grade', b2_free: '40 t free', b2_r1: 'Buys HDPE every 3 weeks', b2_r2: 'Same grade last spring', b2_foot: 'Two messages waiting for approval',
      v_eyebrow: 'What it brings', v_h: 'More sales, better margin.<br><span class="mute">And a sales team that sells instead of searching.</span>',
      o1_h: 'More sales', o1_p: 'No request is left waiting, no customer forgotten. Every opportunity arrives as a finished offer.',
      o2_h: 'Better margin', o2_p: 'Every offer accounts for freight, storage and your pricing rules. And stock that sits gets sold instead of written off.',
      o2_ui: 'Offer checked', o2_r1: 'Price rule', o2_v1: 'Customer tier', o2_r2: 'Freight', o2_v2: 'Hamburg to Bremen', o2_r3: 'Stock', o2_v3: 'Oldest first', o2_r4: 'Margin', o2_v4: 'Above target',
      o3_h: 'Automated', o3_p: 'Reading, matching, writing the offer: it runs by itself, on the systems you already have. Your team only approves.',
      film_eyebrow: 'Before and after', film_h: 'A morning in sales.<br><span class="mute">First by hand, then with DemandMatch.</span>',
      t1_h: 'Read-only', t1_p: 'DemandMatch reads from ERP, CRM and inbox and changes nothing there.',
      t2_h: 'A person approves', t2_p: 'No offer and no email goes out before your sales team has seen it.',
      t3_h: 'Your data stays with you', t3_p: 'No migration, no copy of your systems. The data stays where it is.',
      t4_h: 'Agreed with your IT', t4_p: 'We set up the connection and access rights together with your IT.',
      works: 'Reads from the systems you already run',
      film_cap: 'Played with sample data.',
      sy_eyebrow: 'How it works',
      sy_h: 'Spread across three kinds of systems.<br><span class="mute">The autopilot makes it one list.</span>',
      sy_lead: 'Today your sales team pulls context from Outlook, Excel, SAP and the CRM and reconciles it in their heads. The autopilot reads from all of them and brings it together, from the first request to the order in SAP. Nothing is replaced.',
      try_eyebrow: 'Try it yourself', try_h: 'Try it yourself.<br><span class="mute">The real product, with sample data.</span>',
      try: 'Click to try it', full: 'Fullscreen', tabs_label: 'Areas of the product',
      tabs: [
        ['today', 'sun-horizon', 'Today', 'Your workday, ordered by what brings revenue. Every task with its reason and source.'],
        ['inbox', 'tray', 'Inbox', 'Emails, calls and CRM entries, already read and captured as demand.'],
        ['offer', 'file-text', 'Offer', 'The offer is written, prices and margin checked. You look it over and approve.'],
        ['opps', 'chart-bar-horizontal', 'Pipeline', 'Every opportunity on one timeline, including the recurring ones from buying rhythm.'],
        ['gpt', 'chat-circle-text', 'Ask', 'Stock, prices, data sheets, alternatives. Ask, and the answer names its source.']
      ],
      why_eyebrow: 'The problem',
      why1: 'Requests wait in the inbox.', why2: 'Stock waits in the warehouse.', why3: 'In between, sales are lost.', why4: 'DemandMatch brings them together.',
      how_a: 'So we built a layer', how_b: 'that sits on top of your systems.',
      c1_h: 'Reads what is already there.', c1_p: 'ERP, CRM, inbox and phone. Read-only, no system change.',
      c1_ui: 'Connected sources', c1_mail: 'Inbox', c1_r1: 'Stock, prices', c1_r2: 'Customers, history', c1_r3: 'Requests', c1_r4: 'Messages',
      c2_h: 'Understands every request.', c2_p: 'Product, quantity, date and place, from every email and every call.',
      c2_mail: 'Hi Lena, for May we need <mark>3 t of PP 7032E3</mark> again, delivered by <mark>week 19</mark> to <mark>Bremen</mark>. Same price as last time?',
      k_prod: 'Product', k_qty: 'Quantity', k_date: 'Date', k_date_v: 'Week 19', k_to: 'Place',
      c3_h: 'Finds the right stock.', c3_p: 'Warehouse, inbound and alternatives, with margin and lead time.',
      c3_need: 'Need 3 t', c3_w1: 'Hamburg warehouse', c3_w1s: '4.2 t free · now', c3_fit: 'Fits', c3_w2: 'Inbound week 18', c3_w2s: '20 t · Rotterdam', c3_alt: 'Backup', c3_margin: 'Margin after freight',
      c4_h: 'And your team approves.', c4_p: 'Nothing goes out before a person has seen it.',
      c4_t1: 'Offer', c4_now: 'Now', c4_m1: 'Novaform: 3 t PP 7032E3 from Hamburg, 11.4 % margin. Ready to send.', c4_ok: 'Approve',
      c4_t2: 'Follow-up', c4_m2: 'Harzer Kunststoff has not replied for 9 days. A draft is ready.', c4_ok2: 'Send',
      c4_t3: 'Price scale', c4_m3: 'Medplast only asks for a price: a scale for 1, 3 and 5 t is prepared.', c4_ok3: 'Approve',
      c4_view: 'View', c4_sent: 'Sent',
      rule_eyebrow: 'Principle', rule: 'The autopilot prepares. Your sales team decides.',
      sp_eyebrow: 'The other way round',
      sp_h: 'Your stock finds<br><span class="mute">its customers by itself.</span>',
      sp_sub: 'Inbound goods nobody has bought yet. Surplus that has sat for weeks. DemandMatch sees which customers need exactly that, and prepares a personal message for each of them.',
      sp_lot_k: 'Not sold yet', sp_lot_h: 'HDPE food grade', sp_lot_1: 'Inbound week 49 and Hamburg stock', sp_lot_2: 'Special price −€40/t until month end', sp_lot_3: 'Released by product management',
      sp_list_label: 'Customers who fit this stock',
      sp_rows: [
        ['Hanse Closures GmbH', 'fit', 'Buys HDPE for closures every 3 weeks. Next call-off in about 9 days.', 'SAP history', '24 t'],
        ['Weser Getränketechnik GmbH', 'fit', 'Ran HMA 016 in spring. The same grade.', 'SAP history', '12 t'],
        ['Sauerland Haushaltswaren GmbH', 'maybe', 'Said on the phone that HDPE is worth a trial.', 'Call', '4 t'],
        ['Emsland Rohrsysteme GmbH', 'no', 'Needs PE100 pipe grades. Not a substitute.', 'SAP', ''],
        ['Folienwerk Nordheide GmbH', 'no', 'Film in LLDPE. This grade does not fit.', 'SAP', '']
      ],
      sp_fit: 'Fits', sp_maybe: 'Maybe', sp_no: 'Left out',
      sp_sum_a: '40 t to 3 customers, 2 left out on purpose.', sp_sum_b: 'Three personal emails wait for approval.', sp_open: 'See it in the product',
      cu_eyebrow: 'Base product + customisation',
      cu_h: 'What you just tried is the base product.<br><span class="mute">Your solution is built around your company.</span>',
      p_eyebrow: 'Pilot', p_h: 'Live in 30 days.<br><span class="mute">With your real data.</span>',
      p_sub: 'No system change, no big project. We connect read-only and work alongside your team.',
      p1_w: 'Week 1', p1_h: 'Connect', p1_p: 'Read-only access to ERP, CRM and inbox. Your data stays where it is.',
      p2_w: 'Week 2', p2_h: 'Match', p2_p: 'Your real requests against your real stock, with your rules on margin and customers.',
      p3_w: 'Weeks 3 and 4', p3_h: 'Work', p3_p: 'Your team works with it and approves. Together we measure what it brings.',
      team: 'Founded in Berlin by', role_r: 'Sales and product', role_b: 'Engineering and data',
      end_h: 'Your next order<br><span class="mute">is already in your inbox.</span>', end_try: 'Back to the product',
      foot_tag: 'Stock and demand, matched automatically. For B2B distribution.', f_product: 'Product', f_company: 'Company', f_legal: 'Legal',
      imprint: 'Imprint', privacy: 'Privacy', foot_note: 'All data in the demo is sample data.'
    }
  };

  // ---------------------------------------------------------------- language (+ the shim the app reads)
  let lang = new URLSearchParams(location.search).get('lang');
  if (!T[lang]) { try { lang = localStorage.getItem('dm-lang'); } catch (e) {} }
  if (!T[lang]) lang = 'de';
  const listeners = [];
  window.UI = { get lang() { return lang; }, onLang(fn) { listeners.push(fn); }, t: k => T[lang][k] };

  // the headline is split into words so each one can rise on its own
  const split = el => { el.innerHTML = T[lang][el.dataset.split].split(' ').map((w, i) => `<span class="w" style="--i:${i}"><span>${w}</span></span>`).join(' '); };

  function apply() {
    const t = T[lang];
    root.lang = lang; document.title = t.title;
    qa('[data-t]').forEach(el => { el.textContent = t[el.dataset.t] ?? ''; });
    qa('[data-th]').forEach(el => { el.innerHTML = t[el.dataset.th] ?? ''; });
    qa('[data-ta]').forEach(el => { el.setAttribute('aria-label', t[el.dataset.ta] ?? ''); el.title = t[el.dataset.ta] ?? ''; });
    qa('[data-split]').forEach(split);
    qa('[data-mail]').forEach(a => { a.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.mail_subject)}`; });
    qa('[data-email]').forEach(el => { el.textContent = EMAIL; });
    qa('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    qa('[data-approve].done span').forEach(s => { s.textContent = t.c4_sent; });
  }
  apply();
  qa('.lang button').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang; try { localStorage.setItem('dm-lang', lang); } catch (e) {}
    apply(); listeners.forEach(fn => fn(lang));
  }));

  // ---------------------------------------------------------------- the logo (assets/logo/mark.svg, by Codex): two arcs, demand above and
  // supply below, that close into one circle. Inline with each arc as its own path, so on load they can slide together once.
  const MARK = `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    <path class="arc-d" d="M8.0835 30A24 24 0 0 1 55.9165 30H47.8745A16 16 0 0 0 16.1255 30Z"/>
    <path class="arc-s" d="M55.9165 34A24 24 0 0 1 8.0835 34H16.1255A16 16 0 0 0 47.8745 34Z"/></svg>`;
  qa('[data-logo="mark"]').forEach(el => { el.innerHTML = MARK; });

  // ---------------------------------------------------------------- header: hairline once the page moves
  const top = document.getElementById('top');
  const sentinel = Object.assign(document.createElement('div'), { className: 'sentinel' });
  document.body.prepend(sentinel); // 1px at the very top of the page
  new IntersectionObserver(([e]) => top.classList.toggle('scrolled', !e.isIntersecting)).observe(sentinel);

  // ---------------------------------------------------------------- entrance (hero) and reveals (everything else)
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('ready')));

  const revealIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); revealIO.unobserve(e.target);
  }), { rootMargin: '0px 0px -12% 0px' });
  qa('.rv').forEach(el => revealIO.observe(el));
  // the film's stage opens when it scrolls into view
  const filmSec = document.getElementById('film-sec');
  if (filmSec) new IntersectionObserver(([e], io) => { if (e.isIntersecting) { filmSec.classList.add('seen'); io.disconnect(); } }, { threshold: .2 }).observe(filmSec);

  // cards and steps play their small product moment once, when they are well inside the screen
  const playIO = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('play'); playIO.unobserve(e.target);
  }), { threshold: .45 });
  qa('[data-play]').forEach(el => playIO.observe(el));

  // "Why": each line inks in as it crosses the middle of the screen (CSS scroll timeline where supported, else this)
  if (!CSS.supports('animation-timeline: view()') || reduced) {
    const lineIO = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting)), { rootMargin: '-38% 0px -38% 0px' });
    qa('.say .ln').forEach(el => lineIO.observe(el));
    root.classList.add('no-sdt');
  }

  // ---------------------------------------------------------------- card 4: approve turns into "sent"; view opens the offer in the product
  document.addEventListener('click', e => {
    const ok = e.target.closest('[data-approve]');
    if (ok && !ok.classList.contains('done')) {
      ok.classList.add('done'); ok.closest('.ask').classList.add('sent');
      ok.querySelector('span').textContent = T[lang].c4_sent;
      return;
    }
    if (e.target.closest('[data-open-offer]')) document.dispatchEvent(new CustomEvent('dm:open', { detail: 'offer' }));
  });
})();
