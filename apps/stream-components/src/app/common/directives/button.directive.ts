import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { RxState } from '@rx-angular/state';

export type ButtonDirectiveType = 'danger' | 'default' | 'primary';

@Directive({
  selector: 'button[scButton], a[scButton]',
  standalone: true,
  providers: [RxState],
})
export class ButtonDirective implements OnInit {
  @HostBinding('class') classes = '';
  @HostBinding('disabled') isDisabled = false;

  readonly #baseClasses = [
    'px-4',
    'py-2',
    'text-sm',
    'rounded-lg',
    'transition',
    'cursor-pointer',
    'border',
    'outline-none',
    'ring',
    'ring-transparent',
    'ring-offset-0',
  ];

  readonly #stateClasses: Record<ButtonDirectiveType, string[]> = {
    danger: [
      'bg-danger',
      'hover:bg-dangerLight',
      'text-white',
      'border-danger',
      'focus:ring-danger',
    ],
    default: [
      'border-slate-700',
      'active:ring-slate-700',
      'active:ring-offset-2',
      'focus:ring-slate-700',
      'focus:ring-offset-1',
    ],
    primary: [
      'border-primary',
      'text-white',
      'bg-primary',
      'active:ring-primary',
      'active:ring-offset-2',
      'focus:ring-primary',
      'focus:ring-offset-1',
    ],
  };

  constructor(
    public readonly state: RxState<{
      type: ButtonDirectiveType;
    }>,
  ) {
    this.state.set({
      type: 'default',
    });
  }

  @Input() set scButtonType(input: ButtonDirectiveType) {
    this.state.set({
      type: input,
    });
  }

  ngOnInit(): void {
    this.state.hold(this.state.select('type'), (type) => {
      this.classes = this.#baseClasses
        .concat(this.#stateClasses[type])
        .join(' ');
    });
  }
}
