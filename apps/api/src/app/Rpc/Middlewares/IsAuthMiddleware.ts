import { trpc } from '../../Trpc';
import { TRPCError } from '@trpc/server';
import { User } from '@stream-components/shared';

export const isAuthMiddleware = trpc.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user as User,
    },
  });
});
