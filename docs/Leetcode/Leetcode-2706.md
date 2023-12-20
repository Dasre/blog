---
id: Leetcode-2706
title: 2706. Buy Two Chocolates
tags:
  - Leetcode
last_update:
  date: 2023-12-20
---

## 題目

[完整題目](https://leetcode.com/problems/buy-two-chocolates/)

You are given an integer array prices representing the prices of various chocolates in a store. You are also given a single integer money, which represents your initial amount of money.

You must buy `exactly` two chocolates in such a way that you still have some `non-negative` leftover money. You would like to minimize the sum of the prices of the two chocolates you buy.

Return the amount of money you will have leftover after buying the two chocolates. If there is no way for you to buy two chocolates without ending up in debt, return money. Note that the leftover must be non-negative.

**Example 1**

```
Input: prices = [1,2,2], money = 3
Output: 0
Explanation: Purchase the chocolates priced at 1 and 2 units respectively. You will have 3 - 3 = 0 units of money afterwards. Thus, we return 0.
```

**Exmaple 2**

```
Input: prices = [3,2,3], money = 3
Output: 3
Explanation: You cannot buy 2 chocolates without going in debt, so we return 3.
```

**Constraints**

- 2 <= prices.length <= 50
- 1 <= prices[i] <= 100
- 1 <= money <= 100

## 題目難易度

Easy

## 解題想法

題目要求剛剛好買兩塊巧克力，且要把購買的兩塊巧克力價格最小化。所以我們只需要排序價格，找出最便宜的兩塊。若這兩塊加起來金額大於有的金額，就回傳手上有的金額，反之就最相減看剩多少錢。

## 初試

> Runtime: 85ms, 64.07%

> Memory Usage: 46.47MB, 60.74%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {number[]} prices
 * @param {number} money
 * @return {number}
 */
var buyChoco = function (prices, money) {
  prices = prices.sort((a, b) => a - b);
  if (prices[0] + prices[1] > money) return money;
  else return money - prices[0] - prices[1];
};
```
