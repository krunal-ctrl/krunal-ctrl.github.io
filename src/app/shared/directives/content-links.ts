import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Makes internal links inside rendered blog HTML ([innerHTML]) navigate via the
 * Angular router instead of doing a full page reload. External / hash / new-tab
 * links are left alone.
 */
@Directive({ selector: '[appContentLinks]' })
export class ContentLinks {
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const anchor = (event.target as HTMLElement)?.closest('a');
    if (!anchor || !this.host.nativeElement.contains(anchor)) return;
    const href = anchor.getAttribute('href') ?? '';
    // internal, same-tab links only
    if (href.startsWith('/') && !href.startsWith('//') && !anchor.target) {
      event.preventDefault();
      this.router.navigateByUrl(href);
    }
  }
}
