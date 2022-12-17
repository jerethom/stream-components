import { isAuth } from './Middlewares/IsAuth';
import { t } from './Trpc';

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
