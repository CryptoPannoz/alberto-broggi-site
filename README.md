# Alberto Broggi — Personal Site

One-page personal website. Static HTML/CSS, no build step. Hostable on GitHub Pages.

## Structure
- `index.html` — one-page site (hero, what-I-do, work history, projects, hobbies, companies, contact)
  - Work history entries open as **modal pop-ups** — content lives in `<template>` blocks at the bottom of `index.html` (no page navigation).
- `assets/` — `style.css`, `img/` (photos, posters, `img/logos/` company logos), `video/` clips
- `jobs/` — legacy standalone detail pages (kept as deep-link fallback; no longer linked from the timeline)
- `hobbies/` — wingfoil page + full link list

## Focus / positioning
**Database Enrichment & Data Engineering** — forged in vacation rental
(Trieste Villas · 120 properties, Villa Volpe · Lake Orta) and applicable to any
data-heavy business.

## Design
- Display: Space Grotesk · Body: Inter
- Accent: `#f76b1d` (VST orange — Alberto's brand) + deep teal `#1c5f78`
- Light warm surfaces with dark "companies" and "contact" bands

## Logos
- `assets/img/logos/trieste-villas.svg` — Trieste Villas wordmark (from triestevillas.com)
- `assets/img/logos/vst-dark.png` — Vertical Sailing Tour
- Villa Volpe — CSS text wordmark (no logo file exists)

## Local preview
Open `index.html` in a browser, or:

```
cd alberto-broggi-site
python3 -m http.server 8080
```

## TODO
- Add real links for treenet weaving & bread baking when ready
- Push to GitHub + enable Pages
