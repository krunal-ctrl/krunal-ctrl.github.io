import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../shared/directives/reveal';
import { YearsSincePipe } from '../../shared/pipes/years-since-pipe';
import { StatCounter } from '../../shared/components/stat-counter/stat-counter';
import { BentoTile } from '../../shared/components/bento-tile/bento-tile';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { CAREER_START_ISO } from '../../data/career';
import { STATS } from '../../data/stats.data';
import { BENTO_TILES } from '../../data/bento.data';
import { EXPERIENCE } from '../../data/experience.data';
import { FEATURED_PROJECTS } from '../../data/projects.data';
import { SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal, YearsSincePipe, StatCounter, BentoTile, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly meta = inject(Meta);

  readonly careerStartIso = CAREER_START_ISO;
  readonly stats = STATS;
  readonly bentoTiles = BENTO_TILES;
  readonly recentExperience = EXPERIENCE.slice(0, 2);
  readonly featuredProjects = FEATURED_PROJECTS;
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
}
