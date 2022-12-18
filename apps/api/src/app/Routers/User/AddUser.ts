import { publicProcedure } from '../../Procedures';
import { users } from '../../UsersData';
import { eventEmitter } from '../../EventEmitter';

export const addUser = publicProcedure.mutation(() => {
  const user = { id: String(users.length + 1) };
  users.push(user);
  eventEmitter.emit('add', user);
});
