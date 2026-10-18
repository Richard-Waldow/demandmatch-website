# DemandMatch website

The company website for DemandMatch (Richard von Waldow and Bing Cai). A static site: plain HTML, CSS and a little JavaScript, no build step, no cookies, no tracking, fonts hosted on the site itself.

| File | What it is |
|---|---|
| `index.html` | The page structure |
| `site.js` | All visible text in German and English, the contact email address, the particle field and scroll story |
| `style.css` | Design: dark and cinematic, one cobalt accent, animations that respect "reduced motion" |
| `impressum.html`, `datenschutz.html` | Legal notice and privacy policy, with Richard von Waldow (Waldow Automation Partners, Berlin) as the site operator until DemandMatch is a registered company |
| `CNAME` | The custom domain for GitHub Pages: `waldowautomation.com` |
| `assets/` | Logo, Geist fonts, Phosphor icons |

Run it locally: `python3 -m http.server 8005` in this folder, then open http://localhost:8005.

**What the site deliberately leaves out:** how the matching works, scoring, data model, client names and numbers. It says what DemandMatch does and how it works with customers, not how to rebuild it.

## Live site

Published with GitHub Pages from the public repo `Richard-Waldow/demandmatch-website` on **https://waldowautomation.com** (DNS already points to GitHub). Every push to `main` updates the live site within a minute or two.

- **Two addresses:** German at https://waldowautomation.com/ (the homepage), English at https://waldowautomation.com/en/. The English page is generated: after any change to `index.html`, run `python3 build-en.py` before pushing.

- **Contact address:** the `EMAIL` constant at the top of `site.js` (currently `hello@waldowautomation.com`).
- **Legal pages:** update them once DemandMatch is registered (company name, register, VAT ID, Bing as co-representative if applicable).

## A DemandMatch domain and email later (to do yourselves)

1. **Register the domain.** `demandmatch.de` and `demandmatch.ai` were free on 18 Oct 2026; `demandmatch.com` is taken. A German registrar with good DNS management works well for .de, for example INWX, Hetzner or IONOS.
2. **Set up email** with Google Workspace or Microsoft 365, using the domain. Create `richard@`, `bing@`, and `kontakt@` as a shared alias or group that reaches both of you.
3. **Add the DNS records** the email provider shows you: MX (delivery), SPF and DKIM (so your mail isn't marked as spam) and DMARC (start with `p=none`, tighten later).
4. **Host the site** on GitHub Pages (free): push this folder to a repository, enable Pages, add the domain under Settings → Pages → Custom domain, and create the A/AAAA records (apex) or CNAME (`www`) that GitHub lists. Tick "Enforce HTTPS".
