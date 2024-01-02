---
id: Leetcode-2610
title: 2610. Convert an Array Into a 2D Array With Conditions
tags:
  - Leetcode
last_update:
  date: 2024-01-02
---

## 題目

[完整題目](https://leetcode.com/problems/convert-an-array-into-a-2d-array-with-conditions/)

You are given an integer array nums. You need to create a 2D array from nums satisfying the following conditions:

- The 2D array should contain only the elements of the array nums.
- Each row in the 2D array contains distinct integers.
- The number of rows in the 2D array should be minimal.
  Return the resulting array. If there are multiple answers, return any of them.

Note that the 2D array can have a different number of elements on each row.

**Example 1**

```
Input: nums = [1,3,4,1,2,3,1]
Output: [[1,3,4,2],[1,3],[1]]
Explanation: We can create a 2D array that contains the following rows:
- 1,3,4,2
- 1,3
- 1
All elements of nums were used, and each row of the 2D array contains distinct integers, so it is a valid answer.
It can be shown that we cannot have less than 3 rows in a valid array.
```

**Exmaple 2**

```
Input: nums = [1,2,3,4]
Output: [[4,3,2,1]]
Explanation: All elements of the array are distinct, so we can keep all of them in the first row of the 2D array.
```

**Constraints**

- 1 \<= nums.length \<= 200
- 1 \<= nums[i] \<= nums.length

## 題目難易度

Medium

## 解題想法

題目要將一 Array 處理成二維陣列，且二維陣列的列是`distinct integers`(也就是數字不重複)。

我的想法是將每個數字出現的次數先計算出來，這樣就可以二維陣列的行有幾行，接下來再把每個數字填入。

## 初試

> Runtime: 161ms, 14.43%

> Memory Usage: 46.6MB, 30.93%

- 時間複雜度：...
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findMatrix = function (nums) {
  const x = new Map();
  for (let e of nums) {
    x.set(e, x.has(e) ? x.get(e) + 1 : 1);
  }

  const max = Math.max(...[...x].map((item) => item[1]));

  const res = Array.from({ length: max }, () => {
    return Array.from({ length: 0 }, () => 0);
  });

  for (let e of [...x]) {
    for (let i = 0; i < e[1]; i++) {
      res[i].push(e[0]);
    }
  }

  return res;
};
```
