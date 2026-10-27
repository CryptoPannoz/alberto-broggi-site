# Alberto Broggi — Personal Site

One-page personal website. Static HTML/CSS, no build step. Hostable on GitHub Pages.

## Structure
- `index.html` (IT) / `en/index.html` (EN) — one-page site, laid out like a CV: section label on the left, content on the right
  - Work history rows are native `<details>`: click a row to read the full story inline. Each row has an id (`#noura`, `#trieste`, `#barcolana`…), so `/#noura` opens it directly.
- `assets/` — `site.css` (homepage + links pages), `style.css` (legacy, still used by `jobs/` and `tools/affitto-vs-acquisto.html`), `img/` photos, `video/` clips
- `blog/` — articles with their own `blog.css`, same black-and-white language as the homepage
- `jobs/` — legacy standalone detail pages (kept as deep-link fallback; not linked from the homepage)
- `hobbies/` — wingfoil page + full link list
- `cv-velico/`, `en/cv-velico/` — short-URL stubs (bebroggi.it/cv-velico) that jump to the Sailing section (`/#cv-velico`). The race-mile counter at the top of that section sums the `data-nm` spans in the Regattas table: add a regatta = add a span with its estimated miles and the year in its text.
- `tools/` — standalone interactive tools, self-contained (own `<style>`/`<script>`)
  - `affitto-vs-acquisto.html` — rent vs buy calculator: net-worth simulation over the horizon, break-even year, tornado sensitivity on the assumptions, market scenarios. State is shareable via query string and persisted in `localStorage`.

## Focus / positioning
Databases, CRMs and internal tools for short-term rental, real estate and travel companies.
In the industry since 2016: first revenue, channels and operations, now the software.
Copy stays factual: numbers and names, no slogans.

## Design
- Black and white only: `#000` on `#fff`, one grey for secondary text, 1px rules instead of cards
- One typeface: Newsreader (Google Fonts), tabular figures for years and numbers; small labels in spaced capitals
- Every photo rendered in grayscale via CSS (`filter: grayscale(1)`), so the originals stay untouched
- No animations, no scroll effects, no buttons: underlined text links only
- Minimal JS: open a `<details>` row from the URL hash, sum the sailing miles, a `<dialog>` photo viewer

## Homepage information architecture
1. Intro: portrait, one plain sentence, a short fact list (now, before, tools, base, contact)
2. Work: one table, current roles then earlier ones; each row = years · company · role · numbers, expandable
3. Projects: three groups (with clients & partners, tools & apps, hospitality), each row links to the live thing and its article
4. Blog (Diario): the five latest articles, then the full index
5. Sailing (CV velico): miles counter, regattas, cruises & deliveries, training — as tables
6. Off the clock: 12 grayscale photos with captions, link to the links page
7. Contact: email, call booking, LinkedIn, GitHub

## Local preview
Open `index.html` in a browser, or:

```
cd alberto-broggi-site
python3 -m http.server 8080
```

## TODO
- Add real links for treenet weaving & bread baking when ready
