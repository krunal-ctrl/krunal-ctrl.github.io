# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for **Krunal Jethva**, a .NET & Angular software engineer. Served as a GitHub Pages site at `https://krunal-ctrl.github.io/`. It is a **plain static site** - hand-written HTML, CSS, and vanilla JS with **no build step, no framework, and no dependencies**. (It was previously a Jekyll + Gulp site; that scaffolding has been removed.)

## Running it

There is nothing to build or compile. Open `index.html` directly, or serve the folder for clean relative paths:

```
python -m http.server 8000      # then visit http://localhost:8000
```

GitHub Pages serves the repo root as-is; pushing to `main` deploys.

## Structure

Multi-page site, each page a standalone HTML file:
- `index.html` - home (hero, stats, "what I do" cards, brief experience, CTA)
- `about.html` - story, full experience timeline, toolbox, education/certs
- `projects.html` - project cards
- `404.html` - not-found page (GitHub Pages serves it automatically)
- `css/styles.css` - the single stylesheet (design tokens, components, responsive rules)
- `js/main.js` - mobile nav toggle + IntersectionObserver scroll-reveal; no libraries
- `fonts/apercu/` - self-hosted Apercu webfont, loaded via `@font-face` in `styles.css`
- `img/` - images (`headshot.jpg`, `og.png`, emoji icons, etc.)
- `resume.pdf` / `Krunal-resume.pdf` - downloadable résumé; `resume.md` is the source content
- `robots.txt`

## Conventions & gotchas

- **The nav and footer are duplicated in every HTML page** - there are no includes/partials. When changing a nav link, the footer, or social URLs, update all of `index.html`, `about.html`, `projects.html`, and `404.html`. Mark the current page's nav link with `class="active"`.
- **Header structure** `.brand` is first-name span + `.brand-mono` (an inline hand-drawn "K" SVG monogram, `.hand-k`) + last-name span; `.primary-nav > ul > li > a` holds the links; `.header-actions` holds the GitHub icon button (`.icon-btn`), résumé button, and the mobile `.nav-toggle`. On mobile `js/main.js` toggles the `.open` class on `.primary-nav`; the GitHub icon and résumé button are hidden below 600px.
- **Footer** (`.site-footer`) mirrors the header theme: a `.footer-inner` row with the `.brand` monogram + tagline, an "Explore" `.footer-nav` column, and a "Connect" `.socials` column, over a `.footer-bottom` copyright bar. Tinted `--bg-soft` background, plain `--border` top border (no colored accent line).
- **All styling lives in `css/styles.css`.** It is driven by CSS custom properties under `:root` (colors, the brand `--gradient`, radii, shadows, spacing). Change the look by editing tokens rather than hard-coding values. Reusable classes: `.btn`/`.btn-primary`/`.btn-ghost`, `.card`, `.grid`/`.grid-2`/`.grid-3`, `.timeline`/`.t-item`, `.band`, `.tag`, `.gradient-text`, `.eyebrow`.
- **Bento grid** (`.bento`): a Josh Comeau-style asymmetric tile grid driven by `grid-template-areas` (areas `backend/frontend/cloud/arch/auth/mentor`, assigned via `.b-*` classes). Tiles are `.bento-item`; `.bento-feature` is the bold solid-indigo feature tile; each tile has an oversized faint `.watermark` glyph. Currently used for the homepage "What I do" section instead of plain cards. Reflows to 2 cols ≤900px and 1 col ≤560px. To restructure, edit the `grid-template-areas` strings (and the `.b-*` names if adding/removing tiles). Three skill tiles (Backend/Frontend/Architecture) carry inline-SVG illustrations (`.bento-art`) instead of an emoji icon.
- **Project grid** (`.proj-grid`, add `.cols-3` on the projects page): a dense auto-flow grid of `.card`s where feature projects get `.span-2` (wider) and an illustrated banner (`.proj-art` — an inline SVG on a `--bg-soft` panel that bleeds to the card edges; `.card` is `overflow:hidden` to clip it). Only a few projects have banners; the rest are plain emoji-icon cards. Used on `index.html` (Selected projects) and `projects.html`. Illustration SVGs use theme `var(--…)` colors so they restyle automatically.
- **Theme:** blue-tinted neutrals, **solid** indigo primary (`--violet` for accents/highlights, `--primary` for fills like buttons/bands), hot-pink `--pink` secondary used sparingly, Apercu typeface. No gradients anywhere; the `.gradient-text` class is a misnomer kept for markup stability and just renders solid indigo. Light-mode only. Header is a translucent blur bar; footer is a tinted band with a solid accent top edge.
- Add `class="reveal"` to any element that should fade/slide in on scroll (handled by `js/main.js`). Animations respect `prefers-reduced-motion`.
- **Stats / years are computed at runtime in `js/main.js`** — don't hardcode the years-of-experience number. The homepage stat tiles use `.stat-num > span[data-count][data-prefix][data-suffix]` which count up when scrolled into view; the "years" stat instead uses `data-since="2021-09-01"` (career start) so it auto-increments over time. Inline prose mentions use `<span data-years="2021-09-01">` which is filled immediately (no animation). A rounded accent underline (`.stat-num::after`) grows in under the number via the shared `.in` reveal class. To change the experience baseline, edit the `data-since`/`data-years` dates.
- Content (jobs, projects, skills) is hand-written directly into the HTML - there is no data layer. `resume.md` is the canonical source to sync copy against.
- Relative paths only (`css/...`, `img/...`, `resume.pdf`) so the site works under the GitHub Pages root.
