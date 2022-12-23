import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRouter } from './Rpc/Routers/AppRouter';
import { prepareContext } from './Utils/Context';
import cookie from '@fastify/cookie';
import staticPlugin from '@fastify/static';
import { join } from 'node:path';
import { wsServer } from './WSServer';
import { httpRouter } from './Http/Router/HttpRouter';
import { databasePlugin } from './Http/Plugins/DatabasePlugin';
import { configurationPlugin } from './Http/Plugins/ConfigurationPlugin/ConfigurationPlugin';
import { v4 } from 'uuid';
import { headerHook } from './Http/Hooks/HeaderHook';

export type { AppRouter } from './Rpc/Routers/AppRouter';

export const server = () => {
  const fastify = Fastify({
    genReqId: () => v4(),
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: 'true',
        },
      },
    },
    trustProxy: true,
  });

  const createContext = prepareContext();

  fastify.register(databasePlugin);
  fastify.register(configurationPlugin);
  fastify.register(cors, {
    origin: true,
    credentials: true,
  });
  fastify.register(cookie);
  fastify.register(staticPlugin, {
    root: join(process.cwd(), 'dist', 'apps', 'stream-components'),
    redirect: true,
    index: 'index.html',
  });
  fastify.register(fastifyTRPCPlugin, {
    prefix: '/api',
    trpcOptions: { router: appRouter, createContext },
  });
  fastify.register(httpRouter, { prefix: '/api' });

  headerHook(fastify);

  process.on('SIGTERM', () => {
    fastify.close();
    console.log('SIGTERM');
  });

  return {
    start: async () => {
      wsServer(fastify.server, createContext);
      await fastify.listen({ port: 3000 });
    },
  };
};
