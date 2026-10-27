# Alberto Broggi — Personal Site

One-page personal website. Static HTML/CSS, no build step. Hostable on GitHub Pages.

## Structure
- `index.html` (IT) / `en/index.html` (EN) — one-page site, laid out like a CV: section label (with its signal flag) on the left, content on the right
  - Work history rows are native `<details>`: click a row to read the full story inline. Each row has an id (`#noura`, `#trieste`, `#barcolana`…), so `/#noura` opens it directly.
- `assets/site.css` + `assets/site.js` — homepage and links pages (shared behaviours; the small tool demos keep their own inline script per language)
- `assets/style.css` — legacy, still used by `jobs/` and `tools/affitto-vs-acquisto.html`
- `assets/img/` photos, logos, project screenshots · `assets/video/` clips
- `blog/` — articles with their own `blog.css`, same palette and fonts as the homepage
- `jobs/` — legacy standalone detail pages (kept as deep-link fallback; not linked from the homepage)
- `hobbies/` — wingfoil page + full link list
- `cv-velico/`, `en/cv-velico/` — short-URL stubs (bebroggi.it/cv-velico) that jump to the Sailing section (`/#cv-velico`). The race-mile counter and the "lap of the world" ring sum the `data-nm` spans in the Regattas table: add a regatta = add a span with its estimated miles and the year in its text.
- `tools/` — standalone interactive tools, self-contained (own `<style>`/`<script>`)
  - `affitto-vs-acquisto.html` — rent vs buy calculator: net-worth simulation over the horizon, break-even year, tornado sensitivity on the assumptions, market scenarios. State is shareable via query string and persisted in `localStorage`.

## Focus / positioning
Databases, CRMs and internal tools for short-term rental, real estate and travel companies.
In the industry since 2016: first revenue, channels and operations, now the software.
Copy stays factual: numbers and names, no slogans.

## Design
- Clean, white page; navy ink text; accents from the International Code of Signals: red, yellow, blue
- Each section has its signal flag (initial letter: L = Lavoro, P = Progetti…); the hero hoists C·I·A·O in flags next to the portrait; the brand mark is A + B
- Type: one family only, Google Sans (Google Fonts, 400–700) for text, headings, labels and numbers; labels are small spaced capitals
- Square buttons that flip to signal yellow; table rows highlighted in yellow on hover/open
- Motion (all off with `prefers-reduced-motion`): headline words rising, yellow marker under the key words, section rules drawing in, paper curtains lifting off images, odometer digits, the sea-miles ring, flags fluttering, the "data machine" typing a messy record and returning a clean row
- The data machine's examples live in the `#machine-data` JSON at the bottom of each page
- Laser eyes (Bitcoin holder): `.laser` over the hero video lights up only while I smile, between `data-from` and `data-to` seconds of `portrait-live.mp4`; the pupil positions were measured on the video with OpenCV and are given as % of the 820×1000 frame

## Homepage information architecture
1. Hero: one plain sentence, call/CTA, stack, Borlenghi portrait (live video) with the flag hoist
2. Data machine: four sample records (booking, real estate lead, medical certificate, regatta entry) cleaned live
3. Work: one table, current roles then earlier ones; each row = years · logo · company · role · numbers, expandable
4. Projects: Vento Barcolana and RealEstate AI showcases (browser + phone mockups), then hospitality cards
5. Tools: six live mini-demos (rental yield, rent vs buy, Holiday Radar, utilities, VentoTrieste, FiscalNinja), then 101 Desideri and the CRM dashboard
6. Blog (Diario): six latest articles in newspaper columns
7. Sailing (CV velico): odometer + ring, regattas table, cruises/deliveries/training behind a fold
8. Off the clock: photo and video grid with a viewer (arrows, swipe, Esc)
9. Contact: blue duotone section over the Barcolana video

## Local preview
Open `index.html` in a browser, or:

```
cd alberto-broggi-site
python3 -m http.server 8080
```

## TODO
- Add real links for treenet weaving & bread baking when ready
