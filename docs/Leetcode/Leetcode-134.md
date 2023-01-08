---
id: Leetcode-134
title: Gas Station
tags:
  - Leetcode
last_update:
  date: 2023-01-07
---

## 題目

[完整題目](https://leetcode.com/problems/gas-station/description/)

There are n gas stations along a circular route, where the amount of gas at the $i^{th}$ station is gas[i].

You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the $i^{th}$ station to its next $(i + 1)^{th}$ station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique

**Example 1**

```
Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
Output: 3
Explanation:
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.
```

**Example 2**

```
Input: gas = [2,3,4], cost = [3,4,3]
Output: -1
Explanation:
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.
```

**Constraints**

- n == gas.length == cost.length
- 1 <= n <= $10^5$
- 0 <= gas[i], cost[i] <= $10^4$

找出從哪一個加油站出發可以走完全程。

## 題目難易度

Medium

## 解題想法

用題目給的 example1 來看，從 index 3 的加油站出發，加了 4units，然後到 index 4 加油站要花 1units。換句話說，到了加油站會先加一定的 units gas，到了下一個加油站會再扣掉一定的 units。

所以我們只需要確認從各點出發的過程中，是否會有遇到加的油比花費的油多的狀況，接續導致油箱的油沒有的狀況。

不過再確認要從哪個點出發之前，我會先把題目加的油和花費的油做大小比較，加的油如果比花費的油少，就一定跑不完，可以直接 return -1。

## 初試

> Runtime: 89ms, 70.71%

> Memory Usage: 50.9, 33.75%

```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  if (gas.reduce((i, v) => i + v) < cost.reduce((i, b) => i + b)) return -1;

  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i];

    if (tank < 0) {
      tank = 0;
      start = i + 1;
    }
  }

  return start;
};
```
