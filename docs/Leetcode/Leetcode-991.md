---
id: Leetcode-991
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

There is a broken calculator that has the integer startValue on its display initially. In one operation, you can:

- multiply the number on display by 2, or
- subtract 1 from the number on display.

Given two integers startValue and target, return the minimum number of operations needed to display target on the calculator.

**Example 1**

```
Input: startValue = 2, target = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.
```

**Example 2**

```
Input: startValue = 5, target = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.
```

**Example 3**

```
Input: startValue = 3, target = 10
Output: 3
Explanation: Use double, decrement and double {3 -> 6 -> 5 -> 10}.
```

在只有乘 2 和減 1 的狀況，找出起始值變成目標值最少步驟次數。

## 題目難易度

Medium

## 解題想法

## 初試

> Runtime: 72ms

> Memory Usage: 41.7MB

```javascript
/**
 * @param {number} startValue
 * @param {number} target
 * @return {number}
 */
var brokenCalc = function (startValue, target) {
  let time = 0;

  while (startValue < target) {
    if (target % 2 === 0) {
      target = target / 2;
    } else {
      target++;
    }
    time++;
  }
  return time + startValue - target;
};
```
