import {
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { animate } from 'motion';
import { Brand } from '../../shared/components/brand/brand';
import { NAV_LINKS, SITE_LINKS } from '../../data/links.data';
import { Theme } from '../../shared/services/theme';
import { prefersReducedMotion } from '../../shared/util/motion-prefs';
import { SPRING_UI } from '../../shared/util/springs';

const MOBILE_BREAKPOINT = 600;

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Brand],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly navLinks = NAV_LINKS;
  readonly links = SITE_LINKS;
  readonly theme = inject(Theme);

  readonly menuOpen = signal(false);

  private readonly navList = viewChild<ElementRef<HTMLUListElement>>('navList');
  private readonly navPanel = viewChild<ElementRef<HTMLDivElement>>('navPanel');
  private readonly indicator = viewChild<ElementRef<HTMLSpanElement>>('indicator');

  constructor() {
    const router = inject(Router);
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      this.syncPanelToViewport();
      this.moveIndicator();

      const onResize = () => this.syncPanelToViewport();
      window.addEventListener('resize', onResize);

      const sub = router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // wait for routerLinkActive to update the DOM before measuring
          requestAnimationFrame(() => requestAnimationFrame(() => zone.run(() => this.moveIndicator())));
        }
      });

      destroyRef.onDestroy(() => {
        window.removeEventListener('resize', onResize);
        sub.unsubscribe();
      });
    });
  }

  toggleMenu(): void {
    const opening = !this.menuOpen();
    this.menuOpen.set(opening);
    if (!this.isMobile()) return;

    const panel = this.navPanel()?.nativeElement;
    if (!panel) return;

    if (prefersReducedMotion()) {
      panel.style.opacity = opening ? '1' : '0';
      panel.style.transform = opening ? 'scale(1)' : 'scale(0.95)';
    } else {
      animate(panel, { opacity: opening ? 1 : 0, scale: opening ? 1 : 0.95 }, SPRING_UI);
    }
    panel.style.pointerEvents = opening ? 'auto' : 'none';
  }

  closeMenu(): void {
    if (this.menuOpen()) this.toggleMenu();
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  private isMobile(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;
  }

  private syncPanelToViewport(): void {
    const panel = this.navPanel()?.nativeElement;
    if (!panel) return;

    if (!this.isMobile()) {
      panel.style.opacity = '';
      panel.style.transform = '';
      panel.style.pointerEvents = '';
      return;
    }

    const open = this.menuOpen();
    panel.style.opacity = open ? '1' : '0';
    panel.style.transform = open ? 'scale(1)' : 'scale(0.95)';
    panel.style.pointerEvents = open ? 'auto' : 'none';
  }

  private moveIndicator(): void {
    const list = this.navList()?.nativeElement;
    const bar = this.indicator()?.nativeElement;
    if (!list || !bar) return;

    const active = list.querySelector<HTMLAnchorElement>('a.active');
    if (!active) {
      bar.style.opacity = '0';
      return;
    }

    const listBox = list.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    const x = activeBox.left - listBox.left;
    const width = activeBox.width;

    if (prefersReducedMotion()) {
      bar.style.transform = `translateX(${x}px)`;
      bar.style.width = `${width}px`;
      bar.style.opacity = '1';
      return;
    }
    animate(bar, { x, width, opacity: 1 }, SPRING_UI);
  }
}
