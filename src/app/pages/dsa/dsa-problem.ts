import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Content } from '../../content/content';
import { ContentLinks } from '../../shared/directives/content-links';
import { Reveal } from '../../shared/directives/reveal';
import { slugify } from '../../shared/util/slug';

@Component({
  selector: 'app-dsa-problem',
  imports: [RouterLink, ContentLinks, Reveal],
  template: `
    @if (problem(); as p) {
      <article class="wrap post">
        <div class="post-head reveal" appReveal>
          <a class="post-back" routerLink="/dsa">← DSA notes</a>
          <h1 class="post-title">{{ p.title }}</h1>
          <div class="post-meta">
            @if (p.difficulty) {
              <span class="difficulty" [class]="'d-' + p.difficulty.toLowerCase()">{{ p.difficulty }}</span>
            }
            @for (t of p.pattern; track t) { <a class="chip" [routerLink]="patternRoute(t)">{{ t }}</a> }
            @for (t of p.topic; track t) { <a class="chip chip-topic" [routerLink]="topicRoute(t)">{{ t }}</a> }
          </div>
        </div>
        <div class="prose" appContentLinks [innerHTML]="p.html"></div>
      </article>
    } @else {
      <section class="wrap post">
        <p>Problem not found. <a routerLink="/dsa">Back to DSA notes</a>.</p>
      </section>
    }
  `,
})
export class DsaProblem {
  private readonly content = inject(Content);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    requireSync: true,
  });
  readonly problem = computed(() => this.content.problem(this.slug()));

  constructor() {
    effect(() => {
      const p = this.problem();
      if (p) {
        this.title.setTitle(`${p.title} · DSA Notes - Krunal Jethva`);
        this.meta.updateTag({ name: 'description', content: p.excerpt });
      }
    });
  }

  patternRoute(name: string) {
    return `/dsa/patterns/${slugify(name)}`;
  }
  topicRoute(name: string) {
    return `/dsa/topics/${slugify(name)}`;
  }
}
