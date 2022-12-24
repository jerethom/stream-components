import type * as PrismaTypes from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import { HashAdapter } from '../Adapter/Hash/HashAdapter';
import { hashArgon } from '../Adapter/Hash/HashArgon';
import { database } from './Database';
import { StateCacheAdapter } from '../Adapter/StateCache/StateCacheAdapter';
import { stateCacheLru } from '../Adapter/StateCache/StateCacheLru';
import { ConfigurationAdapter } from '../Adapter/Configuration/ConfigurationAdapter';
import { configurationNodeConfig } from '../Adapter/Configuration/ConfigurationNodeConfig';

export function prepareContext() {
  return async ({
    req,
    res,
  }: CreateFastifyContextOptions): Promise<{
    config: ConfigurationAdapter;
    database: PrismaClient;
    hashService: HashAdapter;
    id: string;
    req: typeof req;
    res: typeof res;
    stateCache: StateCacheAdapter;
    user: PrismaTypes.User | null;
  }> => {
    return {
      config: configurationNodeConfig,
      database,
      hashService: hashArgon,
      id: req.id,
      req,
      res,
      stateCache: stateCacheLru,
      user: null,
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof prepareContext>>;
