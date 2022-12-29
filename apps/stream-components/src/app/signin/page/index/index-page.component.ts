import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-signin-index-page',
  templateUrl: 'index-page.component.html',
  styles: [
    `
      :host {
        @apply block h-screen p-4 flex items-center justify-center bg-slate-100;
      }
    `,
  ],
  standalone: true,
  imports: [NgIf],
  providers: [],
  animations: [],
})
export class IndexPageComponent {
  readonly errorCode =
    this.activatedRoute.snapshot.queryParamMap.get('errorCode');
  readonly errorMessageFr =
    this.activatedRoute.snapshot.queryParamMap.get('errorMessageFr');

  constructor(public readonly activatedRoute: ActivatedRoute) {}
}
