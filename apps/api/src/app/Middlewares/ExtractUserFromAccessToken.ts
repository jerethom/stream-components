import { trpc } from '../Trpc';

export const extractUserFromAccessToken = trpc.middleware(
  async ({ ctx, next }) => {
    const accessToken = ctx.req.cookies['sc:session'];
    const user = await ctx.database.user.findFirst({
      where: {
        tokens: {
          some: {
            content: String(accessToken),
          },
        },
      },
    });
    if (user) {
      return next({
        ctx: {
          user,
        },
      });
    }
    return next({
      ctx: {
        user: null,
      },
    });
  }
);
