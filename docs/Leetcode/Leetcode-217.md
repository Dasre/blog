---
id: Leetcode-217
title: 217. Contains Duplicate
tags:
  - Leetcode
  - Leetcode 75
last_update:
  date: 2024-09-24
---

## 題目

[完整題目](https://leetcode.com/problems/contains-duplicate/description/)

Given an integer array `nums`, return `true` if any value appears at <b>least twice</b> in the array, and return `false` if every element is distinct.

**Example 1**

```
Input: nums = [1,2,3,1]
Output: true
Explanation:
The element 1 occurs at the indices 0 and 3.
```

**Example 2**

```
Input: nums = [1,2,3,4]
Output: false
Explanation:
All elements are distinct.
```

**Example 3**

```
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

**Constraints**

- $1 \le nums.length \le 10^5 $
- $-10^9 \le nums[i] \le 10^9$

## 題目難易度

Easy

## 解題想法

找出 nums 內的數值是否有重複。

## Hash Table

- Time Complexity: $O(n)$
- Space Complexity: $O(n)$

把 nums 所有數值掃過一次，並存在 Map 中，最後檢查 Map 的每一個 key、value，是否有 value 大於等於 2 的。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    m.set(nums[i], m.has(nums[i]) ? m.get(nums[i]) + 1 : 1);
  }

  for (let [key, value] of [...m]) {
    if (value >= 2) return true;
  }

  return false;
};
```

## Check Length

- Time Complexity: $O(n)$
- Space Complexity: $O(n)$

一樣把 nums 所有數值掃過一次，存在 Set 中，最後檢查 Set 的長度是否有比 nums 還短，有就是有重複。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var containsDuplicate = function (nums) {
  const numSet = new Set(nums);
  return numSet.size < nums.length;
};
```
