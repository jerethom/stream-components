import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { inferAsyncReturnType } from '@trpc/server';
import { User } from '@stream-components/shared';
import { CreateWSSContextFnOptions } from '@trpc/server/dist/adapters/ws';

const user: User = {
  id: 'logged',
};

export async function createContext({
  req,
  res,
}: CreateFastifyContextOptions | CreateWSSContextFnOptions) {
  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
