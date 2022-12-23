import { FastifyReply, FastifyRequest } from 'fastify';
import { URL } from 'node:url';
import { randomBytes } from 'node:crypto';

export const twitchUri = (request: FastifyRequest, reply: FastifyReply) => {
  const { config } = request.server;
  const uri = new URL('https://id.twitch.tv/oauth2/authorize');
  let scope = config.get<string | string[]>('service.twitch.application.scope');
  if (!Array.isArray(scope)) {
    scope = scope.split(',');
  }
  scope = encodeURIComponent(scope.join(' '));

  uri.searchParams.set(
    'response_type',
    config.get('service.twitch.application.responseType')
  );
  uri.searchParams.set(
    'client_id',
    config.get('service.twitch.application.clientId')
  );
  uri.searchParams.set(
    'redirect_uri',
    config.get('service.twitch.application.redirectUri')
  );
  uri.searchParams.set(
    'state',
    encodeURIComponent(randomBytes(10).toString('hex'))
  );
  uri.searchParams.set('scope', scope);

  return uri.toString();
};
