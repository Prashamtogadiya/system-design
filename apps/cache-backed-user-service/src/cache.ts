import { LRUCache } from "@system-design/cache";
import type { CacheWithMetrics } from "@system-design/cache";

// One shared cache instance
export const userCache: CacheWithMetrics & {
  get(key: string): any | null;
  set(key: string, value: any, ttl?: number): void;
} = new LRUCache<string, any>(2);
