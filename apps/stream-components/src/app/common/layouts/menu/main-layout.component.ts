import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LetModule } from '@rx-angular/template';
import { filter, firstValueFrom } from 'rxjs';
import { RxEffects } from '@rx-angular/state/effects';

@Component({
  selector: 'sc-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  styles: [
    `
      :host {
        @apply grid grid-cols-1 grid-rows-[auto,1fr] h-full;
      }
    `,
  ],
  templateUrl: 'main-layout.component.html',
  imports: [RouterOutlet, LetModule, RouterLinkActive, RouterLink],
  providers: [RxEffects],
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    public readonly rxEffects: RxEffects,
    public readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.rxEffects.register(
      this.userService.isLogged$.pipe(filter((isLogged) => !isLogged)),
      () => {
        console.log('navigate');
        this.router.navigate(['/signin']);
      },
    );
  }

  async logout() {
    await firstValueFrom(this.userService.logout());
    this.userService.commands.refreshIsLogged();
  }
}
