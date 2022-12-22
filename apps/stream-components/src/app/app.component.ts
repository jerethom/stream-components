import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PushModule } from '@rx-angular/template';
import { RxEffects } from '@rx-angular/state/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'sc-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  imports: [JsonPipe, PushModule, ReactiveFormsModule, RouterOutlet],
  providers: [RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
