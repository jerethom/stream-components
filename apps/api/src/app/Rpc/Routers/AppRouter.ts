import { trpc } from '../../Trpc';
import { userRouter } from './User/UserRouter';
import { chatRouter } from './Chat/ChatRouter';
import { twitchRouter } from './Twitch/TwitchRouter';
import { commandRouter } from './Command/CommandRouter';

export const appRouter = trpc.router({
  user: userRouter,
  chat: chatRouter,
  twitch: twitchRouter,
  command: commandRouter,
});

export type AppRouter = typeof appRouter;
