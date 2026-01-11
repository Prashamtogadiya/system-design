# Bloom Filter Design

## Purpose

Reduce database reads for username availability checks by using a memory-efficient probabilistic data structure (Bloom Filter). 

---

## Parameters

| Symbol | Meaning |
|--------|--------|
| **m**  | Number of bits in the Bloom Filter array (size of filter) |
| **k**  | Number of hash functions |
| **n**  | Expected number of elements (users) |
| **p**  | Desired false positive probability |

---

## Mathematical Formulas

### 1. Optimal size of Bloom Filter (`m`)

\[
m = -\frac{n \cdot \ln(p)}{(\ln 2)^2}
\]

- `n` = number of expected elements  
- `p` = false positive rate  
- `m` = size in bits  

**Example:**  
- n = 1,000,000 users  
- p = 0.01 (1% false positive)

\[
m = -\frac{1,000,000 \cdot \ln(0.01)}{(0.6931)^2} \approx 9,585,000 \text{ bits } \approx 1.14 \text{ MB}
\]

---

### 2. Optimal number of hash functions (`k`)

\[
k = \frac{m}{n} \cdot \ln 2
\]

- Using above numbers:

\[
k = \frac{9,585,000}{1,000,000} \cdot 0.6931 \approx 6.64 \approx 7
\]

> So we use **7 hash functions** for this scale.

---

## Flow of the Service

1. User enters a username.
2. Bloom Filter checks in memory:
   - If Bloom says **not present**, username is available → return available.
   - If Bloom says **present**, query DB to confirm (handle false positives).
3. On registration, username is added to Bloom Filter and DB.
4. Bloom Filter is memory-efficient; reduces DB queries for millions of users.

---

## Example Table

| n (users) | p (false positive) | m (bits) | k (hashes) |
|------------|------------------|----------|------------|
| 1,000      | 0.01             | 9,585    | 7          |
| 100,000    | 0.01             | 958,505  | 7          |
| 1,000,000  | 0.01             | 9,585,058| 7          |

> Bloom Filter scales well for **large user bases** like Twitter.

---

## Tech Stack

- Node.js + TypeScript
- Express.js (backend server)
- MongoDB (for persistent storage)
- Custom Bloom Filter library (`packages/bloom-filter`)
