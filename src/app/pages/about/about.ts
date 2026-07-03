import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../shared/directives/reveal';
import { YearsSincePipe } from '../../shared/pipes/years-since-pipe';
import { CAREER_START_ISO } from '../../data/career';
import { EXPERIENCE } from '../../data/experience.data';
import { SKILLS } from '../../data/skills.data';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Reveal, YearsSincePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly meta = inject(Meta);

  readonly careerStartIso = CAREER_START_ISO;
  readonly experience = EXPERIENCE;
  readonly skills = SKILLS;

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'The story behind Krunal Jethva - a .NET and Angular software engineer who cares about fast, well-architected software.',
    });
  }
}
