import { RenderMode, ServerRoute } from '@angular/ssr';
import indexData from './content/content.index.json';
import { ContentIndex } from './content/content.model';

const DATA = indexData as unknown as ContentIndex;

/** Feed the static prerenderer the slug lists for the parameterized blog routes. */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/dsa/topics/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.topics.map((t) => ({ slug: t.slug })),
  },
  {
    path: 'blog/dsa/patterns/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.patterns.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'blog/dsa/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.problems.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'blog/ground/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.ground.posts.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'blog/journal/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.journal.posts.map((p) => ({ slug: p.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
