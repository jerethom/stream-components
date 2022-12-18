import type * as PrismaTypes from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import pino from 'pino';
import { HashAdapter } from './Adapter/Hash/HashAdapter';
import { hashArgon } from './Adapter/Hash/HashArgon';

export function prepareContext() {
  const databaseLogger = pino().child({ service: 'database' });

  const prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
      { emit: 'event', level: 'info' },
      { emit: 'event', level: 'query' },
    ],
  });

  prisma.$on('error', (e) => databaseLogger.error(e, e.message));
  prisma.$on('warn', (e) => databaseLogger.warn(e, e.message));
  prisma.$on('info', (e) => databaseLogger.info(e));
  prisma.$on('query', (e) => databaseLogger.debug(e));

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
      database: prisma,
      hashService: hashArgon,
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof prepareContext>>;
