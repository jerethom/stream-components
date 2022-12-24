export interface StateCacheAdapter {
  set(input: string): Promise<void>,
  has(input: string): Promise<boolean>,
  remove(input: string): Promise<void>,
}
