import { Inject, Injectable } from '@angular/core';
import { TRPC, TRPCClient } from './trpc.service';
import { Observable } from 'rxjs';
import { Message } from '@stream-components/shared';
import { TrpcCacheRxState } from './TrpcCache';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends TrpcCacheRxState {
  readonly messageAdded$: Observable<Message> = this.subscription(
    this.trpc.chat.onMessage.subscribe,
    void 0
  );

  constructor(@Inject(TRPC) public readonly trpc: TRPCClient) {
    super();
  }
}
