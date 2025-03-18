---
id: Leetcode-2401
title: 2401. Longest Nice Subarray
tags:
  - Leetcode
last_update:
  date: 2025-03-18
---

## 題目

[完整題目](https://leetcode.com/problems/longest-nice-subarray/description)

You are given an array `nums` consisting of positive integers.

We call a subarray of `nums` nice if the bitwise AND of every pair of elements that are in different positions in the subarray is equal to `0`.

Return the length of the longest nice subarray.

A subarray is a contiguous part of an array.

Note that subarrays of length `1` are always considered nice.

**Example 1**

```
Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.
```

**Example 2**

```
Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.
```

**Constraints**

- $1 \le nums.length \le 10^5$
- $1 \le nums[i] \le 10^9$

## 題目難易度

Medium

## 解題想法

題目簡單來說要找到一個 subarray，其中任意兩個數字的 AND 都是 0，並回傳這個 subarray 的長度。

若直觀的採用暴力破解的方式來做，時間複雜度至少會是 $O(n^2)$，單看是否了解使用 OR 的操作來快速檢查多組數字，會造成時間複雜度更高。

所以在這題中會使用到 Bitwise OR 和 Bitwise XOR 的兩個概念。

- OR 的概念主要是因為題目要求任意兩個數字的 AND 都是 0，所以使用 OR 的方式來快速檢查多組數字

  舉例來說如果題目是[3, 8, 48]，我們都先把這三個數字轉成二進位

  ```
  3:    0011
  8:    1000
  48: 110000
  ```

  如果按照暴力破解方式，我會需要 3 和 8 去做一次 AND，3 和 48 去做一次 AND，最後 8 再和 48 去做一次 AND，這樣子就造成了時間複雜度的增加。
  但如果我們採用 OR 的方式，當我 3 和 8 OR 完變成 11 (1011)，其實 1011 這個就同時代表了 3 和 8 的資訊了。

- 至於為什麼要用 XOR 的概念

  主要是前面再做的時候，我們已經使用 OR 的方式來把多組數字的資訊組在一起了，由於 XOR 的特性是

  ```
  1. x ^ x = 0
  2. x & 0 = x
  3. (a ^ b) ^ b = a
  ```

  所以我們只要做一次 XOR，就可以快速的移除我們的目標在 bit 中的資訊。

在這題中，使用到了 Sliding Window 的方式來解決。left 和 right 的指標就是在控制 subArray 的範圍，再配合上前面題的 OR 和 XOR 的使用，就能快速的找到符合題目要求的 subArray，並減少不必要的計算。

## 初試

- Time Complexity: $O(n)$
- Space Complexity: $O(1)$

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  let left = 0;
  let maxLen = 0;
  let bit = 0;

  for (let right = 0; right < nums.length; right++) {
    while ((bit & nums[right]) !== 0) {
      bit = bit ^ nums[left];
      left++;
    }
    bit = bit | nums[right];
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
};
```
