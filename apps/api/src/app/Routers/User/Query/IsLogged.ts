import { publicProcedure } from '../../../Procedures';
import { z } from 'zod';
import { extractUserFromAccessToken } from '../../../Middlewares/ExtractUserFromAccessToken';

export const isLogged = publicProcedure
  .use(extractUserFromAccessToken)
  .input(
    z
      .object({
        token: z.string(),
      })
      .optional()
  )
  .query(({ ctx }) => {
    return !!ctx.user;
    const currentDate = new Date();
    ctx.res.cookie('sc:session', 'test', {
      sameSite: 'strict',
      secure: false,
      httpOnly: false,
      path: '/',
      maxAge: currentDate.setDate(currentDate.getDate() + 30),
    });
  });
