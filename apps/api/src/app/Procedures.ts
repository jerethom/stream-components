import { isAuth } from './Middlewares/IsAuth';
import { trpc } from './Trpc';

export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(isAuth);
