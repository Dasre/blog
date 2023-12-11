---
id: Leetcode-1287
title: 1287. Element Appearing More Than 25% In Sorted Array
tags:
  - Leetcode
last_update:
  date: 2023-12-11
---

## 題目

[完整題目](https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array/)

Given an integer array `sorted` in non-decreasing order, there is exactly one integer in the array that occurs more than 25% of the time, return that integer.
**Example 1**

```
Input: arr = [1,2,2,6,6,6,6,7,10]
Output: 6
```

**Example 2**

```
Input: arr = [1,1]
Output: 1
```

**Constraints**

- 1 <= arr.length <= $10^4$
- 0 <= arr[i] <= $10^5$

## 題目難易度

Easy

## 解題想法

算出 arr 總長度的 25%是多少，並開始遞迴一個一個確認。當發現值出現的次數大於 25%，即 return 數值。

## 初試

> Runtime: 56ms 63.83%

> Memory: 42.7MB 66.49%

```javascript
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  const len = arr.length;
  const t2 = len * 0.25;
  let time = 0;
  let target = -Infinity;

  if (len === 1) return arr[0];

  for (let i = 0; i < len; i++) {
    if (time > t2) {
      return target;
    }
    if (arr[i] !== target) {
      target = arr[i];
      time = 1;
    } else {
      time++;
    }
  }

  if (time >= t2) {
    return target;
  }
};
```
