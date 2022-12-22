import pino from 'pino';

export function createLogger(service: string) {
  return pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: 'true',
      },
    },
  }).child({ service });
}
