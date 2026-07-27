# Alberto Broggi — Personal Site

One-page personal website. Static HTML/CSS, no build step. Hostable on GitHub Pages.

## Structure
- `index.html` — one-page site (hero, what-I-do, work history, projects, hobbies, companies, contact)
  - Work history entries open as **modal pop-ups** — content lives in `<template>` blocks at the bottom of `index.html` (no page navigation).
- `assets/` — `style.css`, `img/` (photos, posters, `img/logos/` company logos), `video/` clips
- `jobs/` — legacy standalone detail pages (kept as deep-link fallback; no longer linked from the timeline)
- `hobbies/` — wingfoil page + full link list
- `tools/` — standalone interactive tools, self-contained (own `<style>`/`<script>`, only `assets/style.css` for design tokens)
  - `affitto-vs-acquisto.html` — rent vs buy calculator: net-worth simulation over the horizon, break-even year, tornado sensitivity on the assumptions, market scenarios. State is shareable via query string and persisted in `localStorage`.

## Focus / positioning
**Database Enrichment & Data Engineering** — forged in vacation rental & real estate
(Trieste Villas · real estate agency, Villa Volpe · Lake Orta) and applicable to any
data-heavy business.

## Design
- Editorial data/operator identity: Instrument Sans + Instrument Serif, with IBM Plex Mono for metrics and metadata
- Warm paper, ink, Adriatic blue and small lime/orange accents
- Results and company logos appear before biography; full experience details remain available in slide-over modals
- Compact mobile layout uses horizontal, scroll-snapping card collections instead of a very long stack
- Projects and off-the-clock stories are image-led; secondary hobbies sit behind a native expandable control

## Homepage information architecture
- Hero: positioning, three proof metrics and current-company logo strip
- What I build: three compact capability groups
- Selected impact: Lucca/Wengen, Trieste Villas and Vertical Sailing Tour
- Experience: three current logo cards, six compact earlier roles, nine full modal stories
- Projects: five visual project cards
- Off the clock: four lead stories plus eight preserved stories in an expandable gallery

## Local preview
Open `index.html` in a browser, or:

```
cd alberto-broggi-site
python3 -m http.server 8080
```

## TODO
- Add real links for treenet weaving & bread baking when ready
- Push to GitHub + enable Pages
