---
id: Leetcode-763
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/partition-labels/)

You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

**Example 1**

```
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
```

**Example 2**

```
Input: s = "eccbbbbdec"
Output: [10]
```

將題目字串進行切割，且切割出的字串彼此字母不可以有重複，找出可切出最多段每個字串的長度。

## 題目難易度

Medium

## 解題想法

先將每個字母最後一次出現在字串的位置記錄下來，再來掃一次字串 s。

第一次會從 s 的第一個字母開始做目標，若到此字元最後一次出現的這段字串，中間每一個字母其最後位置沒有大於目標，就代表可以進行切割（後面不會在遇到這些字母）。

反之，則需要將會大於目標的字母作為新的目標，繼續找出字串可切割的位置，直到 s 字串全部掃完。

簡單來說

1. 找出 0 - 目標字母最後的位置中間，是否有其他字母的最後位置大於目標位置。
2. 有，更新目標字母為超出原目標位置的字母；無，紀錄字串長度，並將目標字母定為切割字串的下一個字母。
3. 值到 s 字串掃完，印出紀錄字串長度的 array。

## 初試

> Runtime: 68ms

> Memory Usage: 44.5MB

```javascript
/**
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  const obj = {};

  for (let i = 0; i < s.length; i++) {
    obj[s[i]] = i;
  }

  const res = [];

  for (let i = 0; i < s.length; i++) {
    let targetIndex = obj[s[i]];
    let end = i;

    for (let j = i; j <= targetIndex; j++) {
      if (obj[s[j]] > targetIndex) {
        targetIndex = obj[s[j]];
      }
    }
    res.push(targetIndex - end + 1);
    i = targetIndex;
  }

  return res;
};
```
