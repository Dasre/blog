---
id: Leetcode-2220
title: 2220. Minimum Bit Flips to Convert Number
tags:
  - Leetcode
last_update:
  date: 2024-09-11
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-bit-flips-to-convert-number/description/)

A bit flip of a number `x` is choosing a bit in the binary representation of `x` and flipping it from either `0` to `1` or `1` to `0`.

For example, for `x = 7`, the binary representation is `111` and we may choose any bit (including any leading zeros not shown) and flip it. We can flip the first bit from the right to get `110`, flip the second bit from the right to get `101`, flip the fifth bit from the right (a leading zero) to get `10111`, etc.
Given two integers `start` and `goal`, return the minimum number of bit flips to convert `start` to `goal`.

**Example 1**

```
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.
```

**Example 2**

```
Input: start = 3, goal = 4
Output: 3
Explanation: The binary representation of 3 and 4 are 011 and 100 respectively. We can convert 3 to 4 in 3 steps:
- Flip the first bit from the right: 011 -> 010.
- Flip the second bit from the right: 010 -> 000.
- Flip the third bit from the right: 000 -> 100.
It can be shown we cannot convert 3 to 4 in less than 3 steps. Hence, we return 3.
```

**Constraints**

- $0 \le start, goal \le 10^9$

## 題目難易度

Easy

## 解題想法

把 start 和 goal 轉成二進位，再將兩個轉成二進位的數字補 0 的方式將長度一致，最終將二進位的字串每個位元兩兩比較去看是否需要去做轉換。

## 初試

- Time Complexity: $O(number of max bits)$
- Space Complexity: $O(1)$

```js
/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function (start, goal) {
  let s = start.toString(2);
  let g = goal.toString(2);

  const sub = Math.max(s.length, g.length) - Math.min(s.length, g.length);
  if (s.length > g.length) {
    g = "0".repeat(sub) + g;
  } else {
    s = "0".repeat(sub) + s;
  }

  let r = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== g[i]) r++;
  }
  return r;
};
```

## 可修改地方

可嘗試使用程式語言的運算符來完成
Bitwise AND (&)、Bitwise XOR(^)和 Right shift assignment (>>=)

- Time Complexity: $O(number of bits)$
- Space Complexity: $O(1)$

由於不需要轉成二進位的 string，

```js
/**
 * @param {number} start
 * @param {number} goal
 * @return {number}
 */
var minBitFlips = function (start, goal) {
  let xor = start ^ goal;

  let r = 0;

  while (xor) {
    r += xor & 1;
    xor >>= 1;
  }

  return r;
};
```
