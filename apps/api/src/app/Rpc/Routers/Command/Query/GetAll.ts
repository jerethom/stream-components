import { privateProcedure } from '../../../../Procedures';

export const getAll = privateProcedure.query(async ({ ctx }) => {
  return ctx.database.command.findMany({
    where: {
      userId: ctx.user.id,
    },
  });
});
