import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRegisterOptions,
} from 'fastify';

export const SSESubscriptions =
  (
    subscriptions: ((server: FastifyInstance) => unknown)[],
    opt: FastifyRegisterOptions<any>
  ) =>
  (server: FastifyInstance, opts: FastifyPluginOptions, done: () => void) => {
    subscriptions.forEach((sub) => {
      server.register((instance, opts, done) => {
        sub(instance);
        done();
      }, opt);
    });
    done();
  };
