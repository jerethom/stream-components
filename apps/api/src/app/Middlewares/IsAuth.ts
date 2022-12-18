import { trpc } from '../Trpc';
import { TRPCError } from '@trpc/server';

export const isAuth = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx,
  });
});
