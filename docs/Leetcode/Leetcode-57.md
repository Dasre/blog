---
id: Leetcode-57
title: Insert Interval
tags:
  - Leetcode
last_update:
  date: 2023-01-16
---

## 題目

[完整題目](https://leetcode.com/problems/insert-interval/description/)

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

**Example 1**

```
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

**Example 2**

```
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
```

**Constraints**

- 0 <= intervals.length <= $10^4$
- intervals[i].length === 2
- 0 <= $start_i$ <= $end_i$ <= $10^5$
- intervals is sorted by $start_i$ in ascending order
- newInterval.length == 2
- 0 <= start <= end <= $10^5$

newInterval 加入原本的 intervals 陣列後，從小到大排序且每個 interval 不會重疊。

## 題目難易度

Medium

## 解題想法

先把 newInterval 加入原有的 intervals，並透過第 0 個元素排序，這樣可以確保我們只需要排序第 1 個元素大小。我們只需要確認新的 interval 的第 0 個元素有沒有大於新的 interval 的第 1 個元素，有就代表前一個 interval 已經確認了可以直接插入新的，沒有就代表有重疊，再去取最大值比較。

## 初試

> Runtime: 81ms, 70.6%

> Memory Usage: 44.2MB, 56.50%

```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  let newArr = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  let result = [];
  for (let [x, y] of newArr) {
    if (result.length === 0 || result[result.length - 1][1] < x) {
      result.push([x, y]);
    } else {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], y);
    }
  }
  return result;
};
```
