import { InjectionToken, Provider } from '@angular/core';
import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { AppRouter } from '@stream-components/shared';
import { environment } from '../../environments/environment';

export const TRPC = new InjectionToken('trpc');

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: environment.api.trpc,
      fetch(url, option) {
        return fetch(url, {
          ...option,
          credentials: 'include',
        });
      },
    }),
  ],
});

export type TRPCClient = typeof trpc;

export const trpcProvider: Provider = {
  provide: TRPC,
  useValue: trpc,
};
