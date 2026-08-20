import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { BlogHub } from './pages/blog/blog-hub';
import { JournalIndex } from './pages/blog/journal-index';
import { JournalPost } from './pages/blog/journal-post';
import { DsaIndex } from './pages/dsa/dsa-index';
import { DsaProblem } from './pages/dsa/dsa-problem';
import { DsaTaxonomy } from './pages/dsa/dsa-taxonomy';
import { GroundIndex } from './pages/ground/ground-index';
import { GroundPost } from './pages/ground/ground-post';
import { GroundLive } from './pages/ground/ground-live';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: Home, title: 'Krunal Jethva - .NET & Angular Software Engineer' },
      { path: 'about', component: About, title: 'About - Krunal Jethva' },
      { path: 'projects', component: Projects, title: 'Projects - Krunal Jethva' },

      // Blog hub
      { path: 'blog', component: BlogHub, title: 'Blog - Krunal Jethva' },

      // DSA notes series
      { path: 'blog/dsa', component: DsaIndex, title: 'DSA Notes - Krunal Jethva' },
      { path: 'blog/dsa/topics/:slug', component: DsaTaxonomy, data: { kind: 'topic' } },
      { path: 'blog/dsa/patterns/:slug', component: DsaTaxonomy, data: { kind: 'pattern' } },
      { path: 'blog/dsa/:slug', component: DsaProblem },

      // Ground station series
      { path: 'blog/ground', component: GroundIndex, title: 'KS14NM Ground Station - Krunal Jethva' },
      { path: 'blog/ground/live', component: GroundLive, title: 'Live Telemetry - KS14NM' },
      { path: 'blog/ground/:slug', component: GroundPost },

      // Journal series
      { path: 'blog/journal', component: JournalIndex, title: 'Journal - Krunal Jethva' },
      { path: 'blog/journal/:slug', component: JournalPost },
    ],
  },
  // A concrete path so the static prerenderer can generate it (wildcard routes aren't
  // enumerable for SSG); the build copies its output to browser/404.html for GitHub Pages.
  { path: '404', component: NotFound, title: 'Page not found - Krunal Jethva' },
  { path: '**', component: NotFound, title: 'Page not found - Krunal Jethva' },
];
