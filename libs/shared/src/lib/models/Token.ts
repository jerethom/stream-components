import { v4 } from 'uuid';
import type * as PrismaTypes from '@prisma/client';

export type Token = PrismaTypes.Token;

export function createToken(
  seed: Partial<Token> & Required<Pick<Token, 'content' | 'userId'>>
): Token {
  return {
    id: seed.id ?? v4(),
    content: seed.content,
    userId: seed.userId,
  };
}
