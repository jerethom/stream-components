import { trpc } from './Trpc';
import { checkTokenMiddleware } from './Rpc/Middlewares/CheckTokenMiddleware';
import { isAuthMiddleware } from './Rpc/Middlewares/IsAuthMiddleware';

export const publicProcedure = trpc.procedure.use(checkTokenMiddleware);
export const privateProcedure = trpc.procedure
  .use(checkTokenMiddleware)
  .use(isAuthMiddleware);
