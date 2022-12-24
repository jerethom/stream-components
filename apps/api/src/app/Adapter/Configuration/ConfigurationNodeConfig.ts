import { ConfigurationAdapter } from './ConfigurationAdapter';
import config from 'config';

export const configurationNodeConfig: ConfigurationAdapter = {
  get: <T>(key: string): T => {
    return config.get(key);
  },
  has: (key: string): boolean => {
    return config.has(key);
  },
  toObject: (): Record<string, unknown> => {
    return config.util.toObject() as Record<string, unknown>;
  },
};
