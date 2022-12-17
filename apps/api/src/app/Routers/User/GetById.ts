import { z } from 'zod';
import { User } from '@stream-components/shared';
import { users } from '../../UsersData';
import { privateProcedure } from '../../Procedures';

export const getById = privateProcedure
  .input(z.object({ id: z.string() }))
  .query<User | undefined>((req) => {
    console.log('ok');
    const user = users.find((el) => el.id === req.input.id);
    return user;
  });
