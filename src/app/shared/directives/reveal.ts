import { Directive, ElementRef, Input, OnDestroy, afterNextRender, inject } from '@angular/core';
import { animate } from 'motion';
import { prefersReducedMotion } from '../util/motion-prefs';
import { SPRING_UI } from '../util/springs';

/** Seconds between sibling reveals when a stagger index is bound, e.g. `[appReveal]="i"`. */
const STAGGER_STEP = 0.06;

@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnDestroy {
  /** Optional stagger index for grids of reveals (bento tiles, project cards, stats). */
  @Input() appReveal: number | string = '';

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.show();
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.show();
              this.observer?.unobserve(this.el);
            }
          }
        },
        { threshold: 0.12 },
      );
      this.observer.observe(this.el);
    });
  }

  private show(): void {
    // Kept as a CSS hook independent of the animation engine (e.g. stat-counter's underline).
    this.el.classList.add('in');

    if (prefersReducedMotion()) {
      this.el.style.opacity = '1';
      this.el.style.transform = 'none';
      return;
    }

    const index = Math.max(0, Number(this.appReveal) || 0);
    animate(this.el, { opacity: 1, y: 0 }, { ...SPRING_UI, delay: index * STAGGER_STEP });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
