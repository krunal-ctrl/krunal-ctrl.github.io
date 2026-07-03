import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      // Home/About/Projects routes are added in Phase 6.
    ],
  },
  { path: '**', component: NotFound, title: 'Page not found - Krunal Jethva' },
];
