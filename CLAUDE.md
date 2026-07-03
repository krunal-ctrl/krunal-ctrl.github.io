# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for **Krunal Jethva**, a .NET & Angular software engineer. Served as a GitHub Pages site at `https://krunal-ctrl.github.io/`. It's an **Angular 20 app** (standalone components, no NgModules) using Angular's built-in SSR/static prerendering — every route is prerendered to real static HTML at build time and deployed as plain files (no Node server runs in production; GitHub Pages can't run one). It was previously a hand-written plain HTML/CSS/JS site; that has been fully replaced.

## Running it

```
npm install
npm start                 # dev server at http://localhost:4200
npm run build              # production build + prerender -> dist/portfolio/browser
npm test                   # unit tests (Karma/Jasmine)
```

`npm run build` also runs a `postbuild` step (`scripts/postbuild-404.js`) that copies the prerendered `/404` route's output to `dist/portfolio/browser/404.html`, since GitHub Pages only auto-serves a literal top-level `404.html` and Angular's static prerenderer can't enumerate the wildcard route.

Node version is pinned in `.nvmrc` (`22.19.0`) — the latest Angular CLI needs a newer Node than that, which is why this project stays on Angular 20 rather than tracking the very latest release.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/portfolio/browser` via the native GitHub Pages Actions deployment (`upload-pages-artifact` + `deploy-pages`). For this to take effect, the repo's Settings → Pages → "Build and deployment" source must be set to **"GitHub Actions"** (a one-time manual step, not something a commit can do). Base-href is `/` since this is a root-domain user Pages site, not a project subpath.

## Structure

```
src/
  index.html, styles.scss          # global head + design tokens/reset/shared classes
  main.ts, main.server.ts, server.ts   # bootstrap + SSR/prerender entry (build-time only)
  app/
    app.ts / app.routes.ts / app.config.ts (+ .server.ts variants)
    layout/
      shell/     # <app-header/><router-outlet/><app-footer/> wrapper for the 3 real routes
      header/    # sticky nav, mobile toggle (signal-based), active-link via routerLinkActive
      footer/    # footer nav + socials + copyright
    pages/
      home/, about/, projects/     # routed page components
      not-found/                   # wildcard route's page - has its OWN inline header, no Shell/Footer
    shared/
      components/
        brand/           # the "Krunal [K] Jethva" logo - single source, used by Header/Footer/NotFound
        stat-counter/    # animated stat tile (see "Stats" below)
        bento-tile/      # one "what I do" bento tile, SVG illustration or emoji watermark
        project-card/    # one project card, SVG banner or emoji icon
      directives/reveal.ts        # [appReveal] - IntersectionObserver-driven scroll-reveal
      pipes/years-since-pipe.ts   # {{ CAREER_START_ISO | yearsSince }} for inline prose
      util/completed-years.ts     # pure fn: whole completed years between an ISO date and now
    data/
      links.data.ts        # NAV_LINKS + SITE_LINKS - THE place to edit nav links, GitHub/LinkedIn/
                            # Twitter/email/résumé path. Never hardcode these in a template again.
      experience.data.ts, projects.data.ts, skills.data.ts, stats.data.ts, bento.data.ts
      career.ts             # CAREER_START_ISO constant, referenced by stats + prose everywhere
public/                     # static assets served as-is: favicon.svg, img/, fonts/apercu/, resume.pdf, robots.txt
resume.md                   # canonical résumé prose/content reference (not rendered directly - see below)
```

## Conventions & gotchas

- **Single sources of truth - use them, don't hardcode:**
  - Nav links and external/contact links (GitHub, LinkedIn, Twitter, email, résumé path) live in `src/app/data/links.data.ts` as `NAV_LINKS` and `SITE_LINKS`. Every place that used to hardcode `https://github.com/krunal-ctrl` or `resume.pdf` now reads from here.
  - The logo/monogram markup lives once in `shared/components/brand/`, used by `Header`, `Footer`, and `NotFound`.
  - `CAREER_START_ISO` (`data/career.ts`) is the one place the "career started" date lives - used by the animated years-shipping stat and every inline "N years" prose mention via `YearsSincePipe`. Never hardcode a computed year.
  - Content (jobs, projects, skills, stats, bento tiles) lives in `src/app/data/*.data.ts` typed by matching `*.model.ts` files, not hand-written into templates. `resume.md` is the canonical prose reference to sync copy against when updating these.
- **NotFound is intentionally NOT wrapped in `Shell`.** It has its own small inline header (no GitHub icon button) and no footer, to avoid fragile "am I on the 404 route" detection in the shared layout. It's also mounted at a concrete `/404` path (in addition to the wildcard `**`) purely so Angular's static prerenderer has something to render — see the postbuild step above.
- **Styling is hybrid, matching the old site's own logical sectioning:**
  - `src/styles.scss` (global): design tokens (`:root` custom properties - colors, radii, shadows, `--maxw`, `--font`), the Apercu `@font-face` rules, base reset, and any class used by **2 or more** components/pages (`.btn`/`.card`/`.grid`/`.tags`/`.tag`/`.band`/`.reveal`/`.timeline`/`.proj-grid`/`.hero`/`.hero-grid`/`.hero-portrait`/header chrome/`.brand`, etc).
  - Component-scoped `.scss` files: anything genuinely specific to one component (e.g. `home.scss`'s bento grid/wave animation/stats grid, `about.scss`'s prose/skill-category styling, `stat-counter.scss`'s `:host`-based tile styling).
  - When adding a class used by more than one component, move it to global rather than duplicating it - this hybrid split is deliberate, not accidental duplication.
- **Theme:** blue-tinted neutrals, solid indigo primary (`--violet` for accents/highlights, `--primary` for fills like buttons/bands), hot-pink `--pink` secondary used sparingly, self-hosted Apercu typeface. No gradients anywhere - `.gradient-text` is a misnomer kept for markup stability and just renders solid indigo. Light-mode only.
- **Add `appReveal`** to any element that should fade/slide in on scroll. It's a directive (`shared/directives/reveal.ts`), not a CSS class alone - pair it with the `.reveal` class in the template (e.g. `<div class="card reveal" appReveal>`). Respects `prefers-reduced-motion` (skips straight to visible).
- **Stats** (`StatCounter`, home page only): sets its displayed value to the *correct final number* in `ngOnInit` (which runs during SSR/prerendering too), so prerendered HTML is always correct even with JS disabled. The count-up animation is a browser-only progressive enhancement triggered by the component's own `IntersectionObserver` in `afterNextRender`. Don't move the initial-value logic into `afterNextRender` - it must run on the server.
- **SSR-safety:** any browser-only API (`IntersectionObserver`, `matchMedia`, `requestAnimationFrame`) must be gated behind `afterNextRender` (see `Reveal`, `StatCounter`). `completedYears()` is a pure function and is safe to call anywhere, including during prerendering.
- **Projects** (`data/projects.model.ts`) carry two independent flags: `wide` (span-2 grid placement) and `artId` (which inline SVG banner to render, via `@switch` in `ProjectCardComponent`) - a card can have one, both, or neither. Home's `FEATURED_PROJECTS` intentionally has its own shorter copy, separate from the full `PROJECTS` list on the Projects page - don't try to derive one from the other.
- **No tests existed before the Angular rewrite** - `completedYears()` has the first unit tests (`shared/util/completed-years.spec.ts`), covering month/day rollover, leap-day, and future-date edge cases. Run `npm test` before assuming a change to date logic is safe.
- Relative/root-relative asset paths only (`img/...`, `fonts/...`, `resume.pdf`) so the site works under the GitHub Pages root; `public/` is the source for all of these.
