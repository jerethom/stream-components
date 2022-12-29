import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'div[scFormInput]',
  standalone: true,
})
export class FormInputDirective {
  @HostBinding('class') classes = 'grid grid-flow-row-dense';
}
