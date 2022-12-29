import { FastifyInstance } from 'fastify';

export const headerHook = (fastify: FastifyInstance) => {
  fastify.addHook('onSend', (request, reply, payload, done) => {
    reply.header('x-request-id', request.id);
    return done();
  });
};
