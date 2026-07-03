import { Component, Input, OnDestroy, OnInit, afterNextRender, ElementRef, inject, signal } from '@angular/core';
import { Stat } from '../../../data/stats.model';
import { completedYears } from '../../util/completed-years';

@Component({
  selector: 'app-stat-counter',
  imports: [],
  templateUrl: './stat-counter.html',
  styleUrl: './stat-counter.scss',
  host: { class: 'stat' },
})
export class StatCounter implements OnInit, OnDestroy {
  @Input({ required: true }) stat!: Stat;

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;
  private animated = false;
  private target = 0;

  // Initialized to the correct final value in ngOnInit (runs during SSR too), so
  // prerendered/no-JS output is always right - the count-up is a browser-only enhancement.
  displayValue = signal(0);

  ngOnInit(): void {
    this.target = this.stat.since != null ? completedYears(this.stat.since) : (this.stat.count ?? 0);
    this.displayValue.set(this.target);
  }

  constructor() {
    afterNextRender(() => {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || !('IntersectionObserver' in window)) {
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate();
              this.observer?.unobserve(this.el);
            }
          }
        },
        { threshold: 0.12 },
      );
      this.observer.observe(this.el);
    });
  }

  private animate(): void {
    if (this.animated) return;
    this.animated = true;

    this.displayValue.set(0);
    const duration = 1100;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValue.set(Math.round(eased * this.target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
