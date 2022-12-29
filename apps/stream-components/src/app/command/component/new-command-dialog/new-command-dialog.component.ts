import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { InputDirective } from '../../../common/directives/input.directive';
import { FormInputDirective } from '../../../common/directives/form-input.directive';

export type NewCommandDialogComponentData = {
  content: string;
};

@Component({
  selector: 'sc-new-command-dialog',
  standalone: true,
  templateUrl: 'new-command-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        @apply block p-4 bg-white rounded-lg min-w-[15rem];
      }
    `,
  ],
  imports: [InputDirective, FormInputDirective],
})
export class NewCommandDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public readonly data: NewCommandDialogComponentData,
  ) {}
}
