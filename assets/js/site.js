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
      p3_w: 'Woche 3 und 4', p3_h: 'Arbeiten', p3_p: 'Ihr Team arbeitet damit und gibt frei. Wir messen gemeinsam, was es bringt.',
      faq_eyebrow: 'Fragen und Antworten', faq_h: 'Was Sie über DemandMatch<br><span class="mute">wissen sollten.</span>',
      faq: [
        ['Was ist DemandMatch?', 'DemandMatch ist Software für den B2B-Handel. Sie gleicht Ihren Bestand automatisch mit dem Bedarf Ihrer Kunden ab: Zu jeder Anfrage aus E-Mail, Telefon oder CRM findet sie das passende Material, das Lager und die Marge und bereitet das Angebot vor. Umgekehrt findet sie für Überbestand und Ware im Zulauf die Kunden, die genau das kaufen. Ihr Vertrieb prüft und gibt frei.'],
        ['Für wen ist DemandMatch gemacht?', 'Für Distributoren und Großhändler von Chemie, Kunststoffen und Industriebedarf, vor allem für Vertriebsleitung, Außendienst und Innendienst, die viele Anfragen und viel Bestand zusammenbringen müssen.'],
        ['Was bringt DemandMatch dem Vertrieb?', 'Mehr Umsatz, weil keine Anfrage liegen bleibt und kein Kunde vergessen wird. Bessere Marge, weil jedes Angebot mit Fracht, Lager und Ihren Preisregeln rechnet und liegende Ware verkauft statt abgeschrieben wird. Und weniger Handarbeit: Lesen, Abgleichen und Angebot schreiben laufen automatisch.'],
        ['Welchen ROI kann ein Distributor mit 1 Mrd. € Umsatz erwarten?', 'Bei 1,2 Mrd. € Umsatz und 12 % Bruttomarge rechnen wir mit 2,4 Mio. € (vorsichtig) bis 6,4 Mio. € (erwartet) pro Jahr aus mehr Umsatz, besserer Marge und früher verkauftem Bestand. Gegen Gruppenlizenz, Einführung und Eigenaufwand von zusammen rund 630.000 € im ersten Jahr amortisiert sich das nach etwa 2 bis 6 Monaten. Frei werdende Vertriebszeit kommt dazu. Mit dem Rechner auf dieser Seite lassen sich alle Annahmen anpassen. In den ROI geht nur Geld ein, das wirklich ankommt; frei werdende Zeit zeigen wir daneben und rechnen sie nur, wenn Sie das wollen.'],
        ['Was kostet DemandMatch?', 'Der Fit-Check ist kostenlos. Die Potenzialanalyse kostet 20.000 €, der Pilot über 30 Tage 60.000 €. Jeder bezahlte Schritt wird auf den nächsten angerechnet: die Potenzialanalyse voll auf den Pilot, der Pilot zu 100 % auf das erste Lizenzjahr, wenn Sie innerhalb von 30 Tagen nach der Auswertung unterschreiben. Sie zahlen nie doppelt. Die Lizenz kostet pro Jahr 180.000 € für einen Bereich (bis 400 Mio. € Umsatz), 450.000 € für die ganze Gruppe (bis 2 Mrd. € Umsatz) und ab 600.000 € global, dazu einmalig ab 60.000 € (Bereich) bzw. ab 150.000 € (Gruppe, Global) für Einführung und Anpassung. Alle Preise netto zzgl. MwSt. In den USA: 22.000 $, 66.000 $, 198.000 $, 495.000 $ und ab 660.000 $, dazu ab 66.000 $ bzw. ab 165.000 $ für die Einführung, zzgl. Sales Tax.'],
        ['Mit welchen Systemen arbeitet DemandMatch?', 'DemandMatch liest aus den Systemen, die Sie schon nutzen: ERP wie SAP, Oracle, Odoo oder DATEV, CRM wie HubSpot, das Postfach (Outlook, Gmail) und Messenger wie WhatsApp oder Slack. Nichts wird ersetzt, es gibt keinen Systemwechsel.'],
        ['Schickt DemandMatch selbst Angebote an Kunden?', 'Nein. DemandMatch bereitet vor, ein Mensch entscheidet. Kein Angebot und keine E-Mail geht raus, bevor Ihr Vertrieb es gesehen und freigegeben hat.'],
        ['Was passiert mit unseren Daten?', 'Kein Systemwechsel, kein Großprojekt. DemandMatch greift nur lesend auf ERP, CRM und Postfach zu und ändert dort nichts. Ihre Daten bleiben, wo sie sind. Anbindung und Zugriffsrechte legen wir gemeinsam mit Ihrer IT fest.'],
        ['Wie fängt man an?', 'Mit einem kostenlosen Fit-Check: Sie schicken uns vorab ein paar Eckdaten (Branche, Umsatz, ERP, Größe des Vertriebsteams), damit wir nur sprechen, wo es passt. Dann eine Potenzialanalyse auf den Daten eines Bereichs und ein Pilot von 30 Tagen auf Ihren echten Daten, für eine Produktfamilie und ein Team, mit vorab schriftlich vereinbarten Erfolgskriterien. Woche 1: lesend verbinden. Woche 2: Ihre echten Anfragen gegen Ihren echten Bestand abgleichen, mit Ihren Regeln zu Marge und Kunden. Woche 3 und 4: Ihr Team arbeitet damit, und wir messen gemeinsam, was es bringt.'],
        ['Wer steht hinter DemandMatch?', 'DemandMatch wurde in Berlin von Bing Cai (CEO, Staff Forward Deployed Engineer) und Richard von Waldow (Forward Deployed Engineer) gegründet. Kontakt: hello@demandmatch.io.']
      ],
      meta_desc: 'DemandMatch gleicht Ihren Bestand automatisch mit dem Bedarf Ihrer Kunden ab. Software für Distributoren von Chemie, Kunststoffen und Industriebedarf: mehr Umsatz, bessere Marge, Ihr Vertrieb gibt nur noch frei.',
      roi_eyebrow: 'Business Case', roi_h: 'Rechnen Sie selbst.<br><span class="mute">Mit Ihren Zahlen, nicht mit unseren.</span>',
      roi_sub: 'Jede Annahme ist sichtbar und verstellbar. In den ROI geht nur Geld ein, das wirklich ankommt. Frei werdende Zeit zeigen wir daneben, gerechnet wird sie nur, wenn Sie es wollen.',
      roi_presets: ['Vorsichtig', 'Erwartet', 'Ihre Zahlen'], roi_presets_label: 'Annahmen',
      roi_g1: 'Ihr Unternehmen', roi_g2: 'Wirkung von DemandMatch', roi_g3: 'Kosten',
      roi_rev: 'Jahresumsatz', roi_gm: 'Bruttomarge', roi_stock: 'Lagerbestand, in % vom Umsatz', roi_people: 'Mitarbeitende in Vertrieb und Innendienst', roi_pcost: 'Kosten pro Person und Jahr',
      roi_scope: 'Anteil des Geschäfts mit DemandMatch', roi_scope_h: 'Für einen einzelnen Bereich verkleinern, zum Beispiel 25 %.',
      roi_sales: 'Mehr Umsatz aus Anfragen, die heute verloren gehen', roi_margin: 'Margenplus je Angebot', roi_freed: 'Liegender Bestand, früher verkauft', roi_hold: 'Lagerhaltungskosten pro Jahr', roi_time: 'Frei werdende Vertriebszeit',
      roi_days: 'Eigener Projektaufwand', roi_days_h: 'Personentage Ihres Teams im ersten Jahr, zu je 800 €.',
      roi_lic: 'Lizenz', roi_lic_auto: 'Automatisch', roi_lics: ['Bereich', 'Gruppe', 'Global'], roi_lic_h: 'Automatisch gewählt nach dem Umsatz im Umfang.',
      roi_pts: 'Pp.', roi_days_u: 'Tage', roi_people_u: 'Personen', roi_of_stock: 'vom Bestand',
      roi_memo: 'Business Case', roi_memo_rev: '{r} Umsatz', roi_memo_scope: '{x} im Umfang', roi_months_in: 'Monaten',
      roi_verdict: 'Amortisiert in <b>{p}</b>. Über drei Jahre <b>{v}</b> Wert für <b>{c}</b> Kosten, ein ROI von <b>{r}</b>.',
      roi_verdict_late: 'Amortisiert erst nach dem dritten Jahr. Über drei Jahre <b>{v}</b> Wert für <b>{c}</b> Kosten, ein ROI von <b>{r}</b>.',
      roi_payback: 'Amortisation', roi_months: 'Monate', roi_never: 'über 36 Monate', roi_roi: 'ROI über 3 Jahre', roi_roi_s: '{v} Wert für {c} Kosten',
      roi_value: 'Wert pro Jahr', roi_value_s: 'ab Jahr 2, im ersten Jahr die Hälfte', roi_share: 'Lizenz im Verhältnis', roi_share_s: '{a} vom Umsatz · {b} vom Rohertrag',
      roi_levers: 'Woher der Wert kommt', roi_l: ['Gewonnene Anfragen', 'Margenplus', 'Bestand'],
      roi_cap: 'Frei werdende Kapazität', roi_cap_s: '≈ {f} Vollzeitstellen, Wert {v} pro Jahr', roi_cap_in: 'In den ROI einrechnen',
      roi_years: ['Jahr 1', 'Jahr 2', 'Jahr 3'], roi_t_val: 'Wert', roi_t_cost: 'Kosten', roi_t_cum: 'Kumuliert netto',
      roi_cost_l: 'Lizenz {l} · Einführung {i} · Eigenaufwand {d}. Der Pilot (60.000 €) wird voll angerechnet.',
      roi_link: 'Link mit meinen Zahlen kopieren', roi_copied: 'Link kopiert', roi_print: 'Als PDF drucken',
      roi_note: 'Eine Schätzung, kein Versprechen. In der Potenzialanalyse und im Pilot messen wir genau diese Hebel mit Ihren eigenen Daten.',
      roi_how: 'So rechnen wir',
      roi_formulas: [
        'Rohertrag = Umsatz × Bruttomarge.',
        'Gewonnene Anfragen = Umsatz × zusätzlicher Umsatz in % × Bruttomarge.',
        'Margenplus = Umsatz × Prozentpunkte Margenplus.',
        'Bestand = Umsatz × Lagerbestand in % × früher verkaufter Anteil × Lagerhaltungskosten. Vermiedene Abschreibungen rechnen wir nicht mit.',
        'Wert pro Jahr = (Gewonnene Anfragen + Margenplus + Bestand) × Anteil des Geschäfts mit DemandMatch.',
        'Frei werdende Kapazität = Mitarbeitende × frei werdende Zeit × Kosten pro Person. Sie zählt nur mit, wenn Sie sie einrechnen.',
        'Jahr 1 bringt 50 % des Werts (Anlauf), Jahr 2 und 3 je 100 %.',
        'Kosten Jahr 1 = Lizenz + Einführung + Eigenaufwand (Personentage × 800 €). Jahr 2 und 3 = Lizenz. Der Pilot wird auf Jahr 1 angerechnet.',
        'Lizenz: Bereich 180.000 € pro Jahr (bis 400 Mio. € Umsatz im Umfang, Einführung 60.000 €), Gruppe 450.000 € (bis 2 Mrd. €, Einführung 150.000 €), Global ab 600.000 € (Einführung ab 150.000 €).',
        'ROI über 3 Jahre = (Wert über 3 Jahre − Kosten über 3 Jahre) ÷ Kosten über 3 Jahre. Amortisation = der Monat, in dem der kumulierte Wert die kumulierten Kosten übersteigt.'
      ],
      roi_static: 'Beispiel für einen Distributor mit 1,2 Mrd. € Umsatz, 12 % Bruttomarge, 12 % Lagerbestand und 400 Personen im Vertrieb. Erwartet: 1 % mehr Umsatz aus verlorenen Anfragen (1,4 Mio. €), 0,3 Prozentpunkte Margenplus (3,6 Mio. €) und 15 Mio. € Bestand (10,5 %) früher verkauft bei 9 % Lagerhaltungskosten (1,4 Mio. €), zusammen 6,4 Mio. € pro Jahr. Kosten im ersten Jahr: Gruppenlizenz 450.000 €, Einführung 150.000 €, Eigenaufwand 32.000 €. Amortisation nach etwa 2,4 Monaten, ROI über 3 Jahre etwa 950 %. Vorsichtig (0,5 % Umsatz, 0,1 Prozentpunkte, 3,5 % des Bestands): 2,4 Mio. € pro Jahr, Amortisation nach etwa 6 Monaten, ROI über 3 Jahre etwa 290 %. Dazu frei werdende Zeit von 10 bis 20 %, das sind 40 bis 80 Vollzeitstellen, nicht eingerechnet.',
      pr_eyebrow: 'Preise', pr_h: 'Klare Preise.<br><span class="mute">Erst messen, dann entscheiden.</span>',
      pr_sub: 'Jeder Schritt hat einen festen Preis, und jeder bezahlte Schritt wird auf den nächsten angerechnet. Sie zahlen nie doppelt.',
      pr_cur: 'Währung', pr_free: 'Kostenlos', pr_from: 'ab', pr_year: 'pro Jahr',
      pr_steps: [
        ['30 Minuten', 'Fit-Check', 'free', 'Ein Gespräch, nachdem Sie uns ein paar Eckdaten geschickt haben: Branche, Umsatz, ERP und Größe des Vertriebs. So sprechen wir nur mit Unternehmen, für die es passt.'],
        ['3 Wochen', 'Potenzialanalyse', 'assess', 'Auf den Daten eines Bereichs: wie viel Umsatz heute verloren geht, wie viel Bestand liegt und wie viel Marge offen bleibt, in Euro. Wird voll auf den Pilot angerechnet.'],
        ['30 Tage', 'Pilot', 'pilot', 'Eine Produktfamilie, ein Team, Erfolgskriterien vorher schriftlich. Wird zu 100 % auf das erste Jahr angerechnet, wenn Sie innerhalb von 30 Tagen nach der Auswertung unterschreiben.'],
        ['Ab Jahr 1', 'Lizenz', 'license', 'Jährlich, je nach Umfang: ein Bereich, die ganze Gruppe oder global.']
      ],
      pr_tiers: [
        ['division', 'Bereich', 'Für den Einstieg mit einem Bereich', 'Ein Geschäftsbereich oder ein Land', 'bis {4e8}', 'bis 60'],
        ['group', 'Gruppe', 'Typisch bei rund {1e9} Umsatz', 'Alle Bereiche und Länder', 'bis {2e9}', 'bis 500'],
        ['global', 'Global', 'Für Konzerne mit mehreren Gesellschaften', 'Mehrere ERP-Systeme, Single Sign-on, fester Ansprechpartner', 'über {2e9}', 'nach Vereinbarung']
      ],
      pr_lic_label: 'Lizenz pro Jahr',
      pr_rows: ['Umfang', 'Umsatz im Umfang', 'Nutzer im Vertrieb', 'Einführung, einmalig'],
      pr_all: 'In jeder Lizenz: Abgleich in beide Richtungen, Angebote mit Marge, Fracht und Ihren Preisregeln, lesende Anbindung an ERP, CRM und Postfach, und nichts geht raus ohne Freigabe Ihres Teams.',
      pr_doc: 'Ihr Weg zu DemandMatch', pr_doc_credit: ['', 'voll angerechnet auf den Pilot', 'zu 100 % angerechnet auf Jahr 1', ''],
      pr_tax_eur: 'Alle Preise netto, zzgl. MwSt.', pr_tax_usd: 'Preise in US-Dollar für Kunden in den USA, zzgl. Sales Tax.',
      pr_terms: 'Jährliche Zahlung im Voraus, Mindestlaufzeit 12 Monate. Potenzialanalyse und Pilot werden voll angerechnet.',
      pr_cta: 'Fit-Check anfragen', pr_roi: 'Business Case rechnen',
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
      p3_w: 'Weeks 3 and 4', p3_h: 'Work', p3_p: 'Your team works with it and approves. Together we measure what it brings.',
      faq_eyebrow: 'Questions and answers', faq_h: 'What you should know<br><span class="mute">about DemandMatch.</span>',
      faq: [
        ['What is DemandMatch?', 'DemandMatch is software for B2B distribution. It matches your inventory with your customers\' demand automatically: for every request from email, phone or CRM it finds the right material, warehouse and margin and prepares the offer. The other way round, it finds the customers who buy exactly what sits in overstock or arrives inbound. Your sales team reviews and approves.'],
        ['Who is DemandMatch for?', 'For distributors and wholesalers of chemicals, plastics and industrial goods, above all for heads of sales, field sales and inside sales teams who have to bring many requests and a lot of stock together.'],
        ['What does DemandMatch bring to a sales team?', 'More sales, because no request is left waiting and no customer is forgotten. Better margin, because every offer accounts for freight, storage and your pricing rules, and stock that sits gets sold instead of written off. And less manual work: reading, matching and writing the offer run automatically.'],
        ['What ROI can a distributor with €1bn revenue expect?', 'At €1.2bn revenue and 12% gross margin we expect €2.4m (conservative) to €6.4m (expected) a year from more sales, better margin and stock sold earlier. Against the Group license, implementation and own effort of about €630,000 together in year one, that pays back in about 2 to 6 months. Freed sales time comes on top. The calculator on this page lets you adjust every assumption. Only money that actually arrives goes into the ROI; freed time is shown next to it and counted only if you choose to.'],
        ['How much does DemandMatch cost?', 'The fit check is free. The value assessment costs €20,000 and the 30-day pilot €60,000. Every paid step is credited to the next one: the value assessment in full to the pilot, the pilot 100% to year one of the license if you sign within 30 days of the review. You never pay twice. The license costs per year €180,000 for one division (up to €400m revenue), €450,000 for the whole group (up to €2bn revenue) and from €600,000 globally, plus a one-time implementation and customisation fee from €60,000 (Division) or from €150,000 (Group, Global). All prices net, excl. VAT. In the US: $22,000, $66,000, $198,000, $495,000 and from $660,000, plus from $66,000 or from $165,000 for implementation, excl. sales tax.'],
        ['Which systems does DemandMatch work with?', 'DemandMatch reads from the systems you already run: ERP such as SAP, Oracle, Odoo or DATEV, CRM such as HubSpot, the inbox (Outlook, Gmail) and messengers such as WhatsApp or Slack. Nothing is replaced and there is no system change.'],
        ['Does DemandMatch send offers to customers by itself?', 'No. DemandMatch prepares, a person decides. No offer and no email goes out before your sales team has seen and approved it.'],
        ['What happens to our data?', 'No system change, no big project. DemandMatch has read-only access to ERP, CRM and inbox and changes nothing there. Your data stays where it is. We set up the connection and access rights together with your IT.'],
        ['How do we get started?', 'With a free fit check: you send us a few facts first (industry, revenue, ERP, size of your sales team), so we only talk where it fits. Then a value assessment on one division\'s data and a 30-day pilot on your real data, for one product family and one team, with success criteria agreed in writing upfront. Week 1: connect read-only. Week 2: match your real requests against your real stock, with your rules on margin and customers. Weeks 3 and 4: your team works with it, and together we measure what it brings.'],
        ['Who is behind DemandMatch?', 'DemandMatch was founded in Berlin by Bing Cai (CEO, Staff Forward Deployed Engineer) and Richard von Waldow (Forward Deployed Engineer). Contact: hello@demandmatch.io.']
      ],
      meta_desc: 'DemandMatch matches your inventory with your customers\' demand, automatically. Software for distributors of chemicals, plastics and industrial goods: more sales, better margin, and your sales team only approves.',
      roi_eyebrow: 'Business case', roi_h: 'Run the numbers yourself.<br><span class="mute">With your figures, not ours.</span>',
      roi_sub: 'Every assumption is visible and adjustable. Only money that actually arrives goes into the ROI. Freed time is shown next to it and counted only if you choose to.',
      roi_presets: ['Conservative', 'Expected', 'Your numbers'], roi_presets_label: 'Assumptions',
      roi_g1: 'Your company', roi_g2: 'Effect of DemandMatch', roi_g3: 'Cost',
      roi_rev: 'Annual revenue', roi_gm: 'Gross margin', roi_stock: 'Stock, as % of revenue', roi_people: 'People in sales and inside sales', roi_pcost: 'Cost per person per year',
      roi_scope: 'Share of the business run through DemandMatch', roi_scope_h: 'Lower it for a single division, for example 25%.',
      roi_sales: 'Extra revenue from requests lost today', roi_margin: 'Margin uplift per offer', roi_freed: 'Idle stock sold earlier', roi_hold: 'Holding cost of stock per year', roi_time: 'Sales time freed',
      roi_days: 'Your own project effort', roi_days_h: 'Days of your team\'s time in year one, at €800 each.',
      roi_lic: 'License', roi_lic_auto: 'Automatic', roi_lics: ['Division', 'Group', 'Global'], roi_lic_h: 'Picked automatically from the revenue in scope.',
      roi_pts: 'pts', roi_days_u: 'days', roi_people_u: 'people', roi_of_stock: 'of stock',
      roi_memo: 'Business case', roi_memo_rev: '{r} revenue', roi_memo_scope: '{x} in scope', roi_months_in: 'months',
      roi_verdict: 'Pays for itself in <b>{p}</b>. Over three years, <b>{v}</b> of value for <b>{c}</b> of cost: a return of <b>{r}</b>.',
      roi_verdict_late: 'Does not pay back within three years. Over three years, <b>{v}</b> of value for <b>{c}</b> of cost: a return of <b>{r}</b>.',
      roi_payback: 'Payback', roi_months: 'months', roi_never: 'over 36 months', roi_roi: '3-year ROI', roi_roi_s: '{v} value for {c} cost',
      roi_value: 'Value per year', roi_value_s: 'from year 2, half in year 1', roi_share: 'License in proportion', roi_share_s: '{a} of revenue · {b} of gross profit',
      roi_levers: 'Where the value comes from', roi_l: ['Captured requests', 'Margin uplift', 'Stock'],
      roi_cap: 'Freed capacity', roi_cap_s: '≈ {f} full-time people, worth {v} a year', roi_cap_in: 'Count it in the ROI',
      roi_years: ['Year 1', 'Year 2', 'Year 3'], roi_t_val: 'Value', roi_t_cost: 'Cost', roi_t_cum: 'Cumulative net',
      roi_cost_l: 'License {l} · implementation {i} · own effort {d}. The pilot (€60,000) is credited in full.',
      roi_link: 'Copy link with my numbers', roi_copied: 'Link copied', roi_print: 'Print as PDF',
      roi_note: 'An estimate, not a promise. In the value assessment and the pilot we measure exactly these levers on your own data.',
      roi_how: 'How we calculate',
      roi_formulas: [
        'Gross profit = revenue × gross margin.',
        'Captured requests = revenue × extra revenue % × gross margin.',
        'Margin uplift = revenue × margin points.',
        'Stock = revenue × stock % × share sold earlier × holding cost. Avoided write-downs are not counted.',
        'Value per year = (captured requests + margin uplift + stock) × share of the business run through DemandMatch.',
        'Freed capacity = people × time freed × cost per person. It only counts if you include it.',
        'Year 1 brings 50% of the value (ramp-up), years 2 and 3 bring 100% each.',
        'Cost in year 1 = license + implementation + own effort (days × €800). Years 2 and 3 = license. The pilot is credited to year 1.',
        'License: Division €180,000 a year (up to €400m revenue in scope, implementation €60,000), Group €450,000 (up to €2bn, implementation €150,000), Global from €600,000 (implementation from €150,000).',
        '3-year ROI = (3-year value − 3-year cost) ÷ 3-year cost. Payback = the month in which cumulative value exceeds cumulative cost.'
      ],
      roi_static: 'Example for a distributor with €1.2bn revenue, 12% gross margin, stock at 12% of revenue and 400 people in sales. Expected: 1% more revenue from lost requests (€1.4m), 0.3 points margin uplift (€3.6m) and €15m of stock (10.5%) sold earlier at 9% holding cost (€1.4m), together €6.4m a year. Cost in year one: Group license €450,000, implementation €150,000, own effort €32,000. Payback after about 2.4 months, 3-year ROI about 950%. Conservative (0.5% revenue, 0.1 points, 3.5% of stock): €2.4m a year, payback after about 6 months, 3-year ROI about 290%. On top, 10 to 20% of sales time freed, 40 to 80 full-time people, not counted.',
      pr_eyebrow: 'Pricing', pr_h: 'Clear prices.<br><span class="mute">Measure first, then decide.</span>',
      pr_sub: 'Every step has a fixed price, and every paid step is credited to the next one. You never pay twice.',
      pr_cur: 'Currency', pr_free: 'Free', pr_from: 'from', pr_year: 'per year',
      pr_steps: [
        ['30 minutes', 'Fit check', 'free', 'A call after you have sent us a few facts: industry, revenue, ERP and size of your sales team. That way we only talk to companies it fits.'],
        ['3 weeks', 'Value assessment', 'assess', 'On one division\'s data: how much revenue is lost today, how much stock sits idle and how much margin is left open, in money. Credited in full to the pilot.'],
        ['30 days', 'Pilot', 'pilot', 'One product family, one team, success criteria agreed in writing upfront. Credited 100% to year one if you sign within 30 days of the review.'],
        ['From year 1', 'License', 'license', 'Annual, by scope: one division, the whole group, or global.']
      ],
      pr_tiers: [
        ['division', 'Division', 'To start with one division', 'One business unit or one country', 'up to {4e8}', 'up to 60'],
        ['group', 'Group', 'Typical at about {1e9} revenue', 'All divisions and countries', 'up to {2e9}', 'up to 500'],
        ['global', 'Global', 'For groups with several companies', 'Several ERP systems, single sign-on, a dedicated contact', 'above {2e9}', 'by agreement']
      ],
      pr_lic_label: 'License per year',
      pr_rows: ['Scope', 'Revenue in scope', 'Sales users', 'Implementation, one-time'],
      pr_all: 'Every license includes: matching both ways, offers with margin, freight and your pricing rules, read-only connection to ERP, CRM and inbox, and nothing goes out without your team\'s approval.',
      pr_doc: 'Your path to DemandMatch', pr_doc_credit: ['', 'credited in full to the pilot', 'credited 100% to year one', ''],
      pr_tax_eur: 'All prices net, excl. VAT.', pr_tax_usd: 'Prices in US dollars for customers in the US, excl. sales tax.',
      pr_terms: 'Paid annually in advance, 12-month minimum term. The value assessment and the pilot are credited in full.',
      pr_cta: 'Book a fit check', pr_roi: 'Run your business case',
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
