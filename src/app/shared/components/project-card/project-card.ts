import { Component, Input } from '@angular/core';
import { Project } from '../../../data/projects.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    class: 'card',
    '[class.span-2]': 'project.wide',
  },
})
export class ProjectCard {
  @Input({ required: true }) project!: Project;
}
