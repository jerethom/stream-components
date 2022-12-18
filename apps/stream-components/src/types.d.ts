export type SubscriptionData<T extends (...args: any) => any | undefined> =
  Parameters<Exclude<Parameters<T>[1]['onData'], undefined>>[0];

export type SubscriptionArgs<T extends (...args: any) => any | undefined> =
  Parameters<T>[0];

export type QueryArgs<T extends (...args: any) => any | undefined> =
  Parameters<T>[0];

export type MutationArgs<T extends (...args: any) => any | undefined> =
  Parameters<T>[0];
