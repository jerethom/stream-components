import { FastifyInstance } from 'fastify';
import { FastifyPluginOptions } from 'fastify/types/plugin';
import { twitchAuth } from './TwitchAuth';
import { twitchUri } from './TwitchUri';

export const hookRouter = (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  const twitchNamespace = (path: string) => `.twitch.${path}`;

  instance.get(twitchNamespace('auth'), twitchAuth);
  instance.get(twitchNamespace('uri'), twitchUri);
  done();
};
