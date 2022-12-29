import { Inject, Injectable } from '@angular/core';
import { TRPC, TRPCClient } from './trpc.service';
import { TrpcCacheRxState } from './TrpcCache';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends TrpcCacheRxState<{
  refreshIsLogged: void;
  refreshMe: void;
}> {
  readonly isLogged$ = this.query(
    () => this.trpc.user.isLogged.query(),
    this.commands.refreshIsLogged$,
    'isLogged',
  );

  readonly me$ = this.query(
    () => this.trpc.user.me.query(),
    this.commands.refreshMe$,
    'me',
  );

  constructor(
    @Inject(TRPC) public readonly trpc: TRPCClient,
    public readonly router: Router,
  ) {
    super();
  }

  logout() {
    return from(this.trpc.user.logout.mutate());
  }
}
