---
id: Leetcode-881
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

You are given an array people where `people[i]` is the weight of the `ith` person, and an **infinite number of boats** where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return the minimum number of boats to carry every given person.

**Example 1**

```
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)
```

**Example 2**

```
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)
```

**Example 3**

```
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
```

**Constraints**

- 1 <= people.length <= 5 \* 10^4
- 1 <= people[i] <= limit <= 3 \* 10^4

題目簡單來說就是在 array 裡面最多兩數值相加若小於 limit，則可以捆為一包。

最終計算總共有幾包。

## 題目難易度

Medium

## 解題想法

先將題目給的 array 由小到大排序，再透過兩個 pointer 分別代表 array 頭和尾的位置。

簡單來說兩種狀況：

1. 頭 + 尾 <= limit，代表可以捆為一包，累計加一，頭往後移一格，尾往前移一格
2. 頭 + 尾 > limit，代表光是尾就是一包，累計加一，尾往前移一格

直到頭的位置比尾的位置還後面

但這樣會有一種特殊狀況，就是移完頭的位置 = 尾的位置

但這樣仍然會是一包，顧遇到這種狀況，額外將累計加一

## 初試

> Runtime: 202ms

> Memory Usage: 49.9MB

```javascript
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  const peopleSort = people.sort((a, b) => a - b);

  let p1 = 0;
  let p2 = peopleSort.length - 1;
  let number = 0;

  while (p1 < p2) {
    if (peopleSort[p1] + peopleSort[p2] <= limit) {
      number++;
      p1++;
      p2--;
    } else {
      number++;
      p2--;
    }
  }

  if (p1 === p2) {
    number++;
  }

  return number;
};
```
