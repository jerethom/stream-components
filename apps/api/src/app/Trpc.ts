import { initTRPC } from '@trpc/server';
import { Context } from './Context';
// import SuperJson from 'superjson';

export const t = initTRPC.context<Context>().create({
  // transformer: SuperJson,
});
