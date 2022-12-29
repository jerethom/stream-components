import { trpc } from '../../../Trpc';
import { checkAuthorization } from './Query/CheckAuthorization';
import { prepareAuth } from './Query/PrepareAuth';

export const twitchRouter = trpc.router({
  checkAuthorization,
  prepareAuth,
});
