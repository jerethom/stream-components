/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Unsubscribable } from '@trpc/server/observable';

export type AnyFn = (...args: any) => any;

export type SubscriptionData<T extends AnyFn> = T extends (
  ...args: [any, { onData: (value: infer D) => any }]
) => Unsubscribable
  ? D
  : never;

export type SubscriptionArgs<T extends AnyFn> = Parameters<T>[0];

export type QueryArgs<T extends AnyFn> = Parameters<T>[0];

export type MutationArgs<T extends AnyFn> = Parameters<T>[0];
