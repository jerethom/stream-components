import { v4 } from 'uuid';
import type * as PrismaTypes from '@prisma/client';
import { PartialRequired } from '../types';

export type Token = PrismaTypes.Token;

export function createToken(
  seed: PartialRequired<Token, 'userId' | 'content'>,
): Token {
  return {
    id: seed.id ?? v4(),
    content: seed.content,
    expiresAt: seed.expiresAt ?? null,
    userId: seed.userId,
    createdAt: seed.createdAt ?? new Date(),
  };
}
