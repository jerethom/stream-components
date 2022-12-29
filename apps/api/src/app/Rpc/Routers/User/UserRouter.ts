import { trpc } from '../../../Trpc';
import { add } from './Mutation/Add';
import { isLogged } from './Query/IsLogged';
import { onAdded } from './Subscription/OnAdded';
import { me } from './Query/Me';
import { logout } from './Mutation/Logout';

export const userRouter = trpc.router({
  add,
  me,
  isLogged,
  onAdded,
  logout,
});
