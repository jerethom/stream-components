import type * as PrismaTypes from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import { HashAdapter } from '../Adapter/Hash/HashAdapter';
import { hashArgon } from '../Adapter/Hash/HashArgon';
import { database } from './Database';

export function prepareContext() {
  return async ({
    req,
    res,
  }: CreateFastifyContextOptions): Promise<{
    req: typeof req;
    res: typeof res;
    user: PrismaTypes.User | null;
    database: PrismaClient;
    hashService: HashAdapter;
  }> => {
    return {
      req,
      res,
      user: null,
      database,
      hashService: hashArgon,
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof prepareContext>>;
