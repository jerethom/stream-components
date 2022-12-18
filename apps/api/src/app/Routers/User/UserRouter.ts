import { t } from '../../Trpc';
import { getById } from './GetById';
import { getAll } from './GetAll';
import { onAddUser } from './OnAddUser';
import { addUser } from './AddUser';

export const userRouter = t.router({
  getById,
  getAll,
  onAddUser,
  addUser,
});
