import { t } from '../../Trpc';
import { getById } from './GetById';
import { getAll } from './GetAll';

export const userRouter = t.router({
  getById,
  getAll,
});
