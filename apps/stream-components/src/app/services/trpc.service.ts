import { InjectionToken, Provider } from '@angular/core';
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { AppRouter } from '@stream-components/shared';

export const TRPC = new InjectionToken('trpc');

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: createWSClient({
          url: `ws://localhost:3000`,
        }),
      }),
      false: httpLink({
        url: 'http://localhost:3000/trpc',
      }),
    }),
  ],
});

export type TRPCClient = typeof trpc;

export const trpcProvider: Provider = {
  provide: TRPC,
  useValue: trpc,
};
