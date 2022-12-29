import { trpc } from '../../../Trpc';
import { getAll } from './Query/GetAll';

export const commandRouter = trpc.router({
  getAll,
});
