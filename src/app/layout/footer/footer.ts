import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../shared/components/brand/brand';
import { NAV_LINKS, SITE_LINKS } from '../../data/links.data';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Brand],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  readonly navLinks = NAV_LINKS;
  readonly links = SITE_LINKS;
}
