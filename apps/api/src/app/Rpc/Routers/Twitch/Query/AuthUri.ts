import { publicProcedure } from '../../../../Procedures';
import { URL } from 'node:url';
import { randomBytes } from 'node:crypto';

export const authUri = publicProcedure.query(async ({ ctx }) => {
  let scope = ctx.config.get<string | string[]>(
    'service.twitch.application.scope'
  );
  if (!Array.isArray(scope)) {
    scope = scope.split(',');
  }
  scope = scope.join(' ');

  const state = randomBytes(10).toString('hex');

  const uri = new URL('https://id.twitch.tv/oauth2/authorize');
  uri.searchParams.set(
    'response_type',
    ctx.config.get('service.twitch.application.responseType')
  );
  uri.searchParams.set(
    'client_id',
    ctx.config.get('service.twitch.application.clientId')
  );
  uri.searchParams.set(
    'redirect_uri',
    ctx.config.get('service.twitch.application.redirectUri')
  );
  uri.searchParams.set('state', state);
  uri.searchParams.set('scope', scope);

  ctx.stateCache.set(state);

  return uri.toString();
});
