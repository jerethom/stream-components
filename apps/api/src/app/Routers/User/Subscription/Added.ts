import { FastifyInstance } from 'fastify';
import { on } from 'node:events';
import { eventEmitter, SSEEvents } from '../../../EventEmitter';

export const added = (server: FastifyInstance) => {
  server.get('/user.added', (req, res) => {
    res.sse(
      (async function* () {
        for await (const [event] of on(eventEmitter, SSEEvents.UseAdded)) {
          yield {
            type: SSEEvents.UseAdded,
            data: JSON.stringify(event),
          };
        }
      })()
    );
  });
};
