import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Content } from '../../content/content';
import { ContentLinks } from '../../shared/directives/content-links';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'app-ground-post',
  imports: [RouterLink, ContentLinks, Reveal],
  template: `
    @if (post(); as p) {
      <article class="wrap post">
        <div class="post-head reveal" appReveal>
          <a class="post-back" routerLink="/blog/ground">← Ground station</a>
          @if (p.category) { <p class="eyebrow">{{ p.category }}</p> }
          <h1 class="post-title">{{ p.title }}</h1>
          <div class="meta-card">
            @if (p.frequency) { <div><dt>Frequency</dt><dd>{{ p.frequency }}</dd></div> }
            @if (p.norad_id) { <div><dt>NORAD</dt><dd>{{ p.norad_id }}</dd></div> }
            @if (p.experiment_id) { <div><dt>Experiment</dt><dd>{{ p.experiment_id }}</dd></div> }
            @if (p.date) { <div><dt>Logged</dt><dd>{{ p.date }}</dd></div> }
          </div>
        </div>
        <div class="prose" appContentLinks [innerHTML]="p.html"></div>
      </article>
    } @else {
      <section class="wrap post"><p>Post not found. <a routerLink="/blog/ground">Back to ground station</a>.</p></section>
    }
  `,
})
export class GroundPost {
  private readonly content = inject(Content);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), {
    requireSync: true,
  });
  readonly post = computed(() => this.content.groundPost(this.slug()));

  constructor() {
    effect(() => {
      const p = this.post();
      if (p) {
        this.title.setTitle(`${p.title} · KS14NM Ground Station`);
        this.meta.updateTag({ name: 'description', content: p.excerpt });
      }
    });
  }
}
