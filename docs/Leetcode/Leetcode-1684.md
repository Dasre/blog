---
id: Leetcode-1684
title: 1684. Count the Number of Consistent Strings
tags:
  - Leetcode
last_update:
  date: 2024-09-18
---

## 題目

[完整題目](https://leetcode.com/problems/count-the-number-of-consistent-strings/description/)

You are given a string `allowed` consisting of distinct characters and an array of strings `words`. A string is consistent if all characters in the string appear in the string `allowed`.

Return <i>the number of consistent strings in the array</i> `words`.

**Example 1**

```
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: Strings "aaab" and "baa" are consistent since they only contain characters 'a' and 'b'.
```

**Example 2**

```
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
```

** Example 3**

```
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: Strings "cc", "acd", "ac", and "d" are consistent.
```

**Constraints**

- $1 \le words.length \le 10^4$
- $1 \le allowed.length \le 26$
- $1 \le words[i].length \le 10$
- The characters in allowed are distinct.
- `words[i]` and `allowed` contain only lowercase English letters.

## 題目難易度

Easy

## 解題想法

先找出 allowed 有哪些獨立的字元並存成一 Set，再去檢查 words 每個字元是否有不在 Set 內的。

## 初試

m 代表 allowed 字串長度，n 代表 words Array 長度，k 代表最長單字的長度

- Time Complexity: $O(m + n * k)$
- Space Complexity: $O(n)$

```js
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
  const s = new Set();
  for (let i = 0; i < allowed.length; i++) {
    s.add(allowed[i]);
  }

  const r = [];
  for (let i = 0; i < words.length; i++) {
    r.push(words[i]);
    for (let j = 0; j < words[i].length; j++) {
      if (!s.has(words[i][j])) {
        r.pop();
        break;
      }
    }
  }

  return r.length;
};
```
