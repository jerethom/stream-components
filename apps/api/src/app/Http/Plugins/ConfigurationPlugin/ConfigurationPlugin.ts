import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import * as config from 'config';
import { configurationValidator } from './ConfigurationValidator';
import { ZodError } from 'zod';
import { ZodConfigurationError } from './ZodConfigurationError';
import { ConfigurationAdapter } from '../../../Adapter/Configuration/ConfigurationAdapter';
import { configurationNodeConfig } from '../../../Adapter/Configuration/ConfigurationNodeConfig';

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigurationAdapter;
  }
}

export const configurationPlugin: FastifyPluginAsync = fp(async (server) => {
  server.decorate('config', configurationNodeConfig);

  try {
    await configurationValidator.parseAsync(config.util.toObject());
  } catch (e) {
    if (e instanceof ZodError) {
      throw new ZodConfigurationError(`Configuration error`, e);
    }
  }
});
