import { Component, computed, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Content } from '../../content/content';
import { BLOG_COLLECTIONS } from '../../data/blog.data';
import { Doodle } from '../../shared/components/doodle/doodle';
import { Reveal } from '../../shared/directives/reveal';

interface FeedItem {
  title: string;
  route: string;
  date: string;
  label: string;
}

@Component({
  selector: 'app-blog-hub',
  imports: [RouterLink, Doodle, Reveal],
  template: `
    <section class="kh">
      <div class="wrap kh-grid kh-solo">
        <div class="kh-copy">
          <p class="eyebrow kh-eyebrow">Writing</p>
          <h1 class="kh-title">
            The blog.
            <span class="kh-underline"><app-doodle kind="underline" /></span>
          </h1>
          <p class="kh-sub">
            Where I write things down — algorithms I'm learning, a satellite ground station I'm
            building, and whatever else is worth a note. One place, a few different series.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap blog-section" style="padding-top: 8px;">
      <div class="hub-grid">
        @for (c of collections; track c.id; let i = $index) {
          <a class="hub-card" [class]="'accent-' + c.accent" [appReveal]="i" [routerLink]="c.route">
            <span class="hub-count">{{ count(c.id) }} {{ count(c.id) === 1 ? 'post' : 'posts' }}</span>
            <h2 class="hub-title">{{ c.title }}</h2>
            <p class="hub-tagline">{{ c.tagline }}</p>
            <span class="hub-go">Explore →</span>
          </a>
        }
      </div>
    </section>

    @if (latest().length) {
      <section class="wrap blog-section" style="padding-top: 40px;">
        <div class="section-head reveal" appReveal>
          <p class="eyebrow">Latest</p>
          <h2>Fresh off the bench.</h2>
        </div>
        <ul class="problem-list reveal" appReveal>
          @for (item of latest(); track item.route) {
            <li>
              <a [routerLink]="item.route" class="problem-row">
                <span class="p-title">{{ item.title }}</span>
                <span class="p-tags">
                  <span class="chip chip-sm">{{ item.label }}</span>
                  @if (item.date) { <span class="post-date">{{ item.date }}</span> }
                </span>
                <span class="p-go" aria-hidden="true">→</span>
              </a>
            </li>
          }
        </ul>
      </section>
    }
  `,
})
export class BlogHub {
  private readonly content = inject(Content);
  private readonly meta = inject(Meta);
  readonly collections = BLOG_COLLECTIONS;

  readonly latest = computed<FeedItem[]>(() => {
    const items: FeedItem[] = [
      ...this.content.groundPosts.map((p) => ({ title: p.title, route: p.route, date: p.date, label: 'Ground Station' })),
      ...this.content.journalPosts.map((p) => ({ title: p.title, route: p.route, date: p.date, label: p.series || 'Journal' })),
    ];
    return items.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
  });

  constructor() {
    this.meta.updateTag({
      name: 'description',
      content: "Krunal Jethva's blog — DSA notes, a DIY TinyGS ground station, and a running journal.",
    });
  }

  count(id: string): number {
    if (id === 'dsa') return this.content.problems.length;
    if (id === 'ground') return this.content.groundPosts.length;
    if (id === 'journal') return this.content.journalPosts.length;
    return 0;
  }
}
