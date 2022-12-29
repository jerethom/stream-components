import { publicProcedure } from '../../../../Procedures';
import { errorTransformer } from '../../../../Utils/ErrorTransformer';
import {
  BaseError,
  createToken,
  createUser,
  TwitchAuthError,
  TwitchStateError,
  TwitchTokenError,
  TwitchUserError,
  User,
} from '@stream-components/shared';
import { URL } from 'node:url';
import {
  TwitchHelixUsersResponse,
  TwitchOAuth2TokenResponse,
  TwitchRedirectQueryParams,
} from '../../../../Types/TwitchTypes';
import { addDays } from 'date-fns';

export const checkAuthorization = publicProcedure.query(async ({ ctx }) => {
  const { code, state, error, error_description } = ctx.req
    .query as TwitchRedirectQueryParams;
  const frontUrl = ctx.config.get<string>('front.url');
  const formatFrontUrlWithError =
    (baseUrl: string) =>
    (error: BaseError): string =>
      `${baseUrl}/signin?${errorTransformer.toQueryUrl(error)}`;
  const toUrlError = formatFrontUrlWithError(frontUrl);

  if (error) {
    ctx.logger.error({ error, error_description }, ctx.req);
    return ctx.res.redirect(toUrlError(new TwitchAuthError()));
  }

  if (!(await ctx.stateCache.has(state))) {
    return ctx.res.redirect(toUrlError(new TwitchStateError()));
  }

  const twitchTokenUrl = new URL('https://id.twitch.tv/oauth2/token');
  const formData = new FormData();
  formData.set(
    'client_id',
    ctx.config.get('service.twitch.application.clientId')
  );
  formData.set(
    'client_secret',
    Buffer.from(
      ctx.config.get<string>('service.twitch.application.clientSecret'),
      'base64'
    ).toString('utf-8')
  );
  formData.set('code', code);
  formData.set('grant_type', 'authorization_code');
  formData.set(
    'redirect_uri',
    ctx.config.get('service.twitch.application.redirectUri')
  );

  try {
    const oAuth2TokenResponse = await fetch(twitchTokenUrl, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json() as Promise<TwitchOAuth2TokenResponse>);

    const twitchUser = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${oAuth2TokenResponse.access_token}`,
        'Client-Id': ctx.config.get<string>(
          'service.twitch.application.clientId'
        ),
      },
    })
      .then((res) => res.json() as Promise<TwitchHelixUsersResponse>)
      .then((res) => res.data.at(0));

    if (!twitchUser) {
      ctx.logger.error({ message: `Unable to find the user's data` });
      return ctx.res.redirect(toUrlError(new TwitchUserError()));
    }

    let newUser: User | undefined;
    const existingUser = await ctx.database.user.findFirst({
      where: {
        login: twitchUser.login,
      },
    });
    if (!existingUser) {
      newUser = createUser({
        login: twitchUser.login,
        access: oAuth2TokenResponse.access_token,
        refresh: oAuth2TokenResponse.refresh_token,
        expiresIn: oAuth2TokenResponse.expires_in,
      });
    } else {
      existingUser.access = oAuth2TokenResponse.access_token;
      existingUser.refresh = oAuth2TokenResponse.refresh_token;
      existingUser.expiresIn = oAuth2TokenResponse.expires_in;
    }

    const token = createToken({
      expiresAt: addDays(new Date(), 30),
      userId: existingUser?.id ?? newUser?.id ?? '',
      content: ctx.services.token.generate(
        ctx.config.get<number>('options.tokenLength')
      ),
    });

    await ctx.database.$transaction([
      ...(newUser
        ? [
            ctx.database.user.create({
              data: newUser,
            }),
          ]
        : [
            ctx.database.user.update({
              data: existingUser as User,
              where: {
                id: (existingUser as User).id,
              },
            }),
          ]),
      ctx.database.token.create({
        data: token,
      }),
    ]);

    ctx.res.cookie('sc:token', token.content, {
      sameSite: 'strict',
      path: '/',
      httpOnly: true,
      expires: token.expiresAt ?? undefined,
    });

    return ctx.res.redirect(frontUrl);
  } catch (e) {
    ctx.logger.error(e as object, ctx.req);
    return ctx.res.redirect(toUrlError(new TwitchTokenError()));
  }
});
