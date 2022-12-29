import { publicProcedure } from '../../../../Procedures';
import { observable } from '@trpc/server/observable';
import { createTmiClient } from '../../../../Utils/Tmi';
import { Message } from '@stream-components/shared';
import { v4 } from 'uuid';

export const onMessage = publicProcedure.subscription(async ({ ctx }) => {
  const { user } = ctx;
  const client = await createTmiClient([user.login]);

  return observable<Message>((emit) => {
    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      emit.next({
        content: message,
        displayName: tags['display-name'] ?? '',
        id: v4(),
      });
    });

    return () => {
      client.removeAllListeners('message');
      client.disconnect();
    };
  });
});
