import { users } from '../../../UsersData';
import { publicProcedure } from '../../../Procedures';

export const getAll = publicProcedure.query(() => users);
