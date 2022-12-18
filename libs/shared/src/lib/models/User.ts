import { v4 } from 'uuid';
import type * as PrismaTypes from '@prisma/client';

export type User = PrismaTypes.User;

export function createUser(
  seed: Partial<User> & Required<Pick<User, 'email'>>
): User {
  return {
    id: seed.id ?? v4(),
    email: seed.email,
    password: seed.password ?? null,
  };
}
