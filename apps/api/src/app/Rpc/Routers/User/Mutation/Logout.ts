import { publicProcedure } from '../../../../Procedures';

export const logout = publicProcedure.mutation<boolean>(async ({ ctx }) => {
  if (!ctx.token) {
    return true;
  }

  ctx.res.clearCookie('sc:token');
  await ctx.database.token.delete({
    where: {
      id: ctx.token.id,
    },
  });

  return true;
});
