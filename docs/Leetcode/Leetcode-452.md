---
id: Leetcode-452
title: Minimum Number of Arrows to Burst Balloons
tags:
  - Leetcode
last_update:
  date: 2023-01-05
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/)

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where points[i] = [$x_{start}$, $x_{end}$] denotes a balloon whose horizontal diameter stretches between $x_{start}$ and $x_{end}$. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with $x_{start}$ and $x_{end}$ is burst by an arrow shot at x if $x_{start}$ <= x <= $x_{end}$. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array `points`, return the minimum number of arrows that must be shot to burst all balloons.

**Example 1**

```
Input: points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
- Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].
```

**Example 2**

```
Input: points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.
```

**Example 3**

```
Input: points = [[1,2],[2,3],[3,4],[4,5]]
Output: 2
Explanation: The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
- Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
```

**Constraints**

- 1 <= points.length <= 105
- points[i].length == 2
- $-2^{31}$ <= $x_{start}$ < $x_{end}$ <= $2^{31} - 1$

題目要找最少做幾次可以把全部氣球刺破。

## 題目難易度

Medium

## 解題想法

題目給予每顆氣球 x 座標的起訖位置，也就是說如果氣球和氣球之間的起到訖有 1 個點重疊到，就可以一起處理。

我的作法是先將每顆氣球的起點位置從小到大排序，方便做比較。接下來拿每顆氣球的起點位置與前面的做比較(初始值起點和迄點給負無限是因為題目的 x 軸起點位置最小會是$-2^{31}$)。

假設每顆氣球的起點位置有在起點值和迄點之間，就代表可以一起刺破，同時要縮小起迄的位置，以確保可以一起刺破。若起點位置不在起點位置和迄點之間，代表是要多執行一次刺破的動作，並同時把起點位置和迄點位置替換成該氣球的路徑。

## 初試

> Runtime: 352ms, 60%

> Memory Usage: 75.6MB, 6.90%

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  const x = points.sort((a, b) => a[0] - b[0]);

  let time = 0;
  let pS = -Infinity;
  let pE = -Infinity;
  for (let i = 0; i < x.length; i++) {
    const [start, end] = x[i];

    if (pS <= start && start <= pE) {
      pS = Math.max(pS, start);
      pE = Math.min(pE, end);
    } else {
      time++;
      pS = start;
      pE = end;
    }
  }

  return time;
};
```
