export interface Cache<K, V> {
  get(key: K): V | null;
  set(key: K, value: V, ttl?: number): void;
  delete(key: K): void;
  clear(): void;
}
export interface CacheWithMetrics {
  getMetrics(): {
    hits: number;
    misses: number;
    evictions: number;
    totalRequests: number;
    hitRate: number;
  };
}
