import { LoggerAdapter } from './LoggerAdapter';
import { createLogger } from '../../Utils/Logger';
import { FastifyRequest } from 'fastify';

const logger = createLogger('app');

export const pinoLogger: LoggerAdapter = {
  info: (message: string, req?: FastifyRequest): void => {
    if (req) {
      logger.info({ reqId: req.id }, message);
    } else {
      logger.info(message);
    }
  },
  warn: (message: string, req?: FastifyRequest): void => {
    if (req) {
      logger.warn({ reqId: req.id }, message);
    } else {
      logger.warn(message);
    }
  },
  error: (error: object, req?: FastifyRequest): void => {
    if (req) {
      logger.error({ ...error, reqId: req.id });
    } else {
      logger.error(error);
    }
  },
  debug: (message: string, req?: FastifyRequest): void => {
    if (req) {
      logger.debug({ reqId: req.id }, message);
    } else {
      logger.debug(message);
    }
  },
};
