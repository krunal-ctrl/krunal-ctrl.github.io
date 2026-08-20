/**
 * Content pipeline: reads the in-repo Obsidian/markdown sources under content/,
 * transforms Obsidian syntax (wikilinks, embeds, hashtags) to web, renders to HTML,
 * copies Excalidraw SVGs + ground images into public/, and emits a single
 * content index JSON the Angular app consumes (and prerenders from).
 *
 * Run before the Angular build/serve (see package.json scripts).
 */
import {
  readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, copyFileSync, existsSync, rmSync,
} from 'node:fs';
import { join, basename, extname, dirname } from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const ROOT = process.cwd();
const DSA_DIR = join(ROOT, 'content', 'dsa');
const GROUND_DIR = join(ROOT, 'content', 'ground');
const JOURNAL_DIR = join(ROOT, 'content', 'journal');
const OUT_DIR = join(ROOT, 'src', 'app', 'content');
const OUT_JSON = join(OUT_DIR, 'content.index.json');
const PUB_EXCALI = join(ROOT, 'public', 'dsa', 'excalidraw');

// ---------- helpers ----------
const slugify = (s) =>
  s.toString().trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const titleFromFilename = (name) =>
  name.replace(/^LC-\d+-/i, '')      // drop the "LC-4-" ordering prefix
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split CamelCase
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (name === '.obsidian' || name === 'Templates' || name.startsWith('.')) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch { /* fall through */ }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

const stripHtml = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const excerptFrom = (html, n = 160) => {
  const t = stripHtml(html);
  return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t;
};

// ---------- collect DSA notes ----------
const dsaFiles = walk(DSA_DIR).filter((f) => f.endsWith('.md') && !f.endsWith('.excalidraw.md'));

/** name/path -> route, for wikilink resolution */
const wikiMap = new Map();
/** svg name/path -> { url, variant } for embed resolution */
const svgMap = new Map();

// Excalidraw SVGs
if (existsSync(join(DSA_DIR, 'Excalidraw'))) {
  rmSync(PUB_EXCALI, { recursive: true, force: true });
  mkdirSync(PUB_EXCALI, { recursive: true });
  for (const name of readdirSync(join(DSA_DIR, 'Excalidraw'))) {
    if (!name.endsWith('.svg')) continue;
    copyFileSync(join(DSA_DIR, 'Excalidraw', name), join(PUB_EXCALI, name));
    const url = `dsa/excalidraw/${name}`;
    const variant = name.includes('.dark.') ? 'dark' : 'light';
    svgMap.set(name, { url, variant });
    svgMap.set(`Excalidraw/${name}`, { url, variant });
  }
}

// First pass: classify + register routes
const notes = [];
for (const file of dsaFiles) {
  const rel = file.slice(DSA_DIR.length + 1).replace(/\\/g, '/'); // e.g. Problems/LC-4-GroupAnagrams.md
  const base = basename(file, '.md');
  const raw = readFileSync(file, 'utf8');
  const parsed = matter(raw);
  const folder = rel.includes('/') ? rel.split('/')[0] : '';

  let kind, route, title;
  if (rel === 'index.md') {
    kind = 'index'; route = '/blog/dsa'; title = parsed.data.title || 'DSA Notes';
  } else if (folder === 'Topics') {
    kind = 'topic'; title = parsed.data.title || titleFromFilename(base); route = `/blog/dsa/topics/${slugify(base)}`;
  } else if (folder === 'Patterns') {
    kind = 'pattern'; title = parsed.data.title || titleFromFilename(base); route = `/blog/dsa/patterns/${slugify(base)}`;
  } else if (folder === 'Problems') {
    kind = 'problem'; title = parsed.data.title || titleFromFilename(base); route = `/blog/dsa/${slugify(title)}`;
  } else {
    continue; // Daily/etc.
  }

  const note = { kind, route, title, base, folder, body: parsed.content, data: parsed.data };
  notes.push(note);
  // register for wikilink resolution (by full path w/o ext, and by basename)
  wikiMap.set(rel.replace(/\.md$/, ''), route);
  wikiMap.set(base, route);
}

// ---------- transforms ----------
function extractTags(body) {
  const tags = { pattern: [], topic: [], difficulty: '', status: '' };
  let out = body;
  const m = body.match(/^\s*Tags:\s*(.+)$/im);
  if (m) {
    for (const tok of m[1].match(/#[\w/-]+/g) || []) {
      const [, group, val] = tok.match(/#(\w+)\/([\w-]+)/) || [];
      if (group === 'pattern') tags.pattern.push(val);
      else if (group === 'topic') tags.topic.push(val);
      else if (group === 'difficulty') tags.difficulty = val;
      else if (group === 'status') tags.status = val;
    }
    out = body.replace(m[0], '').trimEnd();
  }
  return { tags, body: out };
}

function transformObsidian(body) {
  let out = body;
  // embeds: ![[ ... ]]
  out = out.replace(/!\[\[([^\]]+)\]\]/g, (full, target) => {
    const key = target.trim();
    const hit = svgMap.get(key) || svgMap.get(basename(key));
    if (hit) {
      return `<img src="${hit.url}" alt="sketch" loading="lazy" class="excalidraw excalidraw--${hit.variant}" />`;
    }
    return ''; // unknown embed -> drop
  });
  // wikilinks: [[Target|Label]] or [[Target]]
  out = out.replace(/\[\[([^\]]+)\]\]/g, (full, inner) => {
    const [target, label] = inner.split('|').map((s) => s.trim());
    const route = wikiMap.get(target) || wikiMap.get(basename(target));
    const text = label || target.split('/').pop();
    return route ? `[${text}](${route})` : text;
  });
  // inline hashtags: link topic/pattern, plain-text difficulty/status
  out = out.replace(/#(pattern|topic|difficulty|status)\/([\w-]+)/g, (full, group, val) => {
    if (group === 'topic') return `[${val.replace(/-/g, ' ')}](/blog/dsa/topics/${slugify(val)})`;
    if (group === 'pattern') return `[${val.replace(/-/g, ' ')}](/blog/dsa/patterns/${slugify(val)})`;
    return val;
  });
  return out;
}

// Second pass: render
const dsa = { index: null, problems: [], topics: [], patterns: [] };
for (const note of notes) {
  const { tags, body } = extractTags(note.body);
  const html = md.render(transformObsidian(body));
  const entry = {
    kind: note.kind, slug: note.route.split('/').pop(), route: note.route,
    title: note.title, html, excerpt: excerptFrom(html),
  };
  if (note.kind === 'problem') {
    Object.assign(entry, { pattern: tags.pattern, topic: tags.topic, difficulty: tags.difficulty, status: tags.status });
    dsa.problems.push(entry);
  } else if (note.kind === 'topic') dsa.topics.push(entry);
  else if (note.kind === 'pattern') dsa.patterns.push(entry);
  else if (note.kind === 'index') dsa.index = entry;
}

// ---------- ground posts ----------
const ground = { posts: [] };
if (existsSync(GROUND_DIR)) {
  for (const name of readdirSync(GROUND_DIR)) {
    if (!name.endsWith('.md')) continue;
    const raw = readFileSync(join(GROUND_DIR, name), 'utf8');
    const parsed = matter(raw);
    const d = parsed.data;
    const dateMatch = name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
    const slug = dateMatch ? dateMatch[4] : slugify(basename(name, '.md'));
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : (d.date ? String(d.date).slice(0, 10) : '');
    let html = md.render(parsed.content).replace(/\/assets\/img\//g, '/ground/img/');
    const cover = (d.cover_image || '').replace(/^\/assets\/img\//, '/ground/img/').replace(/^\//, '');
    ground.posts.push({
      kind: 'post', slug, route: `/blog/ground/${slug}`, title: d.title || titleFromFilename(slug),
      date, category: d.category || '', frequency: d.frequency || '', norad_id: d.norad_id || '',
      experiment_id: d.experiment_id || '', cover, excerpt: d.excerpt || excerptFrom(html),
      keywords: d.keywords || '', html,
    });
  }
  ground.posts.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

// ---------- journal (daily / standalone posts) ----------
const journal = { posts: [] };
if (existsSync(JOURNAL_DIR)) {
  for (const name of readdirSync(JOURNAL_DIR)) {
    if (!name.endsWith('.md')) continue;
    const raw = readFileSync(join(JOURNAL_DIR, name), 'utf8');
    const parsed = matter(raw);
    const d = parsed.data;
    const dateMatch = name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
    const slug = dateMatch ? dateMatch[4] : slugify(basename(name, '.md'));
    const date = dateMatch
      ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`
      : (d.date ? String(d.date).slice(0, 10) : '');
    const html = md.render(transformObsidian(parsed.content));
    journal.posts.push({
      kind: 'post', slug, route: `/blog/journal/${slug}`, title: d.title || titleFromFilename(slug),
      date, series: d.series || '', tags: Array.isArray(d.tags) ? d.tags : [],
      excerpt: d.excerpt || excerptFrom(html), html,
    });
  }
  journal.posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// ---------- write ----------
mkdirSync(OUT_DIR, { recursive: true });
const index = { dsa, ground, journal };
writeFileSync(OUT_JSON, JSON.stringify(index, null, 2));

console.log(
  `content: ${dsa.problems.length} problems, ${dsa.topics.length} topics, ${dsa.patterns.length} patterns, ` +
  `${ground.posts.length} ground posts, ${journal.posts.length} journal posts -> ${OUT_JSON.slice(ROOT.length + 1)}`,
);
