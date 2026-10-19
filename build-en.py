"""Build the English page en/index.html from index.html (German, the homepage).
Run after every change to index.html:  python3 build-en.py
The English page is the same page one folder down: it fixes the language to English and every relative file reference goes up a level."""
import os, re

s = open('index.html').read()
s = s.replace("window.PAGE_LANG = 'de'; window.LANG_URLS = { de: './', en: 'en/' };", "window.PAGE_LANG = 'en'; window.LANG_URLS = { de: '../', en: './' };")
s = s.replace('<html lang="de">', '<html lang="en">', 1)
s = s.replace('<title>DemandMatch · Vertriebsautomatisierung für den B2B-Handel</title>', '<title>DemandMatch · Sales automation for B2B distribution</title>', 1)
s = s.replace('<meta name="description" content="DemandMatch gleicht Kundenbedarf mit Ihrem Bestand ab, damit der Vertrieb im Großhandel weiß, wem er was anbieten soll.">',
              '<meta name="description" content="DemandMatch matches customer demand to your stock, so sales teams in B2B distribution know what to offer to whom.">', 1)
assert 'Großhandel' not in s, 'index.html has a new German description: update it here too'
s = re.sub(r'(src|href)="(?!https?:|#|mailto:|/|data:)([^"]+)"', r'\1="../\2"', s)
assert "PAGE_LANG = 'en'" in s, 'index.html no longer has the language line'
os.makedirs('en', exist_ok=True)
s = s.replace('<!doctype html>', '<!doctype html>\n<!-- generated from ../index.html by build-en.py; do not edit by hand -->', 1)
open('en/index.html', 'w').write(s)
print('wrote en/index.html')
