# Customizing this template for a real client

This site ships as the **Mike's Handyman Service** showcase. To turn it into a paying client's site, every reference to Mike's needs to swap to theirs. This is the punch-list, in the order that takes the least amount of re-work.

## 1. Business identity (do these first)

These strings appear on every page. Use a global find-replace.

| What to replace | Default value | Where it lives |
| --- | --- | --- |
| Business name | `Mike's Handyman Service` | `<title>`, header brand, footer brand, copyright lines |
| Sub-word in brand | `Service` | header + footer brand-tail span |
| Brand initial | `M` | header + footer `.brand-mark` |
| Tagline | `Honest work. Fair price.` | hero h1 |
| Phone number | `(317) 555-0184` and `+13175550184` | header CTA, hero CTA, mobile-call button, footer, FAQ, legal pages, every service page |
| Email | `mike@mikeshandymanindy.com` | footer, privacy.html, terms.html, 404, every service page |
| Owner first name | `Mike` (Reilly) | hero, about section, FAQ |
| Founding year | `2014` | hero eyebrow, about section, footer copy |
| License number | `HM-2019-04477` | trust strip, about, privacy.html, terms.html, footer |
| Insurance carrier | `Auto-Owners` | about, terms.html |
| Insurance amount | `$2M general liability` | trust strip, about, terms.html |

## 2. Service area

The site lists 18 central-Indiana cities and pins them on a CSS-only radius map.

- `index.html` &mdash; `.area-list` block (replace city names)
- `index.html` &mdash; `.area-map` `.map-pin.pin-N` rules (each has `top:` / `left:` percentages you can drag in DevTools)
- `index.html` &mdash; `.area-section` heading mentions "35 miles of downtown" &mdash; change radius and city
- JSON-LD &mdash; `areaServed` array (head of `index.html`)

## 3. Services

The site has six service categories. If the client doesn't do some of these, remove both the homepage card **and** the service-detail page **and** the footer + sitemap entries:

- `services/drywall-paint.html`
- `services/plumbing.html`
- `services/electrical.html`
- `services/decks-outdoor.html`
- `services/kitchen-bath.html`
- `services/installs.html`

If the client offers something not covered, **clone an existing service page** and rewrite. Easiest starting point: `installs.html` (most generic structure).

## 4. Pricing ranges (per service page)

Every service detail page has a `.svc-pricing` block with three typical-job cards. Real prices vary by market &mdash; ask the client for their actual ranges before publishing. Look for the `<span class="range">$XXX&ndash;$XXX</span>` and `<span class="label">…</span>` pairs.

## 5. Photos

Gallery and hero use CSS-only gradient placeholders by default. To swap to real photos:

1. Add image files under `/photos/` (or `/assets/`).
2. In `styles.css`, replace the gallery tile gradients (`.gallery-tile.tile-1` through `.tile-6`) with `background: url("/photos/your-photo.jpg") center / cover;`.
3. Replace the hero `.hero-photo-frame` and `.about-photo-frame` gradients the same way.
4. Replace each service-page `.subhero-art` inline gradient with a `background:url(...)` style.

## 6. Testimonials

`index.html` has six review cards in the `.testimonial-grid`. Replace each `<blockquote>` and `<figcaption>` with real Google review content (with the reviewer's permission). Update the `.proof-strip` numbers too (4.9, 11 yrs, 1,800+ jobs, 48 hrs).

## 7. About section

`index.html` `.about-copy` section. Replace owner-story paragraphs and the four `.cred` cards (license / insurance / BBB / HomeAdvisor) with the client's actual credentials. Update the `.about-stat-card` "11 years" number.

## 8. SEO & structured data

In `index.html` `<head>`:
- `<title>` and `<meta name="description">`
- All `og:` and `twitter:` meta tags &mdash; especially `og:url` and `og:image`
- `<link rel="canonical">`
- `og-image.svg` &mdash; rebuild with the client's name, tagline, and phone (open in any vector editor or edit the SVG directly)
- The full JSON-LD `application/ld+json` script &mdash; every field needs to change: `name`, `image`, `url`, `telephone`, `email`, `description`, `address`, `geo` (lat/lng of their HQ), `areaServed`, `aggregateRating` (use real numbers only), `hasOfferCatalog`

Also update:
- `sitemap.xml` &mdash; replace the domain prefix and add/remove service-page URLs to match
- `robots.txt` &mdash; replace the `Sitemap:` URL

## 9. Footer credit

The footer has a `Site by TCG Solutions` link. If TCG wants the lead-gen credit, leave it. If the client paid for full white-label, remove the `&middot; Site by …` span from every page footer (8 files: `index`, `404`, `privacy`, `terms`, `thanks`, and the 6 service pages).

## 10. Form submission

The lead form posts to Netlify Forms with name `handyman-quote`. After the first deploy on the client's Netlify project, submissions show up in **Forms** in the Netlify dashboard. To forward to the client's inbox, set up an outbound email notification in Netlify (Forms → Settings → Form notifications).

## 11. Domain

Currently runs on `tcg-handyman-websites-932.netlify.app`. To point a custom domain:
1. In Netlify project → Domain management → Add custom domain.
2. Update DNS at the registrar (Netlify gives you the records).
3. Replace every absolute URL in the codebase (find: `tcg-handyman-websites-932.netlify.app` → replace with the new domain).

## 12. Final smoke test

After all swaps, hit each URL once and verify nothing reads "Mike" or "317" or "Indianapolis" where the client's name / number / city should appear. Quick grep:

```powershell
Select-String -Pattern "Mike|317-555|Indianapolis|HM-2019" -Path *.html, services/*.html
```

Should return zero hits before launching.
