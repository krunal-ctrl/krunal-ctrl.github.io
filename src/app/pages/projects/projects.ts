import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Reveal } from '../../shared/directives/reveal';
import { Doodle } from '../../shared/components/doodle/doodle';
import { ProjectArt } from '../../shared/components/project-art/project-art';
import { PROJECTS } from '../../data/projects.data';
import { SITE_LINKS } from '../../data/links.data';

const FLAGSHIP_COUNT = 3;

@Component({
  selector: 'app-projects',
  imports: [Reveal, Doodle, ProjectArt],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly meta = inject(Meta);

  readonly links = SITE_LINKS;

  /** Highest-impact projects, shown as large alternating feature blocks. */
  readonly flagship = PROJECTS.slice(0, FLAGSHIP_COUNT);
  /** The remainder, shown as a compact secondary grid. */
  readonly more = PROJECTS.slice(FLAGSHIP_COUNT);
  /** Absolute starting index of the "more" list, for continuous numbering. */
  readonly moreStart = FLAGSHIP_COUNT;

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Selected projects by Krunal Jethva - .NET microservices, Angular apps, distributed systems and more.',
    });
  }

  /** Zero-padded index, e.g. 01. */
  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
