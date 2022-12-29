import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-dashboard-layout',
  templateUrl: 'dashboard-layout.component.html',
  standalone: true,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
  imports: [RouterOutlet],
})
export class DashboardLayoutComponent {}
