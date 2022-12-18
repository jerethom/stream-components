import { publicProcedure } from '../../../Procedures';
import { observable } from '@trpc/server/observable';
import { User } from '@stream-components/shared';
import { eventEmitter } from '../../../EventEmitter';

export const onAdded = publicProcedure.subscription(() =>
  observable<User>((emit) => {
    const event = (user: User) => {
      emit.next(user);
    };

    eventEmitter.on('add', event);

    return () => eventEmitter.off('add', event);
  })
);
