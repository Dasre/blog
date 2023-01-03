---
id: Leetcode-704
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/binary-search/)

找出目標數字在 array 的位置，若找到回傳其 index，找不到回傳-1。

## 題目難易度

Easy

## 解題想法

使用兩個 pointer 定義出範圍，並逐漸縮小範圍。

## 初試

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let pointer1 = 0;
  let pointer2 = nums.length - 1;

  while (pointer1 <= pointer2) {
    const mid = Math.floor((pointer1 + pointer2) / 2);
    if (nums[mid] > target) {
      pointer2 = mid - 1;
    } else if (nums[mid] < target) {
      pointer1 = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};
```
