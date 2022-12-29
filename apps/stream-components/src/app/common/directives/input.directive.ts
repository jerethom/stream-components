import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { NgControl } from '@angular/forms';
import { distinctUntilKeyChanged, map, startWith } from 'rxjs';

export type InputDirectiveState = 'error' | 'default' | 'disabled';

export type InputDirectiveType = 'text' | 'checkbox';

@Directive({
  selector: 'input[scInput]',
  standalone: true,
  providers: [RxState],
})
export class InputDirective implements OnInit {
  @HostBinding('class') classes = '';

  @HostBinding('disabled') isDisabled = false;

  @Output() scInputStateChange = this.state.$.pipe(
    distinctUntilKeyChanged('state'),
    map(({ state }) => state),
  );

  readonly #baseClasses: Record<InputDirectiveType, string[]> = {
    text: [
      'px-3',
      'py-2',
      'text-sm',
      'rounded-lg',
      'transition',
      'border',
      'outline-none',
      'ring',
      'ring-transparent',
      'ring-offset-0',
    ],
    checkbox: [
      'appearance-none',
      'h-4',
      'w-4',
      'border',
      'border-gray-300',
      'rounded',
      'transition',
      'bg-no-repeat',
      'bg-center',
      'bg-contain',
      'outline-none',
      'ring',
      'ring-transparent',
      'ring-offset-0',
      "checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+CjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMiIGQ9Ik02IDEwbDMgM2w2LTYiLz4KPC9zdmc+')]",
    ],
  };

  #stateClasses: Record<
    InputDirectiveType,
    Record<InputDirectiveState, string[]>
  > = {
    text: {
      error: [
        'border-danger',
        'text-danger',
        'focus:border-transparent',
        'focus:ring-danger',
        'focus:ring-offset-1',
      ],
      default: [
        'border-slate-700',
        'focus:border-transparent',
        'focus:ring-slate-700',
        'focus:ring-offset-1',
      ],
      disabled: [
        'border-slate-300',
        'cursor-not-allowed',
        'text-slate-400',
        'bg-slate-100',
      ],
    },
    checkbox: {
      disabled: [
        'bg-slate-300',
        'checked:bg-slate-300',
        'checked:border-slate-300',
        'cursor-not-allowed',
        'focus:ring-slate-300',
        'focus:ring-offset-1',
      ],
      default: [
        'bg-white',
        'checked:bg-primary',
        'checked:border-primary',
        'cursor-pointer',
        'focus:ring-slate-700',
        'focus:ring-offset-1',
        'focus:checked:ring-primary',
      ],
      error: [],
    },
  };

  constructor(
    public readonly el: ElementRef<HTMLInputElement>,
    public readonly state: RxState<{
      state: InputDirectiveState;
      type: InputDirectiveType;
      isDisabled: boolean;
    }>,
    @Optional() public readonly ngControl?: NgControl,
  ) {
    this.state.set({
      state: 'default',
      type: (this.el.nativeElement.getAttribute('type') ??
        'text') as InputDirectiveType,
    });
  }

  @Input() set scInputState(input: InputDirectiveState) {
    this.state.set({
      state: input,
    });
  }

  ngOnInit(): void {
    this.state.hold(
      this.state.select(selectSlice(['state', 'type'])),
      ({ type, state }) => {
        this.classes = this.#baseClasses[type]
          .concat(this.#stateClasses[type][state])
          .join(' ');

        this.isDisabled = state === 'disabled';
      },
    );

    if (this.ngControl && this.ngControl.statusChanges) {
      this.state.hold(
        this.ngControl.statusChanges.pipe(startWith(this.ngControl.status)),
        (status: 'VALID' | 'INVALID' | 'DISABLED') => {
          switch (status) {
            case 'DISABLED':
              this.state.set({
                state: 'disabled',
              });
              break;
            case 'VALID':
              this.state.set({
                state: 'default',
              });
              break;
            case 'INVALID':
              this.state.set({
                state: 'error',
              });
              break;
          }
        },
      );
    }
  }
}
