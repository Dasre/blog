---
id: Leetcode-729
title: 729. My Calendar I
tags:
  - Leetcode
last_update:
  date: 2024-09-26
---

## 題目

[完整題目](https://leetcode.com/problems/my-calendar-i/description/)

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a <b>double booking</b>.

A double booking happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendar` class:

- `MyCalendar()` Initializes the calendar object.
- `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar successfully without causing a double booking. Otherwise, return `false` and do not add the event to the calendar.

**Example 1**

```
Input
["MyCalendar", "book", "book", "book"]
[[], [10, 20], [15, 25], [20, 30]]
Output
[null, true, false, true]

Explanation
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.
```

**Constraints**

- $0 \le start < end \le 10^9$
- At most `1000` calls will be made to `book`.

## 題目難易度

Medium

## 解題想法

基本上就是確認 schedule 有沒有重複到。

## 暴力破解

- Time Complexity: $O(n^2)$
- Space Complexity: $O(n)$

直觀的暴力破解就是雙迴圈解決。

```js
var MyCalendar = function () {
  this.state = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  for (const [s, e] of this.state) {
    if (s < end && start < e) return false;
  }
  this.state.push([start, end]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
```

## Sorted Array + Binary Search

- Time Complexity: $O(n*logn)$
- Space Complexity: $O(n)$

我們把現在在排的時程表弄成一個有排序的，就可以透過 binary search 的方式，找到指定插入的位置，或是知道時程已被佔用。

```js
var MyCalendar = function () {
  this.state = [];
};

/**
 * @param {number} start
 * @param {number} end
 * @return {boolean}
 */
MyCalendar.prototype.book = function (start, end) {
  let left = 0;
  let right = this.state.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const [s, e] = this.state[mid];

    if (end <= s) {
      right = mid - 1;
    } else if (start >= e) {
      left = mid + 1;
    } else {
      return false;
    }
  }

  this.state.splice(left, 0, [start, end]);
  return true;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
```
