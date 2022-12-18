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
}> {
  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }

  listenUserAdded$(
    args: SubscriptionArgs<typeof this.trpc.user.onAddUser.subscribe>
  ): Observable<SubscriptionData<typeof this.trpc.user.onAddUser.subscribe>> {
    return this.subscription(this.trpc.user.onAddUser.subscribe, args);
  }

  userById$({
    id,
  }: QueryArgs<typeof this.trpc.user.getById.query>): Observable<
    User | undefined
  > {
    return this.cachify(
      (id) => this.trpc.user.getById.query({ id: id as string }),
      this.commands.refreshUser$,
      id
    );
  }

  users$(): Observable<User[]> {
    return this.cachify(
      () => this.trpc.user.getAll.query(),
      this.commands.refreshUsers$,
      'users'
    );
  }

  addUser(): void {
    this.trpc.user.addUser.mutate();
  }
}
