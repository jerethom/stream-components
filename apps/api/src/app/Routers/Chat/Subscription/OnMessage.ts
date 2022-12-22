import { publicProcedure } from '../../../Procedures';
import { observable } from '@trpc/server/observable';
import { createTmiClient } from '../../../Utils/Tmi';

export const onMessage = publicProcedure.subscription(async () => {
  const client = await createTmiClient(['jerethom']);

  return observable<{ message: string; displayName: string }>((emit) => {
    client.on('message', (channel, tags, message, self) => {
      if (self) return;
      emit.next({ message, displayName: tags['display-name'] ?? '' });
    });

    return () => {
      client.removeAllListeners('message');
      client.disconnect();
    };
  });
});
