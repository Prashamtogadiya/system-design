# Bloom Filter Design for Username Availability

## Purpose
This service implements a **Bloom Filter* a space-efficient probabilistic data structure to reduce unnecessary database reads. By checking the filter first, we can immediately identify available usernames without hitting the database, significantly lowering latency and DB load.

---

## Parameters

| Symbol | Meaning |
| :--- | :--- |
| $m$ | Number of bits in the Bloom Filter array |
| $k$ | Number of hash functions |
| $n$ | Expected number of elements (total users) |
| $p$ | Desired false positive probability |

---

## Mathematical Formulas

### 1. Optimal Size of Bloom Filter ($m$)
To determine how many bits ($m$) are required based on the number of users ($n$) and the acceptable false positive rate ($p$):

$$m = -\frac{n \cdot \ln(p)}{(\ln 2)^2}$$

---

### 2. Optimal Number of Hash Functions ($k$)
To minimize the false positive rate for a given filter size:

$$k = \frac{m}{n} \cdot \ln 2$$

---

### 3. False Positive Probability ($p$)
If you know the size of your filter ($m$), the number of hash functions ($k$), and the number of inserted elements ($n$), you can calculate the probability of a false positive using:

$$p \approx \left( 1 - e^{-\frac{kn}{m}} \right)^k$$

> This formula is essential for monitoring the health of the filter as the number of users ($n$) grows over time. As $n$ increases, $p$ will also increase.

---

## System Flow



1. **User Query:** User enters a username to check availability.
2. **Bloom Filter Check:**
    * **If "Not Present":** The username is definitely available. Return `true` immediately.
    * **If "Present":** The username *might* be taken.
3. **DB Verification:** Only if the Bloom Filter returns "Present," the system queries **MongoDB** to confirm.
4. **Synchronization:** When a new user registers, the username is added to both the Bloom Filter (in-memory) and the Database (persistent storage).

---

## Scaling Reference ($p = 0.01$)

| $n$ (Users) | $m$ (Bits) | $k$ (Hashes) | Memory Size |
| :--- | :--- | :--- | :--- |
| 1,000 | 9,585 | 7 | ~1.2 KB |
| 100,000 | 958,505 | 7 | ~120 KB |
| 1,000,000 | 9,585,058 | 7 | ~1.14 MB |

---

## Tech Stack
* **Language:** TypeScript
* **Runtime:** Node.js
* **Framework:** Express.js
* **Storage:** MongoDB
* **Internal Lib:** `packages/bloom-filter`
