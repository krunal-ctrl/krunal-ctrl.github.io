import { Component, ElementRef, Input, inject } from '@angular/core';
import { animate } from 'motion';
import { BentoTile as BentoTileData } from '../../../data/bento.model';
import { prefersReducedMotion } from '../../util/motion-prefs';
import { SPRING_UI } from '../../util/springs';

@Component({
  selector: 'app-bento-tile',
  imports: [],
  templateUrl: './bento-tile.html',
  styleUrl: './bento-tile.scss',
  host: {
    class: 'bento-item',
    '[class]': '"b-" + tile.id',
    '[class.bento-feature]': 'tile.feature',
    '(pointerenter)': 'onHover(true)',
    '(pointerleave)': 'onHover(false)',
  },
})
export class BentoTile {
  @Input({ required: true }) tile!: BentoTileData;

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;

  onHover(hovering: boolean): void {
    if (prefersReducedMotion()) return;
    animate(this.el, { y: hovering ? -3 : 0 }, SPRING_UI);
  }
}
