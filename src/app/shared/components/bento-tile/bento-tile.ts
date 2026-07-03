import { Component, Input } from '@angular/core';
import { BentoTile as BentoTileData } from '../../../data/bento.model';

@Component({
  selector: 'app-bento-tile',
  imports: [],
  templateUrl: './bento-tile.html',
  styleUrl: './bento-tile.scss',
  host: {
    class: 'bento-item',
    '[class]': '"b-" + tile.id',
    '[class.bento-feature]': 'tile.feature',
  },
})
export class BentoTile {
  @Input({ required: true }) tile!: BentoTileData;
}
