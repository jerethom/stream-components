import { trpc } from './Trpc';
import { checkTokenMiddleware } from './Rpc/Middlewares/CheckTokenMiddleware';
import { isAuth } from './Rpc/Middlewares/IsAuth';

export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure
  .use(checkTokenMiddleware)
  .use(isAuth);
