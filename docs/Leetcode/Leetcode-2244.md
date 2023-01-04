---
id: Leetcode-2244
title: 2244-Minimum Rounds to Complete All Tasks
tags:
  - Leetcode
last_update:
  date: 2023-01-04
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/description/)

You are given a `0-indexed` integer array `tasks`, where `tasks[i]` represents the difficulty level of a task. In each round, you can complete either 2 or 3 tasks of the `same difficulty level`.

Return the `minimum` rounds required to complete all the tasks, or `-1` if it is not possible to complete all the tasks.

**Example 1**

```
Input: tasks = [2,2,3,3,2,4,4,4,4,4]
Output: 4
Explanation: To complete all the tasks, a possible plan is:
- In the first round, you complete 3 tasks of difficulty level 2.
- In the second round, you complete 2 tasks of difficulty level 3.
- In the third round, you complete 3 tasks of difficulty level 4.
- In the fourth round, you complete 2 tasks of difficulty level 4.
It can be shown that all the tasks cannot be completed in fewer than 4 rounds, so the answer is 4.
```

**Example 2**

```
Input: tasks = [2,3,3]
Output: -1
Explanation: There is only 1 task of difficulty level 2, but in each round, you can only complete either 2 or 3 tasks of the same difficulty level. Hence, you cannot complete all the tasks, and the answer is -1.
```

**Constraints**

- 1 <= tasks.length <= $10^5$
- 1 <= tasks[i] <= $10^9$

同樣 level 的任務一次可以處理 2 個或 3 個，我們需要先整理出每個 level 有多少個 tasks，再看是否可以全部的 tasks 都完成。

## 題目難易度

Medium

## 解題想法

題目的關鍵應該是在每個 level 的 tasks 中，是否可以被 2 和 3 的倍數相加處理完。

第一次做的時候，因題目是說可以同時做 2 個或 3 個 tasks，因此判斷 level 剩餘的 tasks 是否>=5，再針對剩餘數值`4`, `3`, `2`, `1`的狀況做處理。但採用持續扣減的做法在數值很大的時候，會需要花費非常多時間。因此還有優化的空間。

## 初試

> Runtime: 1827ms, 5.88%

> Memory Usage: 92.1MB, 5.88%

```javascript
/**
 * @param {number[]} tasks
 * @return {number}
 */
var minimumRounds = function (tasks) {
  let x = new Map();
  for (const task of tasks) {
    x.set(task, x.has(task) ? x.get(task) + 1 : 1);
  }

  let times = [];
  x.forEach((value, key) => {
    let time = 0;
    let target = value;

    while (target > 0) {
      console.log(target);
      if (target >= 5) {
        target -= 3;
        time++;
      } else {
        if (target === 1) {
          times.push(-1);
          return;
        }
        if (target === 2) {
          time++;
          target -= 2;
        }
        if (target === 3) {
          time++;
          target -= 3;
        }
        if (target === 4) {
          time++;
          target -= 2;
        }
      }
    }

    times.push(time);
  });

  return times.includes(-1) ? -1 : times.reduce((a, b) => a + b);
};
```

## 可修改地方

就像前面說的題目的重點是 2 和 3 的倍數相加是否可以完成 tasks。

也就是說 tasks 是 2 以上就可以完成。

- tasks 2 -> 1 次 (2 / 3 = 0.66 -> 1)
- tasks 3 -> 1 次 (3 / 3 = 1)
- tasks 4 -> 2 次 (4 / 3 = 1.33 -> 2)
- tasks 5 -> 2 次 (5 / 3 = 1.66 -> 2)
- tasks 6 -> 2 次 (6 / 3 = 2)

也就是說只有 tasks 不要是 1 的狀況，我們把 tasks / 3 再做無條件進位就可以算出每個 level 需要幾次才可以完成 tasks。

> Runtime: 217ms, 72.55%

> Memory Usage: 58.5MB, 70.59%

```javascript
/**
 * @param {number[]} tasks
 * @return {number}
 */
var minimumRounds = function (tasks) {
  const x = new Map();
  for (const task of tasks) {
    x.set(task, x.has(task) ? x.get(task) + 1 : 1);
  }

  let time = 0;
  for (const value of x.values()) {
    if (value === 1) return -1;
    time += Math.ceil(value / 3);
  }

  return time;
};
```
