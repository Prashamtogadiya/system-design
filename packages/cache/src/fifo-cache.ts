import { Cache } from "./cache.interface";
import { BaseCache } from "./base-cache";

export class FIFOCache<K, V>
  extends BaseCache<K, V>
  implements Cache<K, V>
{
  private capacity: number;
  private map = new Map<K, any>();

  constructor(capacity: number) {
    super();
    this.capacity = capacity;
  }

 get(key: K): V | null {
  const entry = this.map.get(key);

  if (!entry || this.isExpired(entry)) {
    this.map.delete(key);
    this.recordMiss();
    return null;
  }

  this.recordHit();
  return entry.value;
}


  set(key: K, value: V, ttl?: number): void {
  if (this.map.size >= this.capacity) {
    const iterator = this.map.keys().next();
    if (!iterator.done) {
      this.map.delete(iterator.value);
      this.recordEviction();
    }
  }

  this.map.set(key, this.withTTL(value, ttl));
}


  delete(key: K): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }
}
