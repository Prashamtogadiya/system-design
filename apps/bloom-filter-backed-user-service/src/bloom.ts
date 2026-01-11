import { BloomFilter } from '../../../packages/bloom-filter/src/index'

export const bloom = new BloomFilter(
  1_000_000, // m (bits)
  7          // k (hash functions)
)
