---
id: Leetcode-2870
title: 2870. Minimum Number of Operations to Make Array Empty
tags:
  - Leetcode
last_update:
  date: 2024-01-04
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-empty/)

You are given a `0-indexed` array `nums` consisting of positive integers.

There are two types of operations that you can apply on the array `any` number of times:

Choose `two` elements with `equal` values and `delete` them from the array.
Choose `three` elements with `equal` values and `delete` them from the array.
Return the `minimum` number of operations required to make the array empty, or `-1` if it is not possible.

**Example 1**

```
Input: nums = [2,3,3,2,2,4,2,3,4]
Output: 4
Explanation: We can apply the following operations to make the array empty:
- Apply the first operation on the elements at indices 0 and 3. The resulting array is nums = [3,3,2,4,2,3,4].
- Apply the first operation on the elements at indices 2 and 4. The resulting array is nums = [3,3,4,3,4].
- Apply the second operation on the elements at indices 0, 1, and 3. The resulting array is nums = [4,4].
- Apply the first operation on the elements at indices 0 and 1. The resulting array is nums = [].
It can be shown that we cannot make the array empty in less than 4 operations.
```

**Exmaple 2**

```
Input: nums = [2,1,2,2,3,3]
Output: -1
Explanation: It is impossible to empty the array.
```

**Constraints**

- 2 \<= nums.length \<= $10^5$
- 1 \<= nums[i] \<= $10^6$

## 題目難易度

Medium

## 解題想法

題目的敘述是一次可以移除 Array 裡面相同的 3 個數字或 2 個數字，並找出移除 Array 全部數字的最少次數。

我們只需要先把每個數字的出現次數統計出來，再去計算這個移除這個數字需要幾次。

一開始的想法是先把每個數字出現次數去一直減 3，並確認減完的數字是否可以被 2 整除，找出減 3 的次數再找減 2 的次數，最後加總。

## 初試

> Runtime: 101ms, 66.67%

> Memory Usage: 62.19MB, 23.08%

- 時間複雜度：$O(n * (m / 2))$
- 空間複雜度：$O(n)$

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const x = new Map();
  for (let e of nums) {
    x.set(e, x.has(e) ? x.get(e) + 1 : 1);
  }

  let count = 0;
  const r = [...x].filter((ee) => {
    let cal = ee[1];
    let temp = 0;
    let useTemp = 0;

    while (cal >= 3) {
      cal -= 3;
      temp++;
      if (cal % 2 === 0) useTemp = temp;
    }

    if (useTemp !== 0) {
      count += Math.floor((ee[1] - useTemp * 3) / 2);
      count += useTemp;
      return false;
    }

    if (ee[1] % 2 === 0) {
      count += Math.floor(ee[1] / 2);
      return false;
    }

    if (ee[1] % 3 === 0) {
      count += Math.floor(ee[1] / 3);
      return false;
    }

    return true;
  });

  return r.length === 0 ? count : -1;
};
```

## 可修改地方

計算次數部份，由於只有 1 個數字的狀況下無法消除

- 2 -> 1
- 3 -> 1
- 4 -> 2
- 5 -> 2
- 6 -> 2
- 7 -> 3
- 8 -> 3
- 9 -> 3
- 10 -> 4

從上面出現的次數，可以得知發現每超過 3 次的狀況，消除的次數就會+1。因此我們只需要把出現次數除 3，並無條件進位就可以知道出現次數消除所需的次數。

> Runtime: 111ms, 61.54%

> Memory Usage: 61.46MB, 23.08%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(n)$

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const x = new Map();
  for (let e of nums) {
    x.set(e, x.has(e) ? x.get(e) + 1 : 1);
  }

  let count = 0;
  const r = [...x].filter((ee) => {
    if (ee[1] === 1) {
      return true;
    }

    count += Math.ceil(ee[1] / 3);
  });

  return r.length === 0 ? count : -1;
};
```
