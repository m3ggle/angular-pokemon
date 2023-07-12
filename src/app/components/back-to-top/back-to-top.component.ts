import { CommonModule } from '@angular/common';
import { Component, Inject, InjectionToken, inject } from '@angular/core';

export const WINDOW_TOKEN = new InjectionToken<Window>("global window", {
  providedIn: 'root',
  factory: () => window,
})

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackToTopComponent {
  private readonly windowRef = inject(WINDOW_TOKEN);

  public onMoveToTop() {
    this.windowRef.scroll(0, 0);
  }
}
