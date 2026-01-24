import { BloomFilter } from '../../../packages/bloom-filter/src/index'

export const bloom = new BloomFilter(
  1_000_000, // m 
  7          // k 
)
