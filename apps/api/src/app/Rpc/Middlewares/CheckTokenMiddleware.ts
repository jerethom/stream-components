import { isAfter } from 'date-fns';
import { trpc } from '../../Trpc';

export const checkTokenMiddleware = trpc.middleware(async ({ ctx, next }) => {
  const tokenContent = ctx.req.cookies['sc:token'];
  const token = await ctx.database.token.findFirst({
    where: {
      content: String(tokenContent),
    },
  });

  // Si le token existe et qu'il est encore valide
  if (token?.expiresAt && isAfter(token.expiresAt, new Date())) {
    const user = await ctx.database.user.findFirst({
      where: {
        id: token.userId,
      },
    });
    if (user) {
      return next({
        ctx: {
          user,
        },
      });
    }
  }

  // Si le token existe dans la base donnée on le supprime
  if (token) {
    await ctx.database.token.delete({
      where: {
        id: token.id,
      },
    });
  }
  ctx.res.clearCookie('sc:token');

  return next({
    ctx: {
      user: null,
    },
  });
});
