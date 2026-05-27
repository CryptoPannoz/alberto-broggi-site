# Alberto Broggi — Personal Site

One-page personal website. Static HTML/CSS, no build step. Hostable on GitHub Pages.

## Structure
- `index.html` — one-page site (hero, services, jobs, projects, hobbies, contact)
- `assets/` — CSS, images (drop `portrait.jpg` here)
- `jobs/` — one detail page per job (linked from the timeline)
- `hobbies/` — link pages (wingfoil, full link list, ...)

## Focus
Positioning as **vacation rental consultant** for inclusion in
[strmarketmap.com](https://www.strmarketmap.com/).

## Local preview
Just open `index.html` in a browser, or:

```
cd alberto-broggi-site
python3 -m http.server 8080
```

## TODO
- Add `assets/portrait.jpg`
- Fill `jobs/*.html` detail pages
- Fill `hobbies/links.html` with curated links
- Push to GitHub + enable Pages
