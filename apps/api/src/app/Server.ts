import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { appRouter } from './Routers/AppRouter';
import { prepareContext } from './Context';
import cookie from '@fastify/cookie';
import { FastifySSEPlugin } from 'fastify-sse-v2';
import { added } from './Routers/User/Subscription/Added';
import { SSESubscriptions } from './SSESubscriptions';
import staticPlugin from '@fastify/static';
import { join } from 'node:path';

export type { AppRouter } from './Routers/AppRouter';

export const server = () => {
  const server = fastify({
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

  server.register(cors, {
    origin: true,
    credentials: true,
  });
  server.register(cookie);
  server.register(staticPlugin, {
    root: join(process.cwd(), 'dist', 'apps', 'stream-components'),
    redirect: true,
    index: 'index.html',
  });
  server.register(FastifySSEPlugin);
  server.register(fastifyTRPCPlugin, {
    prefix: '/api/trpc',
    trpcOptions: { router: appRouter, createContext },
  });
  server.register(SSESubscriptions([added], { prefix: '/api/subscriptions' }));

  process.on('SIGTERM', () => {
    server.close();
    console.log('SIGTERM');
  });

  return {
    start: async () => {
      await server.listen({ port: 3000 });
    },
  };
};
