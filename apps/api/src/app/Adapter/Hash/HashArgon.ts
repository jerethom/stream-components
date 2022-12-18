import { HashAdapter } from './HashAdapter';
import { hash, verify } from 'argon2';

export const hashArgon: HashAdapter = {
  hash(input: string): Promise<string> {
    return hash(input);
  },
  verify(hashedInput: string, clearInput: string): Promise<boolean> {
    return verify(hashedInput, clearInput);
  },
};
