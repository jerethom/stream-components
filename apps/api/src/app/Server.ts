import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { appRouter } from './Routers/AppRouter';
import { prepareContext } from './Context';
import { wsServer } from './WSServer';
import cookie from '@fastify/cookie';

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
  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  });

  process.on('SIGTERM', () => {
    server.close();
    console.log('SIGTERM');
  });

  return {
    start: async () => {
      wsServer(server.server, createContext);
      await server.listen({ port: 3000 });
    },
  };
};
