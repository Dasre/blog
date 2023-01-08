---
id: Leetcode-1833
title: Maximum Ice Cream Bars
tags:
  - Leetcode
last_update:
  date: 2023-01-06
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-ice-cream-bars/description/)

It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are n ice cream bars. You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible.

Return the maximum number of ice cream bars the boy can buy with coins coins.

Note: The boy can buy the ice cream bars in any order.

**Example 1**

```
Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.
```

**Example 2**

```
Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.
```

**Example 3**

```
Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.
```

**Constraints**

- costs.length == n
- 1 <= n <= $10^5$
- 1 <= costs[i] <= $10^5$
- 1 <= coins <= $10^8$

題目找出最多可以買的冰淇淋棒數量。

## 題目難易度

Medium

## 解題想法

要買越多的冰淇淋棒，代表冰淇淋棒要越便宜才能買更多。因為題目說可以跳者買，所以我們先把冰淇淋棒按照價格從小到大排序，再去看現有的 conis 最多可以買到多少隻。

## 初試

> Runtime: 547ms, 10%

> Memory Usage: 55.9MB, 43.33%

```javascript
/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function (costs, coins) {
  const cS = costs.sort((a, b) => a - b);
  let total = 0;
  let use = 0;

  for (let i of cS) {
    total += i;
    if (total > coins) break;
    use++;
  }

  return use;
};
```
