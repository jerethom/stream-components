import { Inject, Injectable } from '@angular/core';
import { Message, User } from '@stream-components/shared';
import { TRPC, TRPCClient } from './trpc.service';
import { Observable } from 'rxjs';
import { TrpcCacheRxState } from './TrpcCache';

@Injectable({
  providedIn: 'root',
})
export class UserService extends TrpcCacheRxState<{
  refreshUser: string;
  refreshUsers: void;
  refreshIsLogged: void;
  refreshLogIn: void;
}> {
  readonly userAdded$: Observable<User> = this.subscription(
    this.trpc.user.onAdded.subscribe,
    void 0
  );

  readonly messageAdded$: Observable<Message> = this.subscription(
    this.trpc.chat.onMessage.subscribe,
    void 0
  );

  readonly isLogged$ = this.query(
    () => this.trpc.user.isLogged.query(),
    this.commands.refreshIsLogged$,
    'isLogged'
  );

  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }
}
