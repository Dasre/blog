---
id: Leetcode-3191
title: 3191. Minimum Operations to Make Binary Array Elements Equal to One I
tags:
  - Leetcode
last_update:
  date: 2024-09-11
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/description)

You are given a binary array `nums`.

You can do the following operation on the array any number of times (possibly zero):

Choose any 3 consecutive elements from the array and flip all of them.
Flipping an element means changing its value from 0 to 1, and from 1 to 0.

Return the minimum number of operations required to make all elements in `nums` equal to 1. If it is impossible, return -1.

**Example 1**

```
Input: nums = [0,1,1,1,0,0]

Output: 3

Explanation:
We can do the following operations:

- Choose the elements at indices 0, 1 and 2. The resulting array is nums = [1,0,0,1,0,0].
- Choose the elements at indices 1, 2 and 3. The resulting array is nums = [1,1,1,0,0,0].
- Choose the elements at indices 3, 4 and 5. The resulting array is nums = [1,1,1,1,1,1].
```

**Example 2**

```
Input: nums = [0,1,1,1]

Output: -1

Explanation:
It is impossible to make all elements equal to 1.
```

**Constraints**

- $3 \le nums.length \le 10^5$

## 題目難易度

Medium

## 解題想法

我選擇的作法是使用 Greedy 來解決此問題，也就是說我會 3 個一組一起看，當做左邊的數字是 0 就進行翻轉，確保最左邊的數字是 1，並且不再回頭修改他。

最後再去檢查是否有沒翻轉的但數字是 0，如果有的話就表示無法完成，直接回傳-1。

## 初試

- Time Complexity: $O(n)$
- Space Complexity: $O(1)$

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let ans = true;
  let time = 0;
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === 0) {
      nums[i] = Number(!nums[i]);
      nums[i + 1] = Number(!nums[i + 1]);
      nums[i + 2] = Number(!nums[i + 2]);
      time++;
    }

    if (i === nums.length - 3) {
      if (nums[i] && nums[i + 1] && nums[i + 2]) {
        ans = true;
      } else {
        ans = false;
      }
    }
  }

  return ans ? time : -1;
};
```
