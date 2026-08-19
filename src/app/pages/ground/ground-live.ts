import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { Doodle } from '../../shared/components/doodle/doodle';

@Component({
  selector: 'app-ground-live',
  imports: [RouterLink, Doodle],
  template: `
    <section class="kh">
      <div class="wrap kh-grid kh-solo">
        <div class="kh-copy">
          <p class="eyebrow kh-eyebrow">Ground Station · Live</p>
          <h1 class="kh-title">
            Telemetry, live.
            <span class="kh-underline"><app-doodle kind="underline" /></span>
          </h1>
          <p class="kh-sub">
            A real-time view of KS14NM — packets received, satellites heard, signal strength, and
            passes overhead. Wiring it to the TinyGS feed is next on the bench.
          </p>
          <div class="kh-cta">
            <a class="btn btn-ghost" routerLink="/ground">← Back to ground station</a>
          </div>
        </div>
      </div>
    </section>

    <section class="wrap" style="padding-bottom: 72px;">
      <div class="live-console" aria-hidden="true">
        <div class="live-bar">
          <span class="live-dot"></span> LIVE FEED
          <span class="live-soon">coming soon</span>
        </div>
        <div class="live-grid">
          <div class="live-stat"><span class="live-k">Packets today</span><span class="live-v">—</span></div>
          <div class="live-stat"><span class="live-k">Satellites heard</span><span class="live-v">—</span></div>
          <div class="live-stat"><span class="live-k">Best RSSI</span><span class="live-v">— dBm</span></div>
          <div class="live-stat"><span class="live-k">Next pass</span><span class="live-v">—</span></div>
        </div>
        <div class="live-wave"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </div>
    </section>
  `,
})
export class GroundLive {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Live Telemetry · KS14NM Ground Station');
    this.meta.updateTag({ name: 'description', content: 'Live telemetry from the KS14NM TinyGS ground station (coming soon).' });
  }
}
