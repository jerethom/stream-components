import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ForModule } from '@rx-angular/template';
import { DatePipe } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { TrackByService } from '../../../services/track-by.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-signin-index-page',
  templateUrl: 'index-page.component.html',
  styles: [
    `
      :host {
        @apply block h-screen;
      }
    `,
  ],
  standalone: true,
  imports: [ForModule, DatePipe],
  providers: [RxState],
  animations: [bounceInLeftOnEnterAnimation()],
})
export class IndexPageComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    public readonly trackBy: TrackByService,
    public readonly state: RxState<{
      messages: { message: string; displayName: string }[];
    }>
  ) {}

  ngOnInit(): void {
    this.state.set({
      messages: [],
    });
    this.state.hold(this.userService.messageAdded$, (message) => {
      this.state.set('messages', ({ messages }) =>
        [...messages, message].slice(-10)
      );
    });
  }
}
