import { Component, Input } from '@angular/core';

/**
 * The inline SVG banner art for a project, keyed by `artId`. Single source used by
 * both the Home project cards and the Projects star-map detail panel. Renders nothing
 * when the id is unknown/absent (callers show an emoji icon instead).
 */
@Component({
  selector: 'app-project-art',
  imports: [],
  templateUrl: './project-art.html',
  styleUrl: './project-art.scss',
})
export class ProjectArt {
  @Input() artId?: string;
}
