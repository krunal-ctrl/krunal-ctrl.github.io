import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Content } from '../../content/content';
import { Doodle } from '../../shared/components/doodle/doodle';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'app-ground-index',
  imports: [RouterLink, Doodle, Reveal],
  template: `
    <section class="kh">
      <div class="wrap kh-grid kh-solo">
        <div class="kh-copy">
          <a class="post-back" routerLink="/blog">← Blog</a>
          <p class="eyebrow kh-eyebrow">Ground Station · KS14NM</p>
          <h1 class="kh-title">
            Listening to space.
            <span class="kh-underline"><app-doodle kind="underline" /></span>
          </h1>
          <p class="kh-sub">
            A DIY TinyGS satellite ground station — receiving LoRa telemetry from orbit. Build logs,
            RF notes, and (soon) a live view of what my antenna is hearing.
          </p>
          <div class="kh-cta">
            <a class="btn btn-primary" routerLink="/blog/ground/live">Live telemetry →</a>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap blog-section" style="padding-top: 8px;">
      <div class="section-head reveal" appReveal>
        <p class="eyebrow">Log</p>
        <h2>Build notes &amp; explainers.</h2>
        <span class="head-doodle"><app-doodle kind="underline" /></span>
      </div>
      <div class="post-grid">
        @for (p of content.groundPosts; track p.slug; let i = $index) {
          <a class="post-card reveal" [appReveal]="i" [routerLink]="p.route">
            @if (p.cover) {
              <span class="post-card-cover"><img [src]="p.cover" [alt]="p.title" loading="lazy" /></span>
            }
            <span class="post-card-body">
              @if (p.category) { <span class="eyebrow">{{ p.category }}</span> }
              <span class="post-card-title">{{ p.title }}</span>
              <span class="post-card-excerpt">{{ p.excerpt }}</span>
              <span class="post-card-meta">
                @if (p.frequency) { <span class="chip chip-sm chip-rf">{{ p.frequency }}</span> }
                @if (p.date) { <span class="post-date">{{ p.date }}</span> }
              </span>
            </span>
          </a>
        }
      </div>
    </section>
  `,
})
export class GroundIndex {
  readonly content = inject(Content);
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: 'KS14NM — a DIY TinyGS satellite ground station by Krunal Jethva: build logs, RF notes, and live telemetry.',
    });
  }
}
