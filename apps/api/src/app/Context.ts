import * as trpcFastify from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import { User } from '@stream-components/shared';

const user: User = {
  id: 'logged',
};

export async function createContext({
  req,
  res,
}: trpcFastify.CreateFastifyContextOptions) {
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
