import { t } from './Trpc';
import { userRouter } from './Routers/User/UserRouter';

export const appRouter = t.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
