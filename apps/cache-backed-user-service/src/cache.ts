import { LRUCache } from "@system-design/cache";
import type { CacheWithMetrics } from "@system-design/cache";

export const userCache: CacheWithMetrics & {
  get(key: string): any | null;
  set(key: string, value: any, ttl?: number): void;
} = new LRUCache<string, any>(2);
