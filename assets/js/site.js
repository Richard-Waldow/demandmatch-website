/* DemandMatch, atelier edition. All page text (DE default, EN), the UI shim the product app reads (window.UI),
   entrance + scroll reveals, and the small product moments in the four cards. No libraries. */
(() => {
  const EMAIL = 'hello@demandmatch.io';
  const root = document.documentElement;
  const qa = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = {
    de: {
      title: 'DemandMatch · Ihr Bestand findet seine Kunden',
      skip: 'Zum Inhalt', nav_value: 'Nutzen', nav_faq: 'Fragen', nav_pricing: 'Preise', nav_roi: 'Business Case', nav_product: 'Produkt', nav_why: 'Warum', nav_how: 'So funktioniert es', nav_pilot: 'Pilot',
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
      sy_h: 'Drei Systeme.<br><span class="mute">Eine Liste.</span>',
      sy_lead: 'Heute holt Ihr Vertrieb den Kontext aus Outlook, Excel, SAP und dem CRM und gleicht ihn im Kopf ab. Der Autopilot liest aus allen und bündelt es, von der ersten Anfrage bis zum Auftrag in SAP. Nichts wird ersetzt.',
      try_eyebrow: 'Selbst ausprobieren', try_h: 'Probieren Sie es selbst.<br><span class="mute">Das echte Produkt, mit Beispieldaten.</span>',
      try: 'Zum Ausprobieren klicken', full: 'Vollbild', close_app: 'Schließen', try_dlg: 'DemandMatch ausprobieren, mit Beispieldaten', tabs_label: 'Bereiche des Produkts',
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
      cu_h: 'Wir starten mit dem Basisprodukt.<br><span class="mute">Ihre Lösung bauen wir auf Ihr Haus zu.</span>',
      p_eyebrow: 'Pilot', p_h: 'In 30 Tagen im Einsatz.<br><span class="mute">Mit Ihren echten Daten.</span>',
      p_sub: 'Kein Systemwechsel, kein Großprojekt. Wir verbinden uns lesend und arbeiten mit Ihrem Team.',
      p1_w: 'Woche 1', p1_h: 'Verbinden', p1_p: 'Lesender Zugriff auf ERP, CRM und Postfach. Ihre Daten bleiben, wo sie sind.',
      p2_w: 'Woche 2', p2_h: 'Abgleichen', p2_p: 'Ihre echten Anfragen gegen Ihren echten Bestand, mit Ihren Regeln zu Marge und Kunden.',
      p3_w: 'Woche 3 und 4', p3_h: 'Arbeiten', p3_p: 'Wir messen: Antwortzeit auf Anfragen, Abschlussquote bei gematchten Angeboten, Marge bei gematchten Angeboten gegenüber Ihrer Basislinie, abverkaufter Bestand an Langsamdrehern. Danach rechnen wir den Business Case mit Ihren echten Zahlen neu.',
      faq_eyebrow: 'Fragen und Antworten', faq_h: 'Was Sie über DemandMatch<br><span class="mute">wissen sollten.</span>',
      faq: [
        ['Was ist DemandMatch?', 'DemandMatch ist Software für den B2B-Handel. Sie gleicht Ihren Bestand automatisch mit dem Bedarf Ihrer Kunden ab: Zu jeder Anfrage aus E-Mail, Telefon oder CRM findet sie das passende Material, das Lager und die Marge und bereitet das Angebot vor. Umgekehrt findet sie für Überbestand und Ware im Zulauf die Kunden, die genau das kaufen. Ihr Vertrieb prüft und gibt frei.'],
        ['Für wen ist DemandMatch gemacht?', 'Für Distributoren und Großhändler von Chemie, Kunststoffen und Industriebedarf, vor allem für Vertriebsleitung, Außendienst und Innendienst, die viele Anfragen und viel Bestand zusammenbringen müssen.'],
        ['Was bringt DemandMatch dem Vertrieb?', 'Mehr Umsatz, weil keine Anfrage liegen bleibt und kein Kunde vergessen wird. Bessere Marge, weil jedes Angebot mit Fracht, Lager und Ihren Preisregeln rechnet und liegende Ware verkauft statt abgeschrieben wird. Und weniger Handarbeit: Lesen, Abgleichen und Angebot schreiben laufen automatisch.'],
        ['Welchen ROI kann ein Distributor mit 1 Mrd. € Umsatz erwarten?', 'Bei {ex_r} abgedecktem Umsatz, {ex_gm} Bruttomarge, {ex_inv} Lagerbestand und {ex_sh} des Geschäfts über DemandMatch rechnen wir konservativ mit {ex_val_c} Wert pro Jahr und erwartet mit {ex_val_e}. Gegen eine Jahreslizenz von {ex_lic} bei 3 Jahren Laufzeit amortisiert sich das nach etwa {ex_pay_c} Monaten (konservativ) bzw. {ex_pay_e} Monaten (erwartet), der 3-Jahres-ROI liegt bei {ex_roi_c} bzw. {ex_roi_e}. Dazu kommt ein einmaliger Liquiditätseffekt durch Lagerabbau von {ex_cash_c}, den wir nicht in den ROI einrechnen. Frei werdende Vertriebszeit zeigen wir daneben und rechnen sie nur ein, wenn Sie das wollen. Im Rechner auf dieser Seite setzen Sie Umsatz, Bruttomarge, Lagerbestand und den Anteil über DemandMatch selbst.'],
        ['Was kostet DemandMatch?', 'Der Fit-Check ist kostenlos. Die Potenzialanalyse über 3 Wochen kostet {assess}, der Pilot über 30 Tage {pilot}. Die Potenzialanalyse wird voll auf den Pilot angerechnet, der Pilot auf die Jahreslizenz, wenn Sie innerhalb von 30 Tagen nach der Auswertung unterschreiben. Sie zahlen nie doppelt. Die Jahreslizenz richtet sich nach dem Umsatz, den DemandMatch abdeckt: {r1} je {u} bis {b1}, {r2} je {u} von {b1n} bis {b2} und {r3} je {u} darüber, mindestens {min} pro Jahr. Wie bei einem Stufentarif gilt der niedrigere Satz nur für den Umsatz oberhalb der Schwelle. Bei {ex_r} sind das {ex_lic}. Das Onboarding kostet {onb_pct} der Jahreslizenz, mindestens {onb_min}, und ist bei 3 Jahren Laufzeit inklusive. Jede Lizenz enthält alle Funktionen, auch Single Sign-on und mehrere ERP-Systeme. Alle Preise netto zzgl. MwSt. In den USA gelten dieselben Sätze je {u_usd}, mindestens {min_usd} pro Jahr und {onb_min_usd} für das Onboarding; die Potenzialanalyse kostet {assess_usd}, der Pilot {pilot_usd}, zzgl. Sales Tax.'],
        ['Mit welchen Systemen arbeitet DemandMatch?', 'DemandMatch liest aus den Systemen, die Sie schon nutzen: ERP wie SAP, Oracle, Odoo oder DATEV, CRM wie HubSpot, das Postfach (Outlook, Gmail) und Messenger wie WhatsApp oder Slack. Nichts wird ersetzt, es gibt keinen Systemwechsel.'],
        ['Schickt DemandMatch selbst Angebote an Kunden?', 'Nein. DemandMatch bereitet vor, ein Mensch entscheidet. Kein Angebot und keine E-Mail geht raus, bevor Ihr Vertrieb es gesehen und freigegeben hat.'],
        ['Was passiert mit unseren Daten?', 'Kein Systemwechsel, kein Großprojekt. DemandMatch greift nur lesend auf ERP, CRM und Postfach zu und ändert dort nichts. Ihre Daten bleiben, wo sie sind. Anbindung und Zugriffsrechte legen wir gemeinsam mit Ihrer IT fest.'],
        ['Wie fängt man an?', 'Mit einem kostenlosen Fit-Check: Sie schicken uns vorab ein paar Eckdaten (Branche, Umsatz, ERP, Größe des Vertriebsteams), damit wir nur sprechen, wo es passt. Dann eine Potenzialanalyse auf den Daten eines Bereichs und ein Pilot von 30 Tagen auf Ihren echten Daten, für eine Produktfamilie und ein Team, mit vorab schriftlich vereinbarten Erfolgskriterien. Woche 1: lesend verbinden. Woche 2: Ihre echten Anfragen gegen Ihren echten Bestand abgleichen, mit Ihren Regeln zu Marge und Kunden. Woche 3 und 4: Ihr Team arbeitet damit, und wir messen gemeinsam, was es bringt.'],
        ['Wer steht hinter DemandMatch?', 'DemandMatch wurde in Berlin von Bing Cai (CEO, Staff Forward Deployed Engineer) und Richard von Waldow (Forward Deployed Engineer) gegründet. Kontakt: hello@demandmatch.io.']
      ],
      meta_desc: 'DemandMatch gleicht Ihren Bestand automatisch mit dem Bedarf Ihrer Kunden ab. Software für Distributoren von Chemie, Kunststoffen und Industriebedarf: mehr Umsatz, bessere Marge, Ihr Vertrieb gibt nur noch frei.',
      roi_eyebrow: 'Business Case', roi_h: 'Rechnen Sie selbst.<br><span class="mute">Mit Ihren Zahlen, nicht mit unseren.</span>',
      roi_sub: 'Der Umsatz kommt aus dem Preisrechner. In den ROI geht nur Geld ein, das wirklich ankommt. Frei werdende Zeit zeigen wir daneben, gerechnet wird sie nur, wenn Sie es wollen.',
      roi_cases: ['Konservativ', 'Erwartet'], roi_cases_label: 'Annahmen',
      roi_g1: 'Ihr Unternehmen', roi_g2: 'Frei werdende Vertriebszeit', roi_g2_h: 'Zählt nur, wenn Sie sie im Business Case einrechnen.',
      roi_rev_h: 'Wie im Preisrechner oben eingestellt.',
      roi_gm: 'Bruttomarge', roi_stock: 'Lagerbestand, in % vom Umsatz', roi_people: 'Mitarbeitende in Vertrieb und Innendienst', roi_pcost: 'Kosten pro Person und Jahr',
      roi_scope: 'Anteil des Geschäfts über DemandMatch', roi_scope_h: 'Nicht jeder Auftrag läuft über DemandMatch. 60 % ist ein vorsichtiger Startwert.',
      roi_people_u: 'Personen',
      roi_memo: 'Business Case', roi_months: 'Monate', roi_never: 'über 36 Monate',
      roi_value: 'Jährlicher Wert', roi_value_s: 'ab Jahr 2, im ersten Jahr die Hälfte',
      roi_per: 'Wert je {one} Lizenz', roi_per_s: 'Jährlicher Wert geteilt durch {l} Jahreslizenz',
      roi_payback: 'Amortisation', roi_pay_s: 'gegen {c} Kosten im 1. Jahr',
      roi_roi: '3-Jahres-ROI', roi_roi_s: '{v} Wert für {c} Kosten',
      roi_cash: 'Einmaliger Liquiditätseffekt durch Lagerabbau: {x} (nicht im ROI enthalten)',
      roi_assume: '{case}: +{u} Umsatz, +{m} Pkt. Marge, {s} Lager früher verkauft, {sh} des Geschäfts über DemandMatch',
      roi_levers: 'Woher der Wert kommt', roi_l: ['Gewonnene Anfragen', 'Margenplus', 'Bestand'],
      roi_cap: 'Frei werdende Kapazität', roi_cap_s: '≈ {f} Vollzeitstellen, Wert {v} pro Jahr', roi_cap_in: 'In den ROI einrechnen',
      roi_years: ['Jahr 1', 'Jahr 2', 'Jahr 3'], roi_t_val: 'Wert', roi_t_cost: 'Kosten', roi_t_cum: 'Kumuliert netto',
      roi_cost_l: 'Jahreslizenz {l} · Onboarding {o} · Eigenaufwand {d}. Der Pilot ({p}) wird angerechnet, wenn Sie innerhalb von 30 Tagen unterschreiben.',
      roi_onb_incl: 'inklusive',
      roi_link: 'Link mit meinen Zahlen kopieren', roi_copied: 'Link kopiert', roi_print: 'Als PDF drucken',
      roi_note: 'Eine Schätzung, kein Versprechen. In der Potenzialanalyse und im Pilot messen wir genau diese Hebel mit Ihren eigenen Daten.',
      roi_how: 'So rechnen wir',
      roi_formulas: [
        'Jahreslizenz: {r1} je {u} abgedecktem Umsatz bis {b1}, {r2} je {u} von {b1n} bis {b2}, {r3} je {u} darüber. Mindestens {min} pro Jahr, gerundet auf {round}.',
        'Onboarding = {onb_pct} der Jahreslizenz, mindestens {onb_min}, gerundet auf {round}. Bei 3 Jahren Laufzeit inklusive, bei 1 Jahr im ersten Jahr berechnet.',
        'Jährlicher Wert = Anteil über DemandMatch × (Umsatz × Mehrumsatz × Bruttomarge + Umsatz × Margenplus + Umsatz × Lagerbestand × früher verkaufter Anteil × {holding} Lagerhaltungskosten). Vermiedene Abschreibungen rechnen wir nicht mit.',
        'Konservativ: {c_u} Mehrumsatz, {c_m} Prozentpunkte Margenplus, {c_s} des Lagers früher verkauft. Erwartet: {e_u}, {e_m} Prozentpunkte, {e_s}.',
        'Kosten im 1. Jahr = Jahreslizenz + Onboarding (bei 3 Jahren 0) + {effort} Eigenaufwand. Jahr 2 und 3 = Jahreslizenz.',
        'Das erste Jahr bringt {ramp} des jährlichen Werts (Anlauf), Jahr 2 und 3 je 100 %.',
        'Amortisation = Kosten im 1. Jahr ÷ ({ramp} des jährlichen Werts ÷ 12), in Monaten. Ab dem 13. Monat zählt der volle Wert.',
        '3-Jahres-ROI = (Wert über 3 Jahre − Kosten über 3 Jahre) ÷ Kosten über 3 Jahre. Kosten über 3 Jahre = 3 × Jahreslizenz + Onboarding (bei 1 Jahr) + Eigenaufwand.',
        'Einmaliger Liquiditätseffekt = Anteil × Umsatz × Lagerbestand × früher verkaufter Anteil. Er geht nicht in Wert, Amortisation oder ROI ein.',
        'Frei werdende Kapazität = Mitarbeitende × Anteil × frei werdende Zeit (konservativ {c_t}, erwartet {e_t}) × Kosten pro Person. Sie zählt nur, wenn Sie sie einrechnen.'
      ],
      roi_static: 'Beispiel mit {ex_r} abgedecktem Umsatz, {ex_gm} Bruttomarge, {ex_inv} Lagerbestand, {ex_sh} des Geschäfts über DemandMatch und 3 Jahren Laufzeit. Konservativ: Jahreslizenz {ex_lic}, Wert {ex_val_c} pro Jahr, {ex_per_c} Wert je 1 € Lizenz, Amortisation nach {ex_pay_c} Monaten, 3-Jahres-ROI {ex_roi_c}. Erwartet: Wert {ex_val_e} pro Jahr, Amortisation nach {ex_pay_e} Monaten, 3-Jahres-ROI {ex_roi_e}. Einmaliger Liquiditätseffekt durch Lagerabbau: {ex_cash_c} (konservativ, nicht im ROI enthalten).',
      pq_h: 'Preise, die mit Ihnen wachsen',
      pq_sub: 'Keine Stufen, keine Preissprünge. Ihre Lizenz richtet sich nach dem Umsatz, den DemandMatch abdeckt, und jeder weitere Euro Umsatz kostet weniger.',
      pq_rev: 'Abgedeckter Umsatz', pq_rev_in: 'Abgedeckter Umsatz in Mio. {c}', pq_unit: ['', 'Mio. {c}'],
      pq_help: 'Der Umsatz der Sparten oder Länder, in denen DemandMatch arbeitet. Starten Sie mit einer Sparte und erweitern Sie später auf derselben Preiskurve.',
      pq_presets: 'Beispiele', pq_one: 'Eine Sparte ({v})', pq_max: 'Über {v}: individuelles Angebot',
      pq_term: 'Laufzeit', pq_term_3: '3 Jahre (Onboarding inklusive)', pq_term_1: '1 Jahr', pq_term_3s: '3 Jahre',
      pq_lic: 'Jahreslizenz (Richtwert)', pq_per: 'je {u} Umsatz', pq_per_s: 'im Schnitt bei {r}', pq_y1: 'Gesamt im 1. Jahr',
      pq_onb_incl: 'Onboarding inklusive', pq_onb: 'davon Onboarding {o}',
      pq_band: ['Bis {to}', '{fromN} bis {to}', 'Über {from}'], pq_rate: '{rate} je {u}', pq_min: ['Mindestlizenz', '{min} pro Jahr'],
      pq_brackets: 'Wie bei einem Stufentarif gilt der niedrigere Satz nur für den Umsatz oberhalb der jeweiligen Schwelle.',
      pq_expand: 'Erweitern Sie auf weitere Sparten oder Länder, berechnen wir den Preis auf den gesamten abgedeckten Umsatz neu. Sie zahlen nur die Differenz, und der niedrigere Satz greift automatisch.',
      pq_disc: 'Richtwert. Ihr finales Angebot folgt nach der Potenzialanalyse.',
      pq_static: 'Beispiel: Bei {px_r} abgedecktem Umsatz beträgt die Jahreslizenz {px_lic}. Bei 3 Jahren Laufzeit ist das Onboarding inklusive.',
      pq_mail_subject: 'DemandMatch: Fit-Check',
      pq_mail_body: 'Guten Tag,\n\nwir möchten einen Fit-Check anfragen.\n\nAbgedeckter Umsatz: {r}\nLaufzeit: {t}\nRichtwert Jahreslizenz: {l}\n\nMit freundlichen Grüßen\n',
      pr_eyebrow: 'Preise', pr_h: 'Klare Preise.<br><span class="mute">Erst messen, dann entscheiden.</span>',
      pr_sub: 'Jeder Schritt hat einen festen Preis, und jeder bezahlte Schritt wird auf den nächsten angerechnet. Sie zahlen nie doppelt.',
      pr_cur: 'Währung', pr_free: 'Kostenlos', pr_from: 'ab', pr_year: 'pro Jahr',
      pr_steps: [
        ['30 Minuten', 'Fit-Check', 'free', 'Ein Gespräch, nachdem Sie uns ein paar Eckdaten geschickt haben: Branche, Umsatz, ERP und Größe des Vertriebs. So sprechen wir nur mit Unternehmen, für die es passt.'],
        ['3 Wochen', 'Potenzialanalyse', 'assess', 'Auf den Daten eines Bereichs: wie viel Umsatz heute verloren geht, wie viel Bestand liegt und wie viel Marge offen bleibt, in Euro. Wird voll auf den Pilot angerechnet.'],
        ['30 Tage', 'Pilot', 'pilot', 'Eine Produktfamilie, ein Team, Erfolgskriterien vorher schriftlich. Wird zu 100 % auf das erste Jahr angerechnet, wenn Sie innerhalb von 30 Tagen nach der Auswertung unterschreiben.'],
        ['Ab Jahr 1', 'Lizenz', 'license', 'Jährlich, nach dem Umsatz, den DemandMatch abdeckt. Alle Funktionen in jeder Lizenz.']
      ],
      pr_all: 'In jeder Lizenz: alle Funktionen, für jeden Kunden. Abgleich in beide Richtungen, Angebote mit Marge, Fracht und Ihren Preisregeln, lesende Anbindung an ERP, CRM und Postfach, mehrere ERP-Systeme, Single Sign-on und unbegrenzte Vertriebsnutzer (Fair Use). Wie aufwendig Ihre Systemlandschaft ist, steckt im Onboarding, nicht in der Lizenz. Nichts geht raus ohne Freigabe Ihres Teams.',
      pr_doc: 'Ihr Weg zu DemandMatch', pr_doc_credit: ['', 'voll angerechnet auf den Pilot', 'zu 100 % angerechnet auf Jahr 1', ''],
      pr_tax_eur: 'Alle Preise netto, zzgl. MwSt.', pr_tax_usd: 'Preise in US-Dollar für Kunden in den USA, zzgl. Sales Tax.',
      pr_terms: 'Jährliche Zahlung im Voraus, Mindestlaufzeit 12 Monate. Potenzialanalyse und Pilot werden voll angerechnet.',
      pr_cta: 'Fit-Check anfragen',
      team: 'Gegründet in Berlin von', role_r: 'Forward Deployed Engineer', role_b: 'CEO, Staff Forward Deployed Engineer',
      end_h: 'Der nächste Auftrag<br><span class="mute">liegt schon in Ihrem Postfach.</span>', end_try: 'Zurück zum Produkt',
      foot_tag: 'Bestand und Bedarf, automatisch abgeglichen. Für den B2B-Handel.', f_product: 'Produkt', f_company: 'Unternehmen', f_legal: 'Rechtliches',
      imprint: 'Impressum', privacy: 'Datenschutz', foot_note: 'Alle Daten in der Demo sind Beispieldaten.'
    },
    en: {
      title: 'DemandMatch · Your stock finds its customers',
      skip: 'Skip to content', nav_value: 'Value', nav_faq: 'FAQ', nav_pricing: 'Pricing', nav_roi: 'Business case', nav_product: 'Product', nav_why: 'Why', nav_how: 'How it works', nav_pilot: 'Pilot',
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
      sy_h: 'Three systems.<br><span class="mute">One list.</span>',
      sy_lead: 'Today your sales team pulls context from Outlook, Excel, SAP and the CRM and reconciles it in their heads. The autopilot reads from all of them and brings it together, from the first request to the order in SAP. Nothing is replaced.',
      try_eyebrow: 'Try it yourself', try_h: 'Try it yourself.<br><span class="mute">The real product, with sample data.</span>',
      try: 'Click to try it', full: 'Fullscreen', close_app: 'Close', try_dlg: 'Try DemandMatch, with sample data', tabs_label: 'Areas of the product',
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
      cu_h: 'We start from the base product.<br><span class="mute">Your solution is built around your company.</span>',
      p_eyebrow: 'Pilot', p_h: 'Live in 30 days.<br><span class="mute">With your real data.</span>',
      p_sub: 'No system change, no big project. We connect read-only and work alongside your team.',
      p1_w: 'Week 1', p1_h: 'Connect', p1_p: 'Read-only access to ERP, CRM and inbox. Your data stays where it is.',
      p2_w: 'Week 2', p2_h: 'Match', p2_p: 'Your real requests against your real stock, with your rules on margin and customers.',
      p3_w: 'Weeks 3 and 4', p3_h: 'Work', p3_p: 'We measure: response time on inquiries, win rate on matched quotes, margin on matched quotes versus your baseline, and slow-moving stock sold. Then we recalculate the business case with your real numbers.',
      faq_eyebrow: 'Questions and answers', faq_h: 'What you should know<br><span class="mute">about DemandMatch.</span>',
      faq: [
        ['What is DemandMatch?', 'DemandMatch is software for B2B distribution. It matches your inventory with your customers\' demand automatically: for every request from email, phone or CRM it finds the right material, warehouse and margin and prepares the offer. The other way round, it finds the customers who buy exactly what sits in overstock or arrives inbound. Your sales team reviews and approves.'],
        ['Who is DemandMatch for?', 'For distributors and wholesalers of chemicals, plastics and industrial goods, above all for heads of sales, field sales and inside sales teams who have to bring many requests and a lot of stock together.'],
        ['What does DemandMatch bring to a sales team?', 'More sales, because no request is left waiting and no customer is forgotten. Better margin, because every offer accounts for freight, storage and your pricing rules, and stock that sits gets sold instead of written off. And less manual work: reading, matching and writing the offer run automatically.'],
        ['What ROI can a distributor with €1bn revenue expect?', 'At {ex_r} revenue in scope, {ex_gm} gross margin, stock at {ex_inv} of revenue and {ex_sh} of business through DemandMatch we expect {ex_val_c} of value a year (conservative) to {ex_val_e} (expected). Against an annual license of {ex_lic} on a 3-year term, that pays back in about {ex_pay_c} months (conservative) or {ex_pay_e} months (expected), with a 3-year ROI of {ex_roi_c} or {ex_roi_e}. On top comes a one-time cash release from inventory of {ex_cash_c}, which we do not count in the ROI. Freed sales time is shown next to it and counted only if you choose to. In the calculator on this page you set revenue, gross margin, stock and the share through DemandMatch yourself.'],
        ['How much does DemandMatch cost?', 'The fit check is free. The 3-week value assessment costs {assess} and the 30-day pilot {pilot}. The value assessment is credited in full to the pilot, the pilot to the annual license if you sign within 30 days of the review. You never pay twice. The annual license follows the revenue DemandMatch covers: {r1} per {u} up to {b1}, {r2} per {u} from {b1} to {b2} and {r3} per {u} above, at least {min} a year. Like tax brackets, the lower rate applies only to revenue above each threshold. At {ex_r} that is {ex_lic}. Onboarding costs {onb_pct} of the annual license, at least {onb_min}, and is included in a 3-year term. Every license includes every feature, including single sign-on and several ERP systems. All prices net, excl. VAT. In the US the same rates apply per {u_usd}, with a minimum of {min_usd} a year and {onb_min_usd} for onboarding; the value assessment costs {assess_usd} and the pilot {pilot_usd}, excl. sales tax.'],
        ['Which systems does DemandMatch work with?', 'DemandMatch reads from the systems you already run: ERP such as SAP, Oracle, Odoo or DATEV, CRM such as HubSpot, the inbox (Outlook, Gmail) and messengers such as WhatsApp or Slack. Nothing is replaced and there is no system change.'],
        ['Does DemandMatch send offers to customers by itself?', 'No. DemandMatch prepares, a person decides. No offer and no email goes out before your sales team has seen and approved it.'],
        ['What happens to our data?', 'No system change, no big project. DemandMatch has read-only access to ERP, CRM and inbox and changes nothing there. Your data stays where it is. We set up the connection and access rights together with your IT.'],
        ['How do we get started?', 'With a free fit check: you send us a few facts first (industry, revenue, ERP, size of your sales team), so we only talk where it fits. Then a value assessment on one division\'s data and a 30-day pilot on your real data, for one product family and one team, with success criteria agreed in writing upfront. Week 1: connect read-only. Week 2: match your real requests against your real stock, with your rules on margin and customers. Weeks 3 and 4: your team works with it, and together we measure what it brings.'],
        ['Who is behind DemandMatch?', 'DemandMatch was founded in Berlin by Bing Cai (CEO, Staff Forward Deployed Engineer) and Richard von Waldow (Forward Deployed Engineer). Contact: hello@demandmatch.io.']
      ],
      meta_desc: 'DemandMatch matches your inventory with your customers\' demand, automatically. Software for distributors of chemicals, plastics and industrial goods: more sales, better margin, and your sales team only approves.',
      roi_eyebrow: 'Business case', roi_h: 'Run the numbers yourself.<br><span class="mute">With your figures, not ours.</span>',
      roi_sub: 'Revenue comes from the price tool. Only money that actually arrives goes into the ROI. Freed time is shown next to it and counted only if you choose to.',
      roi_cases: ['Conservative', 'Expected'], roi_cases_label: 'Assumptions',
      roi_g1: 'Your company', roi_g2: 'Freed sales time', roi_g2_h: 'Counts only if you include it in the business case.',
      roi_rev_h: 'As set in the price tool above.',
      roi_gm: 'Gross margin', roi_stock: 'Stock, as % of revenue', roi_people: 'People in sales and inside sales', roi_pcost: 'Cost per person per year',
      roi_scope: 'Share of business through DemandMatch', roi_scope_h: 'Not every order runs through DemandMatch. 60% is a cautious starting point.',
      roi_people_u: 'people',
      roi_memo: 'Business case', roi_months: 'months', roi_never: 'over 36 months',
      roi_value: 'Annual value', roi_value_s: 'from year 2, half in year 1',
      roi_per: 'Value per {one} of license', roi_per_s: 'Annual value divided by the {l} annual license',
      roi_payback: 'Payback', roi_pay_s: 'against {c} of cost in year 1',
      roi_roi: '3-year ROI', roi_roi_s: '{v} value for {c} cost',
      roi_cash: 'One-time cash release from inventory: {x} (not included in ROI)',
      roi_assume: '{case}: +{u} revenue, +{m} pts margin, {s} of stock sold earlier, {sh} of business through DemandMatch',
      roi_levers: 'Where the value comes from', roi_l: ['Captured requests', 'Margin uplift', 'Stock'],
      roi_cap: 'Freed capacity', roi_cap_s: '≈ {f} full-time people, worth {v} a year', roi_cap_in: 'Count it in the ROI',
      roi_years: ['Year 1', 'Year 2', 'Year 3'], roi_t_val: 'Value', roi_t_cost: 'Cost', roi_t_cum: 'Cumulative net',
      roi_cost_l: 'Annual license {l} · onboarding {o} · own effort {d}. The pilot ({p}) is credited if you sign within 30 days.',
      roi_onb_incl: 'included',
      roi_link: 'Copy link with my numbers', roi_copied: 'Link copied', roi_print: 'Print as PDF',
      roi_note: 'An estimate, not a promise. In the value assessment and the pilot we measure exactly these levers on your own data.',
      roi_how: 'How we calculate',
      roi_formulas: [
        'Annual license: {r1} per {u} of revenue in scope up to {b1}, {r2} per {u} from {b1} to {b2}, {r3} per {u} above. At least {min} a year, rounded to {round}.',
        'Onboarding = {onb_pct} of the annual license, at least {onb_min}, rounded to {round}. Included in a 3-year term, charged in year one on a 1-year term.',
        'Annual value = share through DemandMatch × (revenue × extra revenue × gross margin + revenue × margin points + revenue × stock % × share sold earlier × {holding} holding cost). Avoided write-downs are not counted.',
        'Conservative: {c_u} extra revenue, {c_m} margin points, {c_s} of stock sold earlier. Expected: {e_u}, {e_m} points, {e_s}.',
        'Cost in year 1 = annual license + onboarding (0 on a 3-year term) + {effort} own effort. Years 2 and 3 = annual license.',
        'Year one brings {ramp} of the annual value (ramp-up), years 2 and 3 bring 100% each.',
        'Payback = cost in year 1 ÷ ({ramp} of the annual value ÷ 12), in months. From month 13 the full value counts.',
        '3-year ROI = (3-year value − 3-year cost) ÷ 3-year cost. 3-year cost = 3 × annual license + onboarding (on a 1-year term) + own effort.',
        'One-time cash release = share × revenue × stock % × share sold earlier. It is never added to value, payback or ROI.',
        'Freed capacity = people × share × time freed (conservative {c_t}, expected {e_t}) × cost per person. It only counts if you include it.'
      ],
      roi_static: 'Example with {ex_r} revenue in scope, {ex_gm} gross margin, stock at {ex_inv} of revenue, {ex_sh} of business through DemandMatch and a 3-year term. Conservative: annual license {ex_lic}, value {ex_val_c} a year, {ex_per_c} of value per €1 of license, payback after {ex_pay_c} months, 3-year ROI {ex_roi_c}. Expected: value {ex_val_e} a year, payback after {ex_pay_e} months, 3-year ROI {ex_roi_e}. One-time cash release from inventory: {ex_cash_c} (conservative, not included in ROI).',
      pq_h: 'Pricing that scales with you',
      pq_sub: 'No tiers, no price jumps. Your license follows the revenue DemandMatch covers, and every additional euro of revenue costs less.',
      pq_rev: 'Revenue in scope', pq_rev_in: 'Revenue in scope, in millions of {c}', pq_unit: ['{c}', 'm'],
      pq_help: 'Revenue of the divisions or countries where DemandMatch runs. Start with one division and expand later on the same price curve.',
      pq_presets: 'Examples', pq_one: 'One division ({v})', pq_max: 'Above {v}: individual quote',
      pq_term: 'Term', pq_term_3: '3 years (onboarding included)', pq_term_1: '1 year', pq_term_3s: '3 years',
      pq_lic: 'Annual license (indicative)', pq_per: 'per {u} revenue', pq_per_s: 'on average at {r}', pq_y1: 'Year-one total',
      pq_onb_incl: 'Onboarding included', pq_onb: 'including onboarding of {o}',
      pq_band: ['Up to {to}', '{from} to {to}', 'Above {from}'], pq_rate: '{rate} per {u}', pq_min: ['Minimum license', '{min} per year'],
      pq_brackets: 'Like tax brackets, the lower rate applies only to revenue above each threshold.',
      pq_expand: 'When you expand to more divisions or countries, we recalculate the price on your total revenue in scope. You pay only the difference, and the lower rate applies automatically.',
      pq_disc: 'Indicative. Your final quote follows the value assessment.',
      pq_static: 'Example: at {px_r} revenue in scope the annual license is {px_lic}. On a 3-year term onboarding is included.',
      pq_mail_subject: 'DemandMatch: fit check',
      pq_mail_body: 'Hello,\n\nwe would like to book a fit check.\n\nRevenue in scope: {r}\nTerm: {t}\nIndicative annual license: {l}\n\nKind regards\n',
      pr_eyebrow: 'Pricing', pr_h: 'Clear prices.<br><span class="mute">Measure first, then decide.</span>',
      pr_sub: 'Every step has a fixed price, and every paid step is credited to the next one. You never pay twice.',
      pr_cur: 'Currency', pr_free: 'Free', pr_from: 'from', pr_year: 'per year',
      pr_steps: [
        ['30 minutes', 'Fit check', 'free', 'A call after you have sent us a few facts: industry, revenue, ERP and size of your sales team. That way we only talk to companies it fits.'],
        ['3 weeks', 'Value assessment', 'assess', 'On one division\'s data: how much revenue is lost today, how much stock sits idle and how much margin is left open, in money. Credited in full to the pilot.'],
        ['30 days', 'Pilot', 'pilot', 'One product family, one team, success criteria agreed in writing upfront. Credited 100% to year one if you sign within 30 days of the review.'],
        ['From year 1', 'License', 'license', 'Annual, by the revenue DemandMatch covers. Every feature in every license.']
      ],
      pr_all: 'Every license includes every feature, for every customer: matching both ways, offers with margin, freight and your pricing rules, read-only connection to ERP, CRM and inbox, several ERP systems, single sign-on and unlimited sales users (fair use). How complex your system landscape is goes into onboarding, not the license. Nothing goes out without your team\'s approval.',
      pr_doc: 'Your path to DemandMatch', pr_doc_credit: ['', 'credited in full to the pilot', 'credited 100% to year one', ''],
      pr_tax_eur: 'All prices net, excl. VAT.', pr_tax_usd: 'Prices in US dollars for customers in the US, excl. sales tax.',
      pr_terms: 'Paid annually in advance, 12-month minimum term. The value assessment and the pilot are credited in full.',
      pr_cta: 'Book a fit check',
      team: 'Founded in Berlin by', role_r: 'Forward Deployed Engineer', role_b: 'CEO, Staff Forward Deployed Engineer',
      end_h: 'Your next order<br><span class="mute">is already in your inbox.</span>', end_try: 'Back to the product',
      foot_tag: 'Stock and demand, matched automatically. For B2B distribution.', f_product: 'Product', f_company: 'Company', f_legal: 'Legal',
      imprint: 'Imprint', privacy: 'Privacy', foot_note: 'All data in the demo is sample data.'
    }
  };

  // ---------------------------------------------------------------- language (+ the shim the app reads)
  // each language is its own written-out page (/ and /en/, built by tools/build.mjs), so crawlers and agents
  // read the text without running scripts. The page's lang decides; old ?lang= links go to the right page.
  let lang = T[root.lang] ? root.lang : 'de';
  const asked = new URLSearchParams(location.search).get('lang');
  if (T[asked] && asked !== lang && root.dataset[asked]) { location.replace(root.dataset[asked] + location.hash); }
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
    const to = root.dataset[b.dataset.lang];
    if (to) { location.href = to + location.hash; return; }
    lang = b.dataset.lang; apply(); listeners.forEach(fn => fn(lang));
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
