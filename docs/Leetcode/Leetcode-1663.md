---
id: Leetcode-1663
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/smallest-string-with-a-given-numeric-value/)

The numeric value of a lowercase character is defined as its position (1-indexed) in the alphabet, so the numeric value of a is 1, the numeric value of b is 2, the numeric value of c is 3, and so on.

The numeric value of a string consisting of lowercase characters is defined as the sum of its characters' numeric values. For example, the numeric value of the string "abe" is equal to 1 + 2 + 5 = 8.

You are given two integers n and k. Return the lexicographically smallest string with length equal to n and numeric value equal to k.

Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

**Example 1**

```
Input: n = 3, k = 27
Output: "aay"
Explanation: The numeric value of the string is 1 + 1 + 25 = 27, and it is the smallest string with such a value and length equal to 3.
```

**Example 2**

```
Input: n = 5, k = 73
Output: "aaszz"
```

**Constraints**

- 1 <= n <= 105
- n <= k <= 26 \* n

透過 a=1, b=2, c=3 ... z=26 的對應，找出數值 k 可以顯示 n 位元的最小值。

## 題目難易度

Medium

## 解題想法

因為題目有提到 k 最少也等於 n，也就是說每一位元至少以數值來看都是 1。

所以說我們只需要從最後一位開始依序往前填，狀況可分兩種

1. 此位填入 26（也就是`z`），前面剩餘的每位至少都可以填 1（也就是`a`）
2. 此位數無法填入 26，需將 k 扣除前面剩餘位數（每位都先填 1），找出此位數可以填入的數值

透過重複執行上述的規則，找出字串。

## 初試

> Runtime: 255ms

> Memory Usage: 70.2MB

```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getSmallestString = function (n, k) {
  const array = [];

  for (let i = 0; i < n; i++) {
    if (k - 26 >= (n - i - 1) * 1) {
      array.push(String.fromCharCode(97 + 26 - 1));
      k = k - 26;
    } else {
      const target = k - (n - i - 1);
      array.push(String.fromCharCode(97 + target - 1));
      k = k - target;
    }
  }

  return array.reverse().join("");
};
```
