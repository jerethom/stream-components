import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ForModule, PushModule } from '@rx-angular/template';
import { DatePipe } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { bounceInLeftOnEnterAnimation } from 'angular-animations';
import { TrackByService } from '../../../services/track-by.service';
import { Messages } from '@stream-components/shared';
import { TRPC, TRPCClient } from '../../../services/trpc.service';
import { from } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-signin-index-page',
  templateUrl: 'index-page.component.html',
  styles: [
    `
      :host {
        @apply block h-screen p-4;
      }
    `,
  ],
  standalone: true,
  imports: [ForModule, DatePipe, PushModule],
  providers: [RxState],
  animations: [bounceInLeftOnEnterAnimation()],
})
export class IndexPageComponent implements OnInit {
  readonly twitchUri$ = this.state.select('twitchUri');

  readonly messages$ = this.state.select('messages');

  constructor(
    public readonly userService: UserService,
    public readonly trackBy: TrackByService,
    public readonly state: RxState<{
      messages: Messages;
      twitchUri: string;
    }>,
    @Inject(TRPC) public readonly trpc: TRPCClient
  ) {}

  ngOnInit(): void {
    this.state.set({
      messages: [],
    });

    this.state.connect('twitchUri', from(this.trpc.twitch.authUri.query()));

    this.state.hold(this.userService.messageAdded$, (message) => {
      this.state.set('messages', ({ messages }) =>
        [...messages, message].slice(-10)
      );
    });
  }
}
