import { Inject, Injectable } from '@angular/core';
import { User } from '@stream-components/shared';
import { TRPC, TRPCClient } from './trpc.service';
import { Observable } from 'rxjs';
import { TrpcCacheRxState } from './TrpcCache';

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

  userById$({
    id,
  }: Parameters<typeof this.trpc.user.getById.query>[0]): Observable<
    User | undefined
  > {
    return this.cachify(
      (id) => this.trpc.user.getById.query({ id: id as string }),
      this.commands.refreshUser$,
      id
    );
  }

  users$() {
    return this.cachify(
      () => this.trpc.user.getAll.query(),
      this.commands.refreshUsers$,
      'users'
    );
  }
}
