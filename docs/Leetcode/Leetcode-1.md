---
id: Leetcode-1
title: 1. Two Sum
tags:
  - Leetcode
  - Leetcode 75
last_update:
  date: 2024-09-23
---

## 題目

[完整題目](https://leetcode.com/problems/two-sum/description/)

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

**Example 1**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints**

- $2 \le nums.length \le 10^4 $
- $-10^9 \le nums[i] \le 10^9$
- $-10^9 \le target \le 10^9$
- Only one valid answer exists.

## 題目難易度

Easy

## 解題想法

找出 nums 不重複兩數相加等於 target 的數位位置。可以用暴力破直接雙迴圈解決，但時間複雜度高。

## 暴力破解

- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$

直觀的暴力破解就是雙迴圈解決。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
```

## Hash Table

- Time Complexity: $O(n)$
- Space Complexity: $O(n)$

我們可以透過一次迴圈找出 target 減每個數值在 hash table 中是否有，有的話就可以直接找出兩個數字位置。

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const m = new Map();
  for (let i = 0; i < nums.length; i++) {
    const com = target - nums[i];
    if (m.has(com)) {
      return [i, m.get(com)];
    }
    m.set(nums[i], i);
  }
};
```
