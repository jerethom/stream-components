import { trpc } from '../Trpc';
import { userRouter } from './User/UserRouter';

export const appRouter = trpc.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
