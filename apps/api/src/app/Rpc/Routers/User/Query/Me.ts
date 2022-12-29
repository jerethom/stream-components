import { privateProcedure } from '../../../../Procedures';
import { User } from '@stream-components/shared';

export const me = privateProcedure.query<Pick<User, 'id' | 'login'>>(
  async ({ ctx }) => {
    return {
      login: ctx.user.login,
      id: ctx.user.id,
    };
  },
);
