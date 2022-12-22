import { FastifyInstance } from 'fastify';
import { FastifyPluginOptions } from 'fastify/types/plugin';
import { twitchAuth } from './TwitchAuth';

export const hookRouter = (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  instance.get('/twitch.auth', twitchAuth);
  done();
};
