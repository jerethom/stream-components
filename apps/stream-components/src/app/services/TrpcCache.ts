import { RxActionFactory, RxActions } from '@rx-angular/state/actions';
import { Actions } from '@rx-angular/state/actions/lib/types';
import { filter, Observable, shareReplay, startWith, switchMap } from 'rxjs';

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
  protected cachify<
    P extends Promise<Response>,
    R extends string | void,
    Response
  >(
    trpcQuery: (key: string | null | void) => P,
    refreshCommand: Observable<R>,
    composedKey: [string, string]
  ): Observable<Response>;
  protected cachify<
    P extends Promise<Response>,
    R extends string | void,
    Response
  >(
    trpcQuery: (key: string | null | void) => P,
    refreshCommand: Observable<R>,
    key: string
  ): Observable<Response>;
  protected cachify<
    P extends Promise<Response>,
    R extends string | void,
    Response
  >(
    trpcQuery: (key: string | null | void) => P,
    refreshCommand: Observable<R>,
    composedKey: string | [string, string]
  ): Observable<Response> {
    const key = this.flattenComposedKey(composedKey);
    if (!this.internal.has(key)) {
      this.internal.set(
        key,
        refreshCommand.pipe(
          startWith(null),
          filter((refreshKey) => refreshKey === null || refreshKey === key),
          switchMap((refreshId) => trpcQuery(refreshId ?? key)),
          shareReplay({ refCount: true, bufferSize: 1 })
        )
      );
    }
    return this.internal.get(key) as Observable<Response>;
  }

  private flattenComposedKey(key: string | [string, string]): string {
    return Array.isArray(key) ? key.join(':') : key;
  }
}
