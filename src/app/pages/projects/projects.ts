import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Reveal } from '../../shared/directives/reveal';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-projects',
  imports: [Reveal, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly meta = inject(Meta);

  readonly projects = PROJECTS;

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'Selected projects by Krunal Jethva - .NET microservices, Angular apps, distributed systems and more.',
    });
  }
}
