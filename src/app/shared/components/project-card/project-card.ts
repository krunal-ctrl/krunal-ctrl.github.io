import { Component, ElementRef, Input, inject } from '@angular/core';
import { animate } from 'motion';
import { Project } from '../../../data/projects.model';
import { prefersReducedMotion } from '../../util/motion-prefs';
import { SPRING_UI } from '../../util/springs';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  host: {
    class: 'card',
    '[class.span-2]': 'project.wide',
    '(pointerenter)': 'onHover(true)',
    '(pointerleave)': 'onHover(false)',
  },
})
export class ProjectCard {
  @Input({ required: true }) project!: Project;

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;

  onHover(hovering: boolean): void {
    if (prefersReducedMotion()) return;
    animate(this.el, { y: hovering ? -4 : 0 }, SPRING_UI);
  }
}
