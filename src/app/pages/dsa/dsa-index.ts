import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Content } from '../../content/content';
import { Doodle } from '../../shared/components/doodle/doodle';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'app-dsa-index',
  imports: [RouterLink, Doodle, Reveal],
  template: `
    <section class="kh">
      <div class="wrap kh-grid kh-solo">
        <div class="kh-copy">
          <a class="post-back" routerLink="/blog">← Blog</a>
          <p class="eyebrow kh-eyebrow">DSA Notes</p>
          <h1 class="kh-title">
            LeetCode, understood.
            <span class="kh-underline"><app-doodle kind="underline" /></span>
          </h1>
          <p class="kh-sub">
            My working notes on data-structures &amp; algorithms — each problem broken down to the
            idea, the code, the complexity, and a hand-drawn sketch. Written to revise from, and to
            think out loud.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap blog-section" style="padding-top: 8px;">
      <div class="section-head reveal" appReveal>
        <p class="eyebrow">Problems</p>
        <h2>Solved &amp; sketched.</h2>
        <span class="head-doodle"><app-doodle kind="underline" /></span>
      </div>
      <ul class="problem-list reveal" appReveal>
        @for (p of content.problems; track p.slug) {
          <li>
            <a [routerLink]="p.route" class="problem-row">
              <span class="p-title">{{ p.title }}</span>
              @if (p.difficulty) {
                <span class="difficulty" [class]="'d-' + p.difficulty.toLowerCase()">{{ p.difficulty }}</span>
              }
              <span class="p-tags">
                @for (t of p.pattern; track t) { <span class="chip chip-sm">{{ t }}</span> }
              </span>
              <span class="p-go" aria-hidden="true">→</span>
            </a>
          </li>
        }
      </ul>
    </section>

    <section class="wrap blog-section" style="padding-top: 40px;">
      <div class="section-head reveal" appReveal>
        <p class="eyebrow">Browse</p>
        <h2>By topic &amp; pattern.</h2>
      </div>
      <div class="taxo reveal" appReveal>
        <div class="taxo-col">
          <h3 class="taxo-title">Topics</h3>
          <div class="chips">
            @for (t of content.topics; track t.slug) {
              <a class="chip" [routerLink]="t.route">{{ t.title }} <span class="chip-count">{{ countTopic(t.slug) }}</span></a>
            }
          </div>
        </div>
        <div class="taxo-col">
          <h3 class="taxo-title">Patterns</h3>
          <div class="chips">
            @for (p of content.patterns; track p.slug) {
              <a class="chip" [routerLink]="p.route">{{ p.title }} <span class="chip-count">{{ countPattern(p.slug) }}</span></a>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class DsaIndex {
  readonly content = inject(Content);
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'DSA & LeetCode notes by Krunal Jethva — problems broken down with code, complexity and sketches.',
    });
  }

  countTopic(slug: string) {
    return this.content.problemsByTopic(slug).length;
  }
  countPattern(slug: string) {
    return this.content.problemsByPattern(slug).length;
  }
}
