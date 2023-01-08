---
id: Leetcode-2214
title: Minimum Health to Beat Game
tags:
  - Leetcode
last_update:
  date: 2023-01-08
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-health-to-beat-game/description/)

You are playing a game that has n levels numbered from 0 to n - 1. You are given a 0-indexed integer array damage where damage[i] is the amount of health you will lose to complete the ith level.

You are also given an integer armor. You may use your armor ability at most once during the game on any level which will protect you from at most armor damage.

You must complete the levels in order and your health must be greater than 0 at all times to beat the game.

Return the minimum health you need to start with to beat the game.

**Example 1**

```
Input: damage = [2,7,4,3], armor = 4
Output: 13
Explanation: One optimal way to beat the game starting at 13 health is:
On round 1, take 2 damage. You have 13 - 2 = 11 health.
On round 2, take 7 damage. You have 11 - 7 = 4 health.
On round 3, use your armor to protect you from 4 damage. You have 4 - 0 = 4 health.
On round 4, take 3 damage. You have 4 - 3 = 1 health.
Note that 13 is the minimum health you need to start with to beat the game.
```

**Example 2**

```
Input: damage = [2,5,3,4], armor = 7
Output: 10
Explanation: One optimal way to beat the game starting at 10 health is:
On round 1, take 2 damage. You have 10 - 2 = 8 health.
On round 2, use your armor to protect you from 5 damage. You have 8 - 0 = 8 health.
On round 3, take 3 damage. You have 8 - 3 = 5 health.
On round 4, take 4 damage. You have 5 - 4 = 1 health.
Note that 10 is the minimum health you need to start with to beat the game.
```

**Example 3**

```
Input: damage = [3,3,3], armor = 0
Output: 10
Explanation: One optimal way to beat the game starting at 10 health is:
On round 1, take 3 damage. You have 10 - 3 = 7 health.
On round 2, take 3 damage. You have 7 - 3 = 4 health.
On round 3, take 3 damage. You have 4 - 3 = 1 health.
Note that you did not use your armor ability.

```

**Constraints**

- n == damage.length
- 1 <= n <= $10^5$
- 0 <= damage[i] <= $10^5$
- 0 <= armor <= $10^5$

要跑完每一個關卡下，只能再一個關卡使用護盾，最少需要多少血量。

## 題目難易度

Medium

## 解題想法

就題目來說，護盾只能再一個關卡中使用。所以要有效利用護盾，一定是用在會消耗最多血量的關卡。

所以我們只需要把全部關卡需要消耗的血量加總，再去扣掉護盾使用的關卡(因為消耗的血量有可能會比護盾還少，所以我們要找出該關卡護盾和消耗血量的最小值)‧

上方扣除完後就是跑完全不關卡會消耗的血量，最後我們只需要再加一滴血就是答案。

## 初試

> Runtime: 83ms, 96.74%

> Memory Usage: 54MB, 52.17%

```javascript
/**
 * @param {number[]} damage
 * @param {number} armor
 * @return {number}
 */
var minimumHealth = function (damage, armor) {
  const allDamage = damage.reduce((a, b) => a + b);
  const maxDamage = Math.max(...damage);

  return allDamage - Math.min(maxDamage, armor) + 1;
};
```
