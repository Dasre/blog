---
id: Leetcode-1007
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-domino-rotations-for-equal-row/)

In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

If it cannot be done, return -1.

![](/img/tutorial/Leetcode/1007/Leetcode-1007-Q.png)

**Example 1**

```
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation:
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.
```

**Example 2**

```
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation:
In this case, it is not possible to rotate the dominoes to make one row of values equal.
```

找出最少旋轉次數能使骨牌上半部或下半部的值可以一致。

## 題目難易度

Medium

## 解題想法

一開始看到這個題目的想法是要把上半部和下半部各數值出現的次數一起加總，如果某數值出現次數大於等於上半部或下半部的長度，代表有機會透過旋轉使上半部或下半部一致。

但這個作法還要額外處理若上半部加下半部的值剛好為兩種且出現次數都一樣的狀況，判斷式寫起來較為複雜。

在經過思考後，決定先抓取出上半部和下半部的第一個值，畢竟若第一個值旋轉的沒用，就代表也不用找最小次數了。

接著就是把上半部和下半部的 array 去與前面抓的上半部和下半部的第一個值最比較。

大致上會出現兩種狀況：

1. 上半部和下半部某位數的值和抓取值都不符，基本上這個目標值也不要再找最小次數。
2. 上半部或下半部某位數和抓取值相符，我們這邊只需要將不符的最累計。

最後在上半部和下半部 array 都檢查完的狀況下，去看上半部和下半部與這個抓取值不符的累計次數，找出要旋轉上半部還是下半部的次數，即是答案。

## 初試

> Runtime: 84ms

> Memory Usage: 51.5MB

```javascript
/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function (tops, bottoms) {
  const topTarget = tops[0];
  const bottomTarget = bottoms[0];

  for (const target of [topTarget, bottomTarget]) {
    let topCount = 0;
    let bottomCount = 0;

    for (let i = 0; i < tops.length; i++) {
      if (tops[i] !== target && bottoms[i] !== target) break;
      if (tops[i] !== target) topCount++;
      if (bottoms[i] !== target) bottomCount++;

      if (i === tops.length - 1) return Math.min(topCount, bottomCount);
    }
  }

  return -1;
};
```
