import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Content } from '../../content/content';
import { ContentLinks } from '../../shared/directives/content-links';
import { Reveal } from '../../shared/directives/reveal';

/** Renders a Topic or Pattern note plus the problems tagged with it. `kind` comes from route data. */
@Component({
  selector: 'app-dsa-taxonomy',
  imports: [RouterLink, ContentLinks, Reveal],
  template: `
    @if (note(); as n) {
      <article class="wrap post">
        <div class="post-head reveal" appReveal>
          <a class="post-back" routerLink="/dsa">← DSA notes</a>
          <p class="eyebrow">{{ kind() === 'topic' ? 'Topic' : 'Pattern' }}</p>
          <h1 class="post-title">{{ n.title }}</h1>
        </div>
        <div class="prose" appContentLinks [innerHTML]="n.html"></div>
        <div class="related reveal" appReveal>
          <h2>Problems</h2>
          @if (related().length) {
            <ul class="problem-list">
              @for (p of related(); track p.slug) {
                <li>
                  <a [routerLink]="p.route" class="problem-row">
                    <span class="p-title">{{ p.title }}</span>
                    @if (p.difficulty) {
                      <span class="difficulty" [class]="'d-' + p.difficulty.toLowerCase()">{{ p.difficulty }}</span>
                    }
                    <span class="p-go" aria-hidden="true">→</span>
                  </a>
                </li>
              }
            </ul>
          } @else {
            <p class="muted">No problems tagged with this yet.</p>
          }
        </div>
      </article>
    } @else {
      <section class="wrap post"><p>Not found. <a routerLink="/dsa">Back to DSA notes</a>.</p></section>
    }
  `,
})
export class DsaTaxonomy {
  private readonly content = inject(Content);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly kind = toSignal(this.route.data.pipe(map((d) => d['kind'] as 'topic' | 'pattern')), {
    requireSync: true,
  });
  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    requireSync: true,
  });

  readonly note = computed(() =>
    this.kind() === 'topic' ? this.content.topic(this.slug()) : this.content.pattern(this.slug()),
  );
  readonly related = computed(() =>
    this.kind() === 'topic'
      ? this.content.problemsByTopic(this.slug())
      : this.content.problemsByPattern(this.slug()),
  );

  constructor() {
    effect(() => {
      const n = this.note();
      if (n) {
        this.title.setTitle(`${n.title} · DSA Notes - Krunal Jethva`);
        this.meta.updateTag({ name: 'description', content: n.excerpt });
      }
    });
  }
}
