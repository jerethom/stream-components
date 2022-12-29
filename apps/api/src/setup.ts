import { join } from 'node:path';

process.env['NODE_CONFIG_DIR'] = join(__dirname, 'assets', 'config');
