export interface HashAdapter {
  hash(input: string): Promise<string>;
  verify(hashedInput: string, clearInput: string): Promise<boolean>;
}
