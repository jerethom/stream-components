import { publicProcedure } from '../../../../Procedures';
import { extractUserFromAccessToken } from '../../../Middlewares/ExtractUserFromAccessToken';
import { z } from 'zod';
import { v4 } from 'uuid';
import { TRPCError } from '@trpc/server';
import { createToken } from '@stream-components/shared';
import { randomBytes } from 'node:crypto';

export const logIn = publicProcedure
  .use(extractUserFromAccessToken)
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    })
  )
  .query(async ({ ctx, input }) => {
    const alreadyLogged = !!ctx.user;
    if (alreadyLogged) {
      return v4();
    }

    const user = await ctx.database.user.findFirst({
      where: {
        email: input.email,
      },
    });
    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    if (!user.password) {
      throw new TRPCError({
        message: `L'utilisateur n'a pas de mot de passe`,
        code: 'INTERNAL_SERVER_ERROR',
      });
    }

    const isSamePassword = await ctx.hashService.verify(
      user.password,
      input.password
    );

    if (isSamePassword === false) {
      throw new TRPCError({ code: 'BAD_REQUEST' });
    }

    const token = createToken({
      content: randomBytes(20).toString('hex'),
      userId: user.id,
    });
    await ctx.database.token.create({
      data: token,
    });

    return token.content;
  });
