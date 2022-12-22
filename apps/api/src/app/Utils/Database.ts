import { PrismaClient } from '@prisma/client';
import { createLogger } from './Logger';

const databaseLogger = createLogger('database');

export const database = new PrismaClient({
  log: [
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'query' },
  ],
});

database.$on('error', (e) => databaseLogger.error(e, e.message));
database.$on('warn', (e) => databaseLogger.warn(e, e.message));
database.$on('info', (e) => databaseLogger.info(e));
database.$on('query', (e) => databaseLogger.debug(e));
