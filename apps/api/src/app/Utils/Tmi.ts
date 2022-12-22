import { Client } from 'tmi.js';
import { createLogger } from './Logger';

export async function createTmiClient(channels: string[]): Promise<Client> {
  const client = new Client({
    options: { debug: true },
    channels,
    logger: createLogger('tmi'),
  });

  await client.connect();

  return client;
}
