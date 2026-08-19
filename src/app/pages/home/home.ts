import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../shared/directives/reveal';
import { StatCounter } from '../../shared/components/stat-counter/stat-counter';
import { ProjectArt } from '../../shared/components/project-art/project-art';
import { Timeline } from '../../shared/components/timeline/timeline';
import { Doodle } from '../../shared/components/doodle/doodle';
import { STATS } from '../../data/stats.data';
import { EXPERIENCE } from '../../data/experience.data';
import { FEATURED_PROJECTS } from '../../data/projects.data';
import { SKILLS } from '../../data/skills.data';
import { SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal, StatCounter, ProjectArt, Timeline, Doodle],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly meta = inject(Meta);

  readonly stats = STATS;
  readonly recentExperience = EXPERIENCE.slice(0, 2);
  readonly featuredProjects = FEATURED_PROJECTS;
  // Tech-specs sheet shows the first few spec rows; the full list lives on /about.
  readonly specs = SKILLS.slice(0, 6);
  readonly links = SITE_LINKS;

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Krunal Jethva is a software engineer building fast, reliable enterprise apps with .NET and Angular.',
    });
    this.meta.updateTag({ property: 'og:title', content: 'Krunal Jethva - .NET & Angular Software Engineer' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Software engineer building fast, reliable enterprise apps with .NET and Angular.',
    });
    this.meta.updateTag({ property: 'og:image', content: 'img/og.png' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  /** Zero-padded index, e.g. 01. */
  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
