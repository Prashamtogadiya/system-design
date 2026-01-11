# Bloom Filter Design for Username Availability

## Purpose
This service implements a **Bloom Filter**—a space-efficient probabilistic data structure—to reduce unnecessary database reads. By checking the filter first, we can immediately identify available usernames without hitting the database, significantly lowering latency and DB load.

---

## Parameters

| Symbol | Meaning |
| :--- | :--- |
| $m$ | Total number of **Bits** in the array |
| $k$ | Number of hash functions |
| $n$ | Expected number of elements (total users) |
| $p$ | Desired false positive probability |

---

## Mathematical Formulas

### 1. Optimal Number of Bits ($m$)
To determine the total size of the bit array required based on the number of users ($n$) and the acceptable false positive rate ($p$):

$$m = -\frac{n \cdot \ln(p)}{(\ln 2)^2}$$

---

### 2. Optimal Number of Hash Functions ($k$)
To minimize the false positive rate for a specific number of bits ($m$):

$$k = \frac{m}{n} \cdot \ln 2$$

---

### 3. False Positive Probability ($p$)
To calculate the current error rate based on the number of bits ($m$), hash functions ($k$), and current elements ($n$):

$$p \approx \left( 1 - e^{-\frac{kn}{m}} \right)^k$$

> **Pro Tip:** As $n$ (users) increases, the number of flipped bits increases, which raises the probability $p$. Monitoring the "fill ratio" of your bits is key to maintaining performance.

---

## System Flow



1. **User Query:** User enters a username to check availability.
2. **Bit Array Check:**
    * The username is hashed $k$ times.
    * Each hash points to a specific index in the **$m$ bits**.
    * **If any bit is 0:** The username is definitely available. Return `true`.
    * **If all bits are 1:** The username *might* be taken.
3. **DB Verification:** Only if the Bloom Filter returns "Present," the system queries **MongoDB** to confirm.
4. **Synchronization:** Upon registration, the corresponding bits are set to `1` in memory and the record is saved to the DB.

---

## Scaling Reference ($p = 0.01$)

| $n$ (Users) | $m$ (Total Bits) | $k$ (Hashes) | Memory Size |
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
