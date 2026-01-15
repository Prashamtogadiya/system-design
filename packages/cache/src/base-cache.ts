export type CacheEntry<V> = {
  value: V;
  expiresAt?: number;
};

export abstract class BaseCache<K, V> {
  protected metrics = {
    hits: 0,
    misses: 0,
    evictions: 0,
  };

  protected recordHit() {
    this.metrics.hits++;
  }

  protected recordMiss() {
    this.metrics.misses++;
  }

  protected recordEviction() {
    this.metrics.evictions++;
  }

  protected isExpired(entry?: CacheEntry<V>): boolean {
    if (!entry) return true;
    if (!entry.expiresAt) return false;
    return Date.now() > entry.expiresAt;
  }

  protected withTTL(value: V, ttl?: number): CacheEntry<V> {
    return {
      value,
      expiresAt: ttl ? Date.now() + ttl * 1000 : undefined,
    };
  }

  getMetrics() {
    const total = this.metrics.hits + this.metrics.misses;
  console.log("BaseCache.getMetrics called");

    return {
      hits: this.metrics.hits,
      misses: this.metrics.misses,
      evictions: this.metrics.evictions,
      totalRequests: total,
      hitRate: total === 0 ? 0 : this.metrics.hits / total,
    };
  }
}
