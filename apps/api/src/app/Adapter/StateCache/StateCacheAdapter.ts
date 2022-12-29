export interface StateCacheAdapter {
  set(key: string, value: string): Promise<void>;
  has(input: string): Promise<boolean>;
  remove(input: string): Promise<void>;
}
