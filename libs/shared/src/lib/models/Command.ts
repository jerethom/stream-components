import type * as PrismaTypes from '@prisma/client';
import { PartialRequired } from '../types';
import { v4 } from 'uuid';

export type Command = PrismaTypes.Command;

export function createCommand(
  seed: PartialRequired<Command, 'trigger' | 'userId'>,
): Command {
  return {
    id: seed.id ?? v4(),
    trigger: seed.trigger,
    createdAt: seed.createdAt ?? new Date(),
    userId: seed.userId,
    updatedAt: seed.updatedAt ?? null,
    active: seed.active ?? false,
    locked: seed.locked ?? false,
  };
}
