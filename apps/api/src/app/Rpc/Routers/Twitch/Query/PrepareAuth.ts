import { publicProcedure } from '../../../../Procedures';
import { URL } from 'node:url';
import { createHash } from 'node:crypto';
import { v4 } from 'uuid';

export const prepareAuth = publicProcedure.query(async ({ ctx }) => {
  let scope = ctx.config.get<string | string[]>(
    'service.twitch.application.scope'
  );
  if (!Array.isArray(scope)) {
    scope = scope.split(',');
  }
  scope = scope.join(' ');

  const uuid = v4();
  const state = createHash('sha256')
    .update(`${scope}${uuid}`, 'utf-8')
    .digest('hex');

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

  ctx.stateCache.set(state, uuid);

  // Supprime le token dans les cookies s'il existe
  const scTokenCookie = ctx.req.cookies['sc:token'];
  if (scTokenCookie) {
    ctx.res.clearCookie('sc:token');
    await ctx.database.token
      .delete({
        where: {
          content: scTokenCookie,
        },
      })
      .catch(() => void 0 /* Ignore error */);
  }

  return ctx.res.redirect(uri.toString());
});
