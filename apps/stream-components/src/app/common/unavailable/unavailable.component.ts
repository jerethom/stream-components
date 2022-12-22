import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-unavailable',
  standalone: true,
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
  template: 'coucouc',
})
export class UnavailableComponent {}
