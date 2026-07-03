import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../shared/components/brand/brand';
import { NAV_LINKS, SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Brand],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {
  readonly navLinks = NAV_LINKS;
  readonly links = SITE_LINKS;

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
