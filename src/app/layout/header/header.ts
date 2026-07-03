import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Brand } from '../../shared/components/brand/brand';
import { NAV_LINKS, SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Brand],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly navLinks = NAV_LINKS;
  readonly links = SITE_LINKS;

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
