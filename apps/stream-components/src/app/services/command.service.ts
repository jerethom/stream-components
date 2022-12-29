import { Inject, Injectable } from '@angular/core';
import { TrpcCacheRxState } from './TrpcCache';
import { TRPC, TRPCClient } from './trpc.service';

@Injectable({
  providedIn: 'root',
})
export class CommandService extends TrpcCacheRxState<{
  refreshCommands: void;
}> {
  readonly commands$ = this.query(
    () => this.trpc.command.getAll.query(),
    this.commands.refreshCommands$,
    'commands',
  );

  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }
}
