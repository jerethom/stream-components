import { v4 } from 'uuid';
import type * as PrismaTypes from '@prisma/client';

export type User = PrismaTypes.User;

export function createUser(
  seed: Partial<User> & Required<Pick<User, 'login'>>
): User {
  return {
    id: seed.id ?? v4(),
    login: seed.login,
    refresh: seed.refresh ?? null,
    access: seed.access ?? null,
    expiresIn: seed.expiresIn ?? null,
  };
}
