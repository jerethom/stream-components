import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { JsonPipe } from '@angular/common';
import { PushModule } from '@rx-angular/template';
import { RxEffects } from '@rx-angular/state/effects';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'stream-components-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
  imports: [JsonPipe, PushModule, ReactiveFormsModule],
  providers: [RxEffects],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly users = this.userService.users$();

  formLogIn = new FormGroup({
    email: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null),
  });

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

  isLogged() {
    firstValueFrom(this.userService.isLogged$());
  }

  handleFormSignIn() {
    const value = this.formLogIn.getRawValue();
    firstValueFrom(
      this.userService.logIn({
        email: value.email as string,
        password: value.password as string,
      })
    );
  }
}
