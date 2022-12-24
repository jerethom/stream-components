import { ConfigurationAdapter } from './ConfigurationAdapter';
import * as config from 'config';

export const configurationNodeConfig: ConfigurationAdapter = {
  get: function <T>(key: string): T {
    return config.get(key);
  },
  has: function (key: string): boolean {
    return config.has(key);
  },
};
