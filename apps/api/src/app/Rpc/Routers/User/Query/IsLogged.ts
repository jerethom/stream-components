import { publicProcedure } from '../../../../Procedures';
import { z } from 'zod';
import { checkTokenMiddleware } from '../../../Middlewares/CheckTokenMiddleware';

export const isLogged = publicProcedure
  .use(checkTokenMiddleware)
  .input(
    z
      .object({
        token: z.string(),
      })
      .optional()
  )
  .query(({ ctx }) => !!ctx.user);
