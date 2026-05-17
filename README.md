# Handyman Website Template — "Mike's Handyman Service"

A complete, production-ready handyman business website built by TCG Solutions as a showcase template. Prospective clients (handymen, contractors, small service-pro businesses) can see exactly what their site would look like, sections, copy and all. The fictional business is **Mike's Handyman Service** of Indianapolis &mdash; swap the name, phone, photos, license number and service area to make it the buyer's site.

**Live demo:** https://tcg-handyman-websites-932.netlify.app
**Admin:** https://app.netlify.com/projects/tcg-handyman-websites-932
**Repo:** https://github.com/garyamick0614-creator/tcg-handyman-websites

## What's on the site

| Section | Purpose |
| --- | --- |
| Hero | Tagline, two CTAs (quote form + tap-to-call), trust pills |
| Trust strip | Licensed / insured / free estimates / same-week / 4.9 star / local |
| Services | 6-card grid: drywall & paint, plumbing, electrical, decks, kitchen/bath, "everything else" |
| Gallery | 6 recent-work tiles with neighborhood, job type, time on-site |
| CTA banner | Repeat quote-form push midway through scroll |
| About | Owner story, credentials grid (license/insurance/BBB/HomeAdvisor) |
| Service area | Indianapolis-county list + visual radius map |
| Reviews | 6 mock testimonials + 4-stat proof strip |
| FAQ | 8 trade-pro questions answered straight |
| Quote form | Netlify Forms, success → `/thanks` |
| Footer | Services / Company / Contact + privacy/terms + "Site by TCG Solutions" credit |

## What to customize per client

1. Business name (header, footer, all `<title>`s)
2. Phone number — currently `(317) 555-0184` (deliberately a 555 placeholder)
3. Email — currently `mike@mikeshandymanindy.com`
4. License + insurance details (privacy.html and terms.html)
5. Service area list + map pin positions
6. Service cards — pick the trades the client actually performs
7. Gallery captions and tile colors (eventually real before/after photos)
8. Testimonials — swap to the client's actual Google reviews
9. About copy — replace with the owner's real story
10. Footer credit — keep `Site by TCG Solutions` (lead-gen for the operator) or remove if not wanted

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Main page |
| `thanks.html` | Quote-form success page |
| `privacy.html`, `terms.html` | Legal pages, linked from every footer |
| `styles.css` | All styling, mobile-first responsive |
| `script.js` | Year stamp, phone-input formatting, smooth scroll |
| `netlify.toml` | Security headers, cache rules, `/thanks` rewrite |
| `_redirects` | Backup `/thanks` rewrite |
| `robots.txt`, `sitemap.xml` | SEO basics |
| `deploy.ps1` | One-command preview/production deploy via Netlify CLI |

## Local preview

```powershell
python -m http.server 8765
# then open http://127.0.0.1:8765/
```

## Deploy

```powershell
.\deploy.ps1            # preview deploy
.\deploy.ps1 -Prod      # production deploy
```

## Form handling

The quote form on `index.html` posts to Netlify Forms (`data-netlify="true"`, form name `handyman-quote`). Submissions land in the Netlify dashboard under **Forms**; redirect to `/thanks` on success.
