import { initTRPC } from '@trpc/server';
import { Context } from './Context';

export const trpc = initTRPC.context<Context>().create();
