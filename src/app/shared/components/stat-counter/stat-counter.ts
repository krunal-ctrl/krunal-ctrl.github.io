import { Component, Input, OnDestroy, OnInit, afterNextRender, ElementRef, inject, signal } from '@angular/core';
import { animate } from 'motion';
import { Stat } from '../../../data/stats.model';
import { completedYears } from '../../util/completed-years';
import { prefersReducedMotion } from '../../util/motion-prefs';
import { SPRING_UI } from '../../util/springs';

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
      if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
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
    animate(0, this.target, {
      ...SPRING_UI,
      onUpdate: (latest) => this.displayValue.set(Math.round(latest)),
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
