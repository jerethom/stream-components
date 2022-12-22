import { FastifyInstance } from 'fastify';
import { FastifyPluginOptions } from 'fastify/types/plugin';
import { hookRouter } from './Hook/HookRouter';

export const httpRouter = (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  instance.register(hookRouter, { prefix: '/hook' });
  done();
};
