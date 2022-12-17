import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { JsonPipe } from '@angular/common';
import { PushModule } from '@rx-angular/template';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'stream-components-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  imports: [JsonPipe, PushModule],
  providers: [RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly user1 = this.userService.userById$({ id: '1' });

  readonly users = this.userService.users$();
  constructor(
    public readonly userService: UserService,
    public readonly effects: RxEffects
  ) {}

  async ngOnInit() {
    this.effects.register(this.userService.userById$({ id: '1' }), () =>
      console.count('user1')
    );
  }

  manual() {
    this.userService.userById$({ id: '1' }).subscribe(console.log);
  }
}
