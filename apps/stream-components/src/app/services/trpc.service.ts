import { InjectionToken, Provider } from '@angular/core';
import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { AppRouter } from '@stream-components/shared';

export const TRPC = new InjectionToken('trpc');

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: 'http://localhost:3000/trpc',
      // fetch(url, options) {
      //   return fetch(url, {
      //     ...options,
      //     credentials: 'include',
      //   });
      // },
    }),
  ],
});

export type TRPCClient = typeof trpc;

export const trpcProvider: Provider = {
  provide: TRPC,
  useValue: trpc,
};
