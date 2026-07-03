// GitHub Pages only auto-serves a literal 404.html at the site root. Angular's static
// prerenderer can't enumerate the wildcard route (SSG needs concrete paths), so the
// NotFound page is also mounted at the concrete /404 route and copied here after build.
const { copyFileSync } = require('node:fs');
const { join } = require('node:path');

const browserDir = join(__dirname, '..', 'dist', 'portfolio', 'browser');
copyFileSync(join(browserDir, '404', 'index.html'), join(browserDir, '404.html'));
