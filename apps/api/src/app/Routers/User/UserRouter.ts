import { trpc } from '../../Trpc';
import { getById } from './Query/GetById';
import { getAll } from './Query/GetAll';
import { add } from './Mutation/Add';
import { isLogged } from './Query/IsLogged';
import { logIn } from './Mutation/LogIn';
import { onAdded } from './Subscription/OnAdded';

export const userRouter = trpc.router({
  getById,
  getAll,
  add,
  isLogged,
  logIn,
  onAdded,
});
