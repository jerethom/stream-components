import { Inject, Injectable } from '@angular/core';
import { User } from '@stream-components/shared';
import { TRPC, TRPCClient } from './trpc.service';
import { Observable } from 'rxjs';
import { TrpcCacheRxState } from './TrpcCache';
import { QueryArgs, SubscriptionArgs, SubscriptionData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class UserService extends TrpcCacheRxState<{
  refreshUser: string;
  refreshUsers: void;
  refreshIsLogged: void;
  refreshLogIn: void;
}> {
  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }

  listenUserAdded$(
    args: SubscriptionArgs<typeof this.trpc.user.onAdded.subscribe>
  ): Observable<SubscriptionData<typeof this.trpc.user.onAdded.subscribe>> {
    return this.subscription(this.trpc.user.onAdded.subscribe, args);
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
