import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
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

      // DSA notes
      { path: 'dsa', component: DsaIndex, title: 'DSA Notes - Krunal Jethva' },
      { path: 'dsa/topics/:slug', component: DsaTaxonomy, data: { kind: 'topic' } },
      { path: 'dsa/patterns/:slug', component: DsaTaxonomy, data: { kind: 'pattern' } },
      { path: 'dsa/:slug', component: DsaProblem },

      // Ground station
      { path: 'ground', component: GroundIndex, title: 'KS14NM Ground Station - Krunal Jethva' },
      { path: 'ground/live', component: GroundLive, title: 'Live Telemetry - KS14NM' },
      { path: 'ground/:slug', component: GroundPost },
    ],
  },
  // A concrete path so the static prerenderer can generate it (wildcard routes aren't
  // enumerable for SSG); the build copies its output to browser/404.html for GitHub Pages.
  { path: '404', component: NotFound, title: 'Page not found - Krunal Jethva' },
  { path: '**', component: NotFound, title: 'Page not found - Krunal Jethva' },
];
