import { trpc } from '../../../Trpc';
import { onMessage } from './Subscription/OnMessage';

export const chatRouter = trpc.router({
  onMessage,
});
