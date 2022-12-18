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
  readonly users = this.userService.users$();

  constructor(
    public readonly userService: UserService,
    public readonly effects: RxEffects
  ) {}

  async ngOnInit() {
    this.effects.register(this.users, () => console.count('users'));
    this.effects.register(this.userService.listenUserAdded$(), () => {
      this.userService.commands.refreshUsers();
    });
  }

  addUser() {
    this.userService.addUser();
  }
}
