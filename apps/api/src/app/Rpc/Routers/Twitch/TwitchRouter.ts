import { trpc } from '../../../Trpc';
import { authUri } from './Query/AuthUri';

export const twitchRouter = trpc.router({
  authUri,
});
