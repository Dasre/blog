---
id: Leetcode-242
title: 242. Valid Anagram
tags:
  - Leetcode
last_update:
  date: 2023-12-16
---

## 題目

[完整題目](https://leetcode.com/problems/valid-anagram/)

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1**

```
Input: s = "anagram", t = "nagaram"
Output: true

```

**Example 2**

```
Input: s = "rat", t = "car"
Output: false
```

**Constraints**

- 1 <= s.length, t.length <= 5 \* $10^4$
- s and t consist of lowercase English letters.

Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## 題目難易度

Easy

## 解題想法

如果 s 和 t 的字串長度不同，就不符題目要求的 Anagram。因此我們只需要把 s 的所有字符用 Map 記錄下來，再把 t 掃過一下，確認 t 所有的字符 s 都有且數量也對。

## 初試

> Runtime: 51ms, 98.64%

> Memory Usage: 43.8MB, 65.83%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const x = new Map();
  for (let i of s) {
    x.set(i, (x.get(i) ?? 0) + 1);
  }

  for (let i of t) {
    if (!x.has(i) || x.get(i) === 0) {
      return false;
    }

    x.set(i, x.get(i) - 1);
  }

  return true;
};
```
