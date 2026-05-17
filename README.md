# TCG Handyman Websites — Sales Landing

Static landing site that sells TCG Solutions' website-design service to handymen, contractors, and other small service-pro businesses. Pure HTML/CSS/JS, deployed on Netlify.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Sales page (hero, features, pricing, compare, add-ons, examples, testimonials, process, FAQ, lead form) |
| `thanks.html` | Form-submit success page (`/thanks` is rewritten to `/thanks.html`) |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `styles.css` | All styling, mobile-first responsive |
| `script.js` | Year stamp, tier-prefill on pricing CTAs, phone-input formatting, smooth scroll |
| `netlify.toml` | Security headers, cache rules, `/thanks` rewrite |
| `_redirects` | Backup `/thanks` rewrite for plain Netlify static |
| `robots.txt`, `sitemap.xml` | SEO basics |
| `deploy.ps1` | One-command preview / production deploy via Netlify CLI |

## Local preview

```powershell
python -m http.server 8765
# then open http://127.0.0.1:8765/
```

## Deploy

First-time setup creates the Netlify site `tcg-handyman-websites`:

```powershell
.\deploy.ps1            # preview deploy
.\deploy.ps1 -Prod      # production deploy
```

## Form handling

The lead form on `index.html` posts to Netlify Forms (`data-netlify="true"`, form name `handyman-lead`). Submissions land in the Netlify dashboard under **Forms**; redirect to `/thanks` on success.

## Notes

- Phone number on page: (812) 522-9999 — point this at the real intake line before production.
- Example screenshots reference real TCG-built client sites (Cornerstone, Gary That Computer Guy, Seymour Indiana Live).
- Testimonials in the Reviews section are illustrative client quotes used while the real portfolio is collected.
