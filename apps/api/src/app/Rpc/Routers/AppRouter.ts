import { trpc } from '../../Trpc';
import { userRouter } from './User/UserRouter';
import { chatRouter } from './Chat/ChatRouter';
import { twitchRouter } from './Twitch/TwitchRouter';

export const appRouter = trpc.router({
  user: userRouter,
  chat: chatRouter,
  twitch: twitchRouter,
});

export type AppRouter = typeof appRouter;
