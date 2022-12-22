import { initTRPC } from '@trpc/server';
import { Context } from './Utils/Context';

export const trpc = initTRPC.context<Context>().create();
