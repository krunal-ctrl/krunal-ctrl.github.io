import { Component, ElementRef, afterNextRender, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';
import { animate } from 'motion';
import { prefersReducedMotion } from '../../util/motion-prefs';
import { SPRING_UI } from '../../util/springs';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  templateUrl: './brand.html',
  styleUrl: './brand.scss',
})
export class Brand {
  private readonly strokes = viewChildren<ElementRef<SVGPathElement>>('stroke');

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) return;

      this.strokes().forEach((ref, i) => {
        const path = ref.nativeElement;
        const length = path.getTotalLength();
        if (!length) return;
        // Only set the dash pattern; at rest the offset defaults to 0 (fully drawn/visible),
        // so the "K" can never be left hidden if the animation is interrupted or never runs.
        path.style.strokeDasharray = `${length}`;
        animate(path, { strokeDashoffset: [length, 0] }, { ...SPRING_UI, delay: i * 0.08 });
      });
    });
  }
}
