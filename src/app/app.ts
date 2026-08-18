import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme } from './shared/services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Injected here (root, common to every route incl. NotFound) purely so the
  // service is instantiated and applies the persisted/system theme on every page,
  // not only on pages that happen to render the theme-toggle button.
  private readonly theme = inject(Theme);
}
