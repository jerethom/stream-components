import { Inject, Injectable } from '@angular/core';
import { User } from '@stream-components/shared';
import { TRPC, TRPCClient } from './trpc.service';
import { Observable } from 'rxjs';
import { TrpcCacheRxState } from './TrpcCache';
import { QueryArgs } from '../../types';

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

  readonly messageAdded$: Observable<{ message: string; displayName: string }> =
    this.subscription(this.trpc.chat.onMessage.subscribe, void 0);

  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }

  isLogged$() {
    return this.query(
      () => this.trpc.user.isLogged.query(),
      this.commands.refreshIsLogged$,
      'isLogged'
    );
  }

  userById$(
    args: QueryArgs<typeof this.trpc.user.getById.query>
  ): Observable<User | undefined> {
    return this.query(
      (id) => this.trpc.user.getById.query({ id: id ?? args.id }),
      this.commands.refreshUser$,
      args.id
    );
  }

  users$(): Observable<User[]> {
    return this.query(
      () => this.trpc.user.getAll.query(),
      this.commands.refreshUsers$,
      'users'
    );
  }

  addUser(): void {
    this.trpc.user.add.mutate();
  }

  logIn(args: QueryArgs<typeof this.trpc.user.logIn.query>) {
    return this.query(
      () => this.trpc.user.logIn.query(args),
      this.commands.refreshLogIn$,
      'logIn'
    );
  }
}
