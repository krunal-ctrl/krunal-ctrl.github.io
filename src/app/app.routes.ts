import { Routes } from '@angular/router';
import { Shell } from './layout/shell/shell';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Projects } from './pages/projects/projects';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', component: Home, title: 'Krunal Jethva - .NET & Angular Software Engineer' },
      { path: 'about', component: About, title: 'About - Krunal Jethva' },
      { path: 'projects', component: Projects, title: 'Projects - Krunal Jethva' },
    ],
  },
  { path: '**', component: NotFound, title: 'Page not found - Krunal Jethva' },
];
