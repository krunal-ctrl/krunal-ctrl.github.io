import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Content } from '../../content/content';
import { ContentLinks } from '../../shared/directives/content-links';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'app-journal-post',
  imports: [RouterLink, ContentLinks, Reveal],
  template: `
    @if (post(); as p) {
      <article class="wrap post">
        <div class="post-head reveal" appReveal>
          <a class="post-back" routerLink="/blog/journal">← Journal</a>
          <div class="post-meta">
            @if (p.series) { <span class="chip chip-sm">{{ p.series }}</span> }
            @if (p.date) { <span class="post-date">{{ p.date }}</span> }
          </div>
          <h1 class="post-title">{{ p.title }}</h1>
        </div>
        <div class="prose" appContentLinks [innerHTML]="p.html"></div>
      </article>
    } @else {
      <section class="wrap post"><p>Entry not found. <a routerLink="/blog/journal">Back to journal</a>.</p></section>
    }
  `,
})
export class JournalPost {
  private readonly content = inject(Content);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    requireSync: true,
  });
  readonly post = computed(() => this.content.journalPost(this.slug()));

  constructor() {
    effect(() => {
      const p = this.post();
      if (p) {
        this.title.setTitle(`${p.title} · Journal - Krunal Jethva`);
        this.meta.updateTag({ name: 'description', content: p.excerpt });
      }
    });
  }
}
