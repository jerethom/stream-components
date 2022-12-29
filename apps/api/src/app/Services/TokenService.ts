import { randomBytes } from 'node:crypto';

export const tokenService = {
  generate(length: number) {
    return randomBytes(length).toString('hex');
  },
};
