import { trpc } from '../../Trpc';
import { userRouter } from './User/UserRouter';
import { chatRouter } from './Chat/ChatRouter';

export const appRouter = trpc.router({
  user: userRouter,
  chat: chatRouter,
});

export type AppRouter = typeof appRouter;
