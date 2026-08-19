import { Component, ElementRef, afterNextRender, inject, input, viewChildren } from '@angular/core';
import { animate } from 'motion';
import { prefersReducedMotion } from '../../util/motion-prefs';
import { SPRING_UI } from '../../util/springs';

export type DoodleKind = 'underline' | 'arrow' | 'sparkle' | 'circle' | 'squiggle';

/**
 * A hand-drawn accent that draws itself in the first time it scrolls into view.
 * SSR-safe: the draw-in only runs in the browser and its resting state is fully
 * visible, so the stroke can never be stranded hidden (same lesson as Brand's "K").
 */
@Component({
  selector: 'app-doodle',
  templateUrl: './doodle.html',
  styleUrl: './doodle.scss',
})
export class Doodle {
  readonly kind = input<DoodleKind>('underline');

  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly strokes = viewChildren<ElementRef<SVGPathElement>>('stroke');

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) return;
      const strokes = this.strokes();
      if (!strokes.length) return;

      // Only set the dash pattern; at rest the offset stays 0 (fully drawn/visible),
      // so a doodle can never be stranded hidden if the animation is skipped. The
      // draw-in animates the offset length -> 0 on first scroll into view.
      const prepared = strokes.map((ref) => {
        const path = ref.nativeElement;
        const length = path.getTotalLength();
        if (length) path.style.strokeDasharray = `${length}`;
        return { path, length };
      });

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.disconnect();
            prepared.forEach(({ path, length }, i) => {
              if (!length) return;
              animate(path, { strokeDashoffset: [length, 0] }, { ...SPRING_UI, delay: 0.08 + i * 0.14 });
            });
          }
        },
        { threshold: 0.2 },
      );
      io.observe(this.host.nativeElement);
    });
  }
}
