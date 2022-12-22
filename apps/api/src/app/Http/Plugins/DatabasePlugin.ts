import { PrismaClient } from '@prisma/client';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { database } from '../../Utils/Database';

declare module 'fastify' {
  interface FastifyInstance {
    database: PrismaClient;
  }
}

export const databasePlugin: FastifyPluginAsync = fp(async (server) => {
  database.$connect();

  server.decorate('database', database);

  server.addHook('onClose', async (server) => {
    await server.database.$disconnect();
  });
});
