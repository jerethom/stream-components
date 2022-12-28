import { z } from 'zod';

export const configurationValidator = z.object({
  options: z.object({
    tokenLength: z.number().min(5).max(255),
    tokenName: z.string().min(1),
  }),
  front: z.object({
    url: z.string().url(),
  }),
  service: z.object({
    twitch: z.object({
      application: z.object({
        clientId: z.string().min(1),
        clientSecret: z.string().min(1),
        redirectUri: z.string().url(),
        responseType: z.enum(['code', 'token']),
        scope: z.union([
          z.string(),
          z.array(
            z.string().regex(/:+/g, {
              message: `Le format des scopes doit contenir au moins un ":"`,
            })
          ),
        ]),
      }),
    }),
  }),
});
