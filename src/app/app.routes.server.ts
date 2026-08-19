import { RenderMode, ServerRoute } from '@angular/ssr';
import indexData from './content/content.index.json';
import { ContentIndex } from './content/content.model';

const DATA = indexData as unknown as ContentIndex;

/** Feed the static prerenderer the slug lists for the parameterized blog routes. */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'dsa/topics/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.topics.map((t) => ({ slug: t.slug })),
  },
  {
    path: 'dsa/patterns/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.patterns.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'dsa/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.dsa.problems.map((p) => ({ slug: p.slug })),
  },
  {
    path: 'ground/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => DATA.ground.posts.map((p) => ({ slug: p.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
