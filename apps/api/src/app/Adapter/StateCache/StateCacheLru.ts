import { StateCacheAdapter } from './StateCacheAdapter';
import LRU from 'lru-cache';
import ms from 'ms';

const lru = new LRU({
  max: 500,
  ttl: ms('60s'),
});

export const stateCacheLru: StateCacheAdapter = {
  set: async (key: string, value: string): Promise<void> => {
    lru.set(key, value);
  },
  has: async (input: string): Promise<boolean> => {
    return lru.has(input);
  },
  remove: async (input: string): Promise<void> => {
    lru.delete(input);
  },
};
