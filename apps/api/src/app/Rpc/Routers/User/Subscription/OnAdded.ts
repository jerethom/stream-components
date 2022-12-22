import { publicProcedure } from '../../../../Procedures';
import { observable } from '@trpc/server/observable';
import { User } from '@stream-components/shared';
import { eventEmitter, Events } from '../../../../Utils/EventEmitter';

export const onAdded = publicProcedure.subscription(() =>
  observable<User>((emit) => {
    const event = (user: User) => {
      emit.next(user);
    };

    eventEmitter.on(Events.UseAdded, event);

    return () => eventEmitter.off(Events.UseAdded, event);
  })
);
