import { Component, Input } from '@angular/core';
import { Experience } from '../../../data/experience.model';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-timeline',
  imports: [Reveal],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline {
  @Input({ required: true }) experience!: Experience[];
  /** Home's teaser timeline shows briefBullets (or the first 2 bullets); About shows every bullet. */
  @Input() brief = false;

  bulletsFor(exp: Experience): string[] {
    return this.brief ? exp.briefBullets ?? exp.bullets.slice(0, 2) : exp.bullets;
  }
}
