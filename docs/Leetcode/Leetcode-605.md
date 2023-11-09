---
id: Leetcode-605
title: 605-Can Place Flowers
tags:
  - Leetcode
last_update:
  date: 2023-11-09
---

## 題目

<i>Can Place Flowers</i>

[完整題目](https://leetcode.com/problems/can-place-flowers/)

You have a long flowerbed in which some of the plots are planted, and some are not. However, flowers cannot be planted in adjacent plots.

Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not empty, and an integer n, return true if n new flowers can be planted in the flowerbed without violating the no-adjacent-flowers rule and false otherwise.

**Example 1**

```
Input: flowerbed = [1,0,0,0,1], n = 1
Output: true
```

**Example 2**

```
Input: flowerbed = [1,0,0,0,1], n = 2
Output: false
```

Constraints:

- 1 <= flowerbed.length <= 2 \* $10^4$
- flowerbed[i] is 0 or 1.
- There are no two adjacent flowers in flowerbed.
- 0 <= n <= flowerbed.length

相鄰的兩個地方無法都種植。

## 題目難易度

Easy

## 解題想法

逐一掃過，檢查尚未種植的地點左右兩側是否有種植。若兩者都沒種植，就標記為 1，並記錄標記幾次。

## 初試

- Time complexity: `O(n)`

- Space complexity: `O(1)`

```javascript
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
  let count = 0;
  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i] === 0) {
      let l = i === 0 || flowerbed[i - 1] === 0;
      let r = i === flowerbed.length - 1 || flowerbed[i + 1] === 0;
      if (l === true && r === true) {
        flowerbed[i] = 1;
        count += 1;
      }
    }
  }

  return count >= n;
};
```
