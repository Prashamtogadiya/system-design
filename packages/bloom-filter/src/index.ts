export class BloomFilter {
  private size: number
  private hashCount: number
  private bits: Uint8Array

  constructor(size: number, hashCount: number) {
    this.size = size
    this.hashCount = hashCount
    this.bits = new Uint8Array(size)
  }

  private hash1(value: string): number {
    let hash = 0
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) % this.size
    }
    return hash
  }

  private hash2(value: string): number {
    let hash = 5381
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 33) ^ value.charCodeAt(i)
    }
    return Math.abs(hash) % this.size
  }

  add(value: string): void {
    const h1 = this.hash1(value)
    const h2 = this.hash2(value)

    for (let i = 0; i < this.hashCount; i++) {
      const index = (h1 + i * h2) % this.size
      this.bits[index] = 1
    }
  }

  has(value: string): boolean {
    const h1 = this.hash1(value)
    const h2 = this.hash2(value)

    for (let i = 0; i < this.hashCount; i++) {
      const index = (h1 + i * h2) % this.size
      if (this.bits[index] === 0) return false
    }
    return true
  }
}
