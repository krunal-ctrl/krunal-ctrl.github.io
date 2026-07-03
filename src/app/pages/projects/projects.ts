import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Reveal } from '../../shared/directives/reveal';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { PROJECTS } from '../../data/projects.data';
import { SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-projects',
  imports: [Reveal, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly meta = inject(Meta);

  readonly projects = PROJECTS;
  readonly links = SITE_LINKS;

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Selected projects by Krunal Jethva - .NET microservices, Angular apps, distributed systems and more.',
    });
  }
}
