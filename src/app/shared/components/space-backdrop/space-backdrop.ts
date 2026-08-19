import { Component } from '@angular/core';

/**
 * A subtle, static space field painted behind the whole app — scattered stars,
 * a couple of ringed planets, an orbit, a rocket and a small constellation.
 * Purely decorative (aria-hidden), pointer-events: none, theme-aware via --ink.
 */
@Component({
  selector: 'app-space-backdrop',
  templateUrl: './space-backdrop.html',
  styleUrl: './space-backdrop.scss',
  host: { 'aria-hidden': 'true' },
})
export class SpaceBackdrop {}
