import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.el.classList.add('in');
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.el.classList.add('in');
              this.observer?.unobserve(this.el);
            }
          }
        },
        { threshold: 0.12 },
      );
      this.observer.observe(this.el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
