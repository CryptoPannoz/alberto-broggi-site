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
- Editorial / broadsheet direction: black on white, generous whitespace, photos carry the color
- Display: Fraunces (serif, optical sizes) · Body/labels: Inter — no accent color
- Skeleton: each section is a two-column spread with a sticky № label column on the left
- Sticky topbar (brand + nav + coordinates), asymmetric ventures grid, borderless hobby masonry, black "contact" band

## Logos (`assets/img/logos/`)
- `lucca.png` — Lucca Apartments & Villas (from their site)
- `wengen.png` — Wengen Apartments (from their site)
- `trieste-villas.svg` — Trieste Villas wordmark (from triestevillas.com)
- `vst-dark.png` — Vertical Sailing Tour
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
