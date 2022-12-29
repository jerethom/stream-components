export interface ConfigurationAdapter {
  get<T>(key: string): T;
  has(key: string): boolean;
  toObject(): Record<string, unknown>;
}
