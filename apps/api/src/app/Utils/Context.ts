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
import { LoggerAdapter } from '../Adapter/Logger/LoggerAdapter';
import { pinoLogger } from '../Adapter/Logger/PinoLogger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { tokenService } from '../Services/TokenService';

type RpcContext = {
  config: ConfigurationAdapter;
  database: PrismaClient;
  hashService: HashAdapter;
  id: string;
  logger: LoggerAdapter;
  req: FastifyRequest;
  res: FastifyReply;
  stateCache: StateCacheAdapter;
  user: PrismaTypes.User | null;
  services: {
    token: typeof tokenService;
  };
};

export function prepareContext() {
  return async ({
    req,
    res,
  }: CreateFastifyContextOptions): Promise<RpcContext> => {
    return {
      config: configurationNodeConfig,
      database,
      hashService: hashArgon,
      id: req.id,
      logger: pinoLogger,
      req,
      res,
      stateCache: stateCacheLru,
      user: null,
      services: {
        token: tokenService,
      },
    };
  };
}

export type Context = inferAsyncReturnType<ReturnType<typeof prepareContext>>;
