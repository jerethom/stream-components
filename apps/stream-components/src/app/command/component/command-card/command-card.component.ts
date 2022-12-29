import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputDirective } from '../../../common/directives/input.directive';

@Component({
  selector: 'sc-command-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: 'command-card.component.html',
  imports: [ReactiveFormsModule, InputDirective],
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
})
export class CommandCardComponent {
  readonly form = new FormGroup({
    content: new FormControl({ value: 'sayHello', disabled: false }, [
      Validators.required,
    ]),
    check: new FormControl({ value: true, disabled: true }),
    locked: new FormControl({ value: false, disabled: false }),
  });
}
