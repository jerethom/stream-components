import { createUser, User } from '@stream-components/shared';

export const users: User[] = [
  createUser({
    email: 'a@teste.com',
  }),
  createUser({
    email: 'b@teste.com',
  }),
];
