import { z } from 'zod';

export const configurationValidator = z.object({
  service: z.object({
    twitch: z.object({
      application: z.object({
        clientId: z.string().min(1),
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
