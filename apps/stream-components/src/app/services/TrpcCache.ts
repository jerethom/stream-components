import { RxActionFactory, RxActions } from '@rx-angular/state/actions';
import { Actions } from '@rx-angular/state/actions/lib/types';
import { filter, Observable, shareReplay, startWith, switchMap } from 'rxjs';
import { AnyFn, SubscriptionArgs, SubscriptionData } from '../../types';
import { Unsubscribable } from '@trpc/server/observable';

export class TrpcCacheRxState<A extends Partial<Actions>> {
  commands: RxActions<A> = new RxActionFactory<A>().create();
  protected internal = new Map<string, Observable<unknown>>();

  protected setupCommands(actions: A) {
    this.commands = new RxActionFactory<A>().create(actions);
  }

  /**
   * Permet la réutilisation d'une query trpc en la mettant en cache dans une Map.
   * @protected
   */
  protected query<K extends string | void, Response>(
    trpcQuery: (key: string | null | void | undefined) => Promise<Response>,
    refreshCommand: Observable<K>,
    composedKey: string | [string, string]
  ): Observable<Response> {
    const key = this.flattenComposedKey(composedKey);
    if (!this.internal.has(key)) {
      this.internal.set(
        key,
        refreshCommand.pipe(
          startWith(null),
          filter(
            (refreshKey) =>
              refreshKey === null ||
              refreshKey === undefined ||
              refreshKey === key
          ),
          switchMap((refreshId) => trpcQuery(refreshId ?? key)),
          shareReplay({ refCount: true, bufferSize: 1 })
        )
      );
    }
    return this.internal.get(key) as Observable<Response>;
  }

  protected subscription<T extends AnyFn>(
    trpcSubscription: T,
    args: SubscriptionArgs<T>,
    options?: {
      onData?: (data: SubscriptionData<T>) => Promise<void> | void;
      onComplete?: () => Promise<void> | void;
      onError?: () => Promise<void> | void;
    }
  ): Observable<SubscriptionData<T>> {
    return new Observable((subscriber) => {
      const sub = trpcSubscription(args, {
        onData: (data: SubscriptionData<T>) => {
          options?.onData?.(data);
          subscriber.next(data);
        },
        onComplete: () => {
          sub.unsubscribe();
          subscriber.complete();
        },
        onError: (err: unknown) => {
          subscriber.error(err);
        },
      }) as Unsubscribable;

      return () => {
        sub.unsubscribe();
      };
    });
  }

  // protected sse<R>(
  //   endpoint: string,
  //   params?: Record<string, string>,
  //   options?: {
  //     onData?: (data: R) => Promise<void> | void;
  //     onComplete?: () => Promise<void> | void;
  //     onError?: (error: Event) => Promise<void> | void;
  //   }
  // ): Observable<R> {
  //   return new Observable((subscriber) => {
  //     const eventSource = new EventSource(
  //       `${environment.api}/${endpoint}${this.objectToQueryParams(
  //         params
  //       )}`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     eventSource.addEventListener('message', (event) => {
  //       const data = JSON.parse(event.data);
  //       options?.onData?.(data);
  //       subscriber.next(data);
  //     });
  //     eventSource.addEventListener('error', (error) => {
  //       options?.onError?.(error);
  //       subscriber.error(error);
  //     });
  //
  //     return () => {
  //       options?.onComplete?.();
  //       eventSource.close();
  //     };
  //   });
  // }

  private flattenComposedKey(key: string | [string, string]): string {
    return Array.isArray(key) ? key.join(':') : key;
  }

  private objectToQueryParams(params?: Record<string, string>): string {
    if (Object.keys(params ?? {}).length) {
      return `?${Object.entries(params ?? {})
        .map(([key, value]) => `${key}=${value}`)
        .join('&')}`;
    }
    return '';
  }
}
