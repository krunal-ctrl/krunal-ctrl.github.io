import { Injectable, afterNextRender, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly mode = signal<ThemeMode>('light');

  constructor() {
    afterNextRender(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
      const initial = stored ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this.apply(initial);
    });
  }

  toggle(): void {
    this.apply(this.mode() === 'dark' ? 'light' : 'dark');
  }

  private apply(mode: ThemeMode): void {
    this.mode.set(mode);
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }
}
