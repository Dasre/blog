---
id: Leetcode-1913
title: 1913. Maximum Product Difference Between Two Pairs
tags:
  - Leetcode
last_update:
  date: 2023-12-18
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-product-difference-between-two-pairs/)

The product difference between two pairs (a, b) and (c, d) is defined as $(a * b) - (c * d)$.

For example, the product difference between (5, 6) and (2, 7) is (5 _ 6) - (2 _ 7) = 16.
Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.

Return the maximum such product difference.

**Example 1**

```
Input: nums = [5,6,2,7,4]
Output: 34
Explanation: We can choose indices 1 and 3 for the first pair (6, 7) and indices 2 and 4 for the second pair (2, 4).
The product difference is (6 * 7) - (2 * 4) = 34.
```

**Exmaple 2**

```
Input: nums = [4,2,5,9,7,4,8]
Output: 64
Explanation: We can choose indices 3 and 6 for the first pair (9, 8) and indices 1 and 5 for the second pair (2, 4).
The product difference is (9 * 8) - (2 * 4) = 64.
```

**Constraints**

- 4 <= nums.length <= $10^4$
- 1 <= nums[i] <= $10^4$

## 題目難易度

Easy

## 解題想法

題目是 $(a * b)$ 和 $(c * d)$ 相減，所以換句話來說就是要讓 $(a * b)$ 越大，$(c * d)$越小。那我們只需要先把 nums 排序，a 和 b 抓最大的兩個數字，c 和 d 抓最小的兩個數字。

## 初試

> Runtime: 76ms, 62.25%

> Memory Usage: 45.10MB, 38.87%

- 時間複雜度：$O(n * logn)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductDifference = function (nums) {
  const a = nums.sort((a, b) => b - a);
  return a[0] * a[1] - a[nums.length - 1] * a[nums.length - 2];
};
```
