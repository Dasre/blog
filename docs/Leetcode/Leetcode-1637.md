---
id: Leetcode-1637
title: 1637. Widest Vertical Area Between Two Points Containing No Points
tags:
  - Leetcode
last_update:
  date: 2023-12-21
---

## 題目

[完整題目](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points/)

Given n points on a 2D plane where $points[i] = [x_i, y_i]$, Return the widest vertical area between two points such that no points are inside the area.

A vertical area is an area of fixed-width extending infinitely along the y-axis (i.e., infinite height). The widest vertical area is the one with the maximum width.

Note that points on the edge of a vertical area are not considered included in the area.

**Example 1**

![1](/img/tutorial/Leetcode/1637/1.png)

```
Input: points = [[8,7],[9,9],[7,4],[9,7]]
Output: 1
Explanation: Both the red and the blue area are optimal.
```

**Exmaple 2**

```
Input: points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]
Output: 3
```

**Constraints**

- n == points.length
- 2 <= n <= $10^5$
- points[i].length == 2
- 0 <= $x_i$, $y_i$ <= $10^9$

## 題目難易度

Medium

## 解題想法

題目要找點和點之間的 X 軸寬度不會有其他點，所以我們只需要拿 X 軸做排序，並找出點和點之間最大的寬度。

## 初試

> Runtime: 155ms, 22.53%

> Memory Usage: 62.25MB, 54.93%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxWidthOfVerticalArea = function (points) {
  points = points.sort((a, b) => a[0] - b[0]);

  let max = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] - points[i - 1][0] > max) {
      max = points[i][0] - points[i - 1][0];
    }
  }

  return max;
};
```
