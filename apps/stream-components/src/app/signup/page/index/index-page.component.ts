import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-signup-index-page',
  templateUrl: 'index-page.component.html',
  standalone: true,
})
export class IndexPageComponent {}
