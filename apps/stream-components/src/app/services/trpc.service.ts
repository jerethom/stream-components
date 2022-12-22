import { InjectionToken, Provider } from '@angular/core';
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from '@trpc/client';
import { AppRouter } from '@stream-components/shared';
import { environment } from '../../environments/environment';

export const TRPC = new InjectionToken('trpc');

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: createWSClient({
          url: `ws://localhost:4200/api/subscriptions`,
        }),
      }),
      false: httpLink({
        url: environment.api.trpc,
        fetch(url, option) {
          return fetch(url, {
            ...option,
            credentials: 'include',
          });
        },
      }),
    }),
  ],
});

export type TRPCClient = typeof trpc;

export const trpcProvider: Provider = {
  provide: TRPC,
  useValue: trpc,
};
