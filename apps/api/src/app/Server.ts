import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRouter } from './Routers/AppRouter';
import { prepareContext } from './Utils/Context';
import cookie from '@fastify/cookie';
import staticPlugin from '@fastify/static';
import { join } from 'node:path';
import { wsServer } from './WSServer';

export type { AppRouter } from './Routers/AppRouter';

export const server = () => {
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: 'true',
        },
      },
    },
  });

  const createContext = prepareContext();

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
