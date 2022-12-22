import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ForModule } from '@rx-angular/template';
import { JsonPipe } from '@angular/common';
import { RxState } from '@rx-angular/state';
import { User } from '@stream-components/shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sc-signin-index-page',
  templateUrl: 'index-page.component.html',
  styles: [
    `
      :host {
        @apply block;
      }
    `,
  ],
  standalone: true,
  imports: [ForModule, JsonPipe],
  providers: [RxState],
})
export class IndexPageComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    public readonly state: RxState<{ users: User[] }>
  ) {}

  ngOnInit(): void {
    this.state.set({
      users: [],
    });
    this.state.hold(this.userService.userAdded$, (user) => {
      this.state.set('users', ({ users }) => [...users, user]);
    });
  }

  addUser() {
    this.userService.addUser();
  }
}
