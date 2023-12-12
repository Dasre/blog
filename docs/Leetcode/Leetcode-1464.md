---
id: Leetcode-1464
title: 1464. Maximum Product of Two Elements in an Array
tags:
  - Leetcode
last_update:
  date: 2023-12-12
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/)

Given the array of integers nums, you will choose two different indices i and j of that array. Return the maximum value of $(nums[i]-1)*(nums[j]-1)$.

**Example 1**

```
Input: nums = [3,4,5,2]
Output: 12
Explanation: If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12.
```

**Example 2**

```
Input: nums = [1,5,4,5]
Output: 16
Explanation: Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.
```

**Example 3**

```
Input: nums = [3,7]
Output: 12
```

**Constraints**

- 2 <= nums.length <= 500
- 1 <= nums[i] <= $10^3$

題目找出最多可以買的冰淇淋棒數量。

## 解題想法

找出 array 裡面最大和次大的數值，然後按照公式去計算。

## 初試

> Runtime: 50ms, 83.65%

> Memory Usage: 42.2MB, 71.99%

- 時間複雜度：O(n)
- 空間複雜度：O(1)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max1 = -Infinity;
  let max2 = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max1) {
      max2 = max1;
      max1 = nums[i];
    } else if (nums[i] > max2) {
      max2 = nums[i];
    }
  }

  return (max1 - 1) * (max2 - 1);
};
```

## 可修改地方

也可以把 array 直接 sort 排好，取第 0 個和第一個數字出來計算。

但時間複雜度和空間複雜度也是一樣的。

> Runtime: 60ms, 32.14%

> Memory Usage: 42.52MB, 55.26%

- 時間複雜度：O(n)
- 空間複雜度：O(1)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const t = nums.sort((a, b) => b - a);

  return (t[0] - 1) * (t[1] - 1);
};
```
