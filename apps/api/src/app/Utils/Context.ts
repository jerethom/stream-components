import type * as PrismaTypes from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import { HashAdapter } from '../Adapter/Hash/HashAdapter';
import { hashArgon } from '../Adapter/Hash/HashArgon';
import { database } from './Database';
import * as config from 'config';

export function prepareContext() {
  return async ({
    req,
    res,
  }: CreateFastifyContextOptions): Promise<{
    config: typeof config;
    database: PrismaClient;
    hashService: HashAdapter;
    req: typeof req;
    res: typeof res;
    user: PrismaTypes.User | null;
    id: string;
  }> => {
    return {
      config,
      database,
      hashService: hashArgon,
      req,
      res,
      user: null,
      id: req.id,
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof prepareContext>>;
