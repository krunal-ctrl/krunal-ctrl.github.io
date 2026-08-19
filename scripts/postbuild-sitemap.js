// Generates sitemap.xml by enumerating the prerendered output. Every route Angular
// statically rendered lands as `<route>/index.html` under dist/portfolio/browser, so
// walking for those files gives us the exact, complete set of live URLs — no need to
// hand-maintain a route list that would drift as blog content is added.
const { readdirSync, statSync, writeFileSync } = require('node:fs');
const { join, relative, sep } = require('node:path');

const ORIGIN = 'https://krunal-ctrl.github.io';
const browserDir = join(__dirname, '..', 'dist', 'portfolio', 'browser');

// Routes to keep out of the sitemap (soft-404 pages carry no SEO value).
const EXCLUDE = new Set(['/404']);

/** Recursively collect every directory that contains an index.html. */
function collectRoutes(dir) {
  const routes = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    let hasIndex = false;
    try {
      hasIndex = statSync(join(full, 'index.html')).isFile();
    } catch {
      hasIndex = false;
    }
    if (hasIndex) {
      const rel = relative(browserDir, full).split(sep).join('/');
      routes.push('/' + rel);
    }
    routes.push(...collectRoutes(full));
  }
  return routes;
}

const today = new Date().toISOString().slice(0, 10);

// Root ('/') has its index.html directly in browserDir; the walk only finds nested dirs.
const routes = ['/', ...collectRoutes(browserDir)]
  .filter((r) => !EXCLUDE.has(r))
  .sort();

// De-dupe just in case, and give the homepage top priority.
const seen = new Set();
const urls = routes.filter((r) => (seen.has(r) ? false : seen.add(r)));

const body = urls
  .map((route) => {
    const loc = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`;
    const priority = route === '/' ? '1.0' : route.startsWith('/blog') ? '0.6' : '0.8';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(join(browserDir, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap.xml written with ${urls.length} URLs`);
