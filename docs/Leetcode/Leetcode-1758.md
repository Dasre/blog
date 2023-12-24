---
id: Leetcode-1758
title: 1758. Minimum Changes To Make Alternating Binary String
tags:
  - Leetcode
last_update:
  date: 2023-12-24
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/)

You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.

**Example 1**

```
Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.
```

**Exmaple 2**

```
Input: s = "10"
Output: 0
Explanation: s is already alternating.
```

**Example 3**

```
Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".
```

**Constraints**

- 1 \<= s.length \<= $10^4$
- s[i] is either '0' or '1'.

## 題目難易度

Easy

## 解題想法

題目的字串字元只會是`0`或`1`，題目要求把字串變成交錯的。

也就是說字串不是`010101...`就是`101010...`。

也就是說我們只需要去計算把字串變成 0 開頭與 1 開頭分別需要改動字元的次數，再去看哪個次數比較少就是答案。

## 初試

> Runtime: 58ms, 49.57%

> Memory Usage: 42.7MB, 45.69%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
  let startWith0 = 0;
  let startWith1 = 0;

  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      if (s[i] === "0") {
        startWith1++;
      } else {
        startWith0++;
      }
    } else {
      if (s[i] === "0") {
        startWith0++;
      } else {
        startWith1++;
      }
    }
  }

  return Math.min(startWith0, startWith1);
};
```
