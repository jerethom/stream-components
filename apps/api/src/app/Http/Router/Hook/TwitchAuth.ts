import { FastifyReply, FastifyRequest } from 'fastify';

export const twitchAuth = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.redirect('https://google.com');
};
