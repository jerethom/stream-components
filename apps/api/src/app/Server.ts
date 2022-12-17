import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { appRouter } from './AppRouter';
import { createContext } from './Context';

export type { AppRouter } from './AppRouter';

export const server = () => {
  const server = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    },
  });

  server.register(cors);
  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  return {
    start: () => server.listen({ port: 3000 }),
  };
};
