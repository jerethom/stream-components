import { publicProcedure } from '../../../Procedures';
import { users } from '../../../UsersData';
import { eventEmitter, SSEEvents } from '../../../EventEmitter';
import { createUser, User } from '@stream-components/shared';

export const add = publicProcedure.mutation(() => {
  const user: User = createUser({
    email: 'test@test.com',
  });
  users.push(user);
  eventEmitter.emit(SSEEvents.UseAdded, user);
});
