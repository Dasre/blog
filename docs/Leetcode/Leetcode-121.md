---
id: Leetcode-121
title: 121. Best Time to Buy and Sell Stock
tags:
  - Leetcode
  - Leetcode 75
last_update:
  date: 2024-09-24
---

## 題目

[完整題目](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)

You are given an array `prices` where `prices[i]` is the price of a given stock on the $i^{\text{th}}$ day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

**Example 1**

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2**

```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints**

- $1 \le prices.length \le 10^5 $
- $0 \le prices[i] \le 10^4$

## 題目難易度

Easy

## 解題想法

找出股票賣買賣的時間點，並找出最大利潤。透過一次遍歷價格資料來持續更新購買的價格與最大利潤，最終找出結果。

## DP

- Time Complexity: $O(n)$
- Space Complexity: $O(1)$

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let buy = prices[0];
  let max = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < buy) buy = prices[i];
    max = Math.max(max, prices[i] - buy);
  }
  return max;
};
```
