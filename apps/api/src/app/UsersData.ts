import { createUser, User } from '@stream-components/shared';

export const users: User[] = [
  createUser({
    login: 'foo',
  }),
  createUser({
    login: 'bar',
  }),
];
