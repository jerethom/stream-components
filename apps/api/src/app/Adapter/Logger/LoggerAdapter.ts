import { FastifyRequest } from 'fastify';

export interface LoggerAdapter {
  info(message: string, req?: FastifyRequest): void;

  warn(message: string, req?: FastifyRequest): void;

  error(error: object, req?: FastifyRequest): void;

  debug(message: string, req?: FastifyRequest): void;
}
