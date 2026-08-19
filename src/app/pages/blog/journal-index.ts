import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Content } from '../../content/content';
import { Doodle } from '../../shared/components/doodle/doodle';
import { Reveal } from '../../shared/directives/reveal';

@Component({
  selector: 'app-journal-index',
  imports: [RouterLink, Doodle, Reveal],
  template: `
    <section class="kh">
      <div class="wrap kh-grid kh-solo">
        <div class="kh-copy">
          <a class="post-back" routerLink="/blog">← Blog</a>
          <p class="eyebrow kh-eyebrow">Journal</p>
          <h1 class="kh-title">
            Journal.
            <span class="kh-underline"><app-doodle kind="underline" /></span>
          </h1>
          <p class="kh-sub">
            Daily notes, half-formed ideas, and the occasional one-off — related to the other series
            or not. Written mostly to think out loud.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap blog-section" style="padding-top: 8px;">
      @if (content.journalPosts.length) {
        <ul class="problem-list reveal" appReveal>
          @for (p of content.journalPosts; track p.slug) {
            <li>
              <a [routerLink]="p.route" class="problem-row">
                <span class="p-title">{{ p.title }}</span>
                <span class="p-tags">
                  @if (p.series) { <span class="chip chip-sm">{{ p.series }}</span> }
                  @if (p.date) { <span class="post-date">{{ p.date }}</span> }
                </span>
                <span class="p-go" aria-hidden="true">→</span>
              </a>
            </li>
          }
        </ul>
      } @else {
        <div class="empty-state reveal" appReveal>
          <p class="empty-emoji" aria-hidden="true">🛰️</p>
          <p>No entries yet — the first one is on its way.</p>
        </div>
      }
    </section>
  `,
})
export class JournalIndex {
  readonly content = inject(Content);
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({ name: 'description', content: "Krunal Jethva's journal — daily notes and one-off posts." });
  }
}
