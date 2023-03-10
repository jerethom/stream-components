import { publicProcedure } from '../../../../Procedures';
import { users } from '../../../../UsersData';
import { eventEmitter, Events } from '../../../../Utils/EventEmitter';
import { createUser, User } from '@stream-components/shared';

export const add = publicProcedure.mutation(() => {
  const user: User = createUser({
    login: 'test@test.com',
  });
  users.push(user);
  eventEmitter.emit(Events.UseAdded, user);
});
