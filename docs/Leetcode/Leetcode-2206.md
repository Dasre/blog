---
id: Leetcode-2206
title: 2206. Divide Array Into Equal Pairs
tags:
  - Leetcode
last_update:
  date: 2025-03-17
---

## 題目

[完整題目](https://leetcode.com/problems/divide-array-into-equal-pairs/description)

You are given an integer array `nums` consisting of `2 * n` integers.

You need to divide `nums` into `n` pairs such that:

Each element belongs to exactly one pair.
The elements present in a pair are equal.
Return `true` if nums can be divided into `n` pairs, otherwise return `false`.

**Example 1**

```
Input: nums = [3,2,3,2,2,2]
Output: true
Explanation:
There are 6 elements in nums, so they should be divided into 6 / 2 = 3 pairs.
If nums is divided into the pairs (2, 2), (3, 3), and (2, 2), it will satisfy all the conditions.
```

**Example 2**

```
Input: nums = [1,2,3,4]
Output: false
Explanation:
There is no way to divide nums into 4 / 2 = 2 pairs such that the pairs satisfy every condition.
```

**Constraints**

- $nums.length == 2 * n$
- $1 \le n \le 500$
- $1 \le nums[i] \le 500$

## 題目難易度

Easy

## 解題想法

題目的重點在於同一個 element 可不可以找到一對的，所以我們只需要統計每個數字出現的次數，並看是否可以被 2 整除即可。

## 初試

- Time Complexity: $O(n)$
- Space Complexity: $O(n)$

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var divideArray = function (nums) {
  const pair = new Map();

  for (const num of nums) {
    pair.set(num, pair.has(num) ? pair.get(num) + 1 : 1);
  }

  let ans = true;
  pair.forEach((value) => {
    if (value % 2 !== 0) ans = false;
  });

  return ans;
};
```
