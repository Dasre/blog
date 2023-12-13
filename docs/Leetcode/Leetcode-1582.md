---
id: Leetcode-1582
title: 1582. Special Positions in a Binary Matrix
tags:
  - Leetcode
last_update:
  date: 2023-12-13
---

## 題目

[完整題目](https://leetcode.com/problems/special-positions-in-a-binary-matrix/)

Given an `m x n` binary matrix `mat`, return the number of special positions in `mat`.

A position $(i, j)$ is called special if $mat[i][j] == 1$ and all other elements in row i and column j are 0 (rows and columns are 0-indexed).

**Example 1**

![ex1](/static/img/tutorial/Leetcode/1582/special1.jpg)

```
Input: mat = [[1,0,0],[0,0,1],[1,0,0]]
Output: 1
Explanation: (1, 2) is a special position because mat[1][2] == 1 and all other elements in row 1 and column 2 are 0.

```

**Example 2**

![ex2](/static/img/tutorial/Leetcode/1582/special-grid.jpg)

```
Input: mat = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: (0, 0), (1, 1) and (2, 2) are special positions.
```

**Constraints**

- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 100
- mat[i][j] is either 0 or 1.

## 題目難易度

Easy

## 解題想法

看到題目第一眼的想法是暴力破解，把矩陣內每個元素走過一次，若遇到值為 1 的，再去檢查這個值的行與列其他值是否為 0，若都為 0 再累計。

但相對的這個方法在矩陣的大小很大的時候，時間複雜度會很高。

## 初試

> Runtime: 67ms, 26.14%

> Memory Usage: 44.5MB, 60.23%

- 時間複雜度：$O(m*n*(m+n))$
- 空間複雜度：$O(1)$

```javascript
/**
/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function (mat) {
  let time = 0;
  let m = mat.length;
  let n = mat[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        continue;
      }

      let ok = true;
      for (let ii = 0; ii < m; ii++) {
        if (ii !== i && mat[ii][j] === 1) {
          ok = false;
          break;
        }
      }

      for (let jj = 0; jj < n; jj++) {
        if (jj !== j && mat[i][jj] === 1) {
          ok = false;
          break;
        }
      }

      if (ok) {
        time++;
      }
    }
  }

  return time;
};
```

## 可修改地方

以這題題目來說，題目要找的行或列均只能只有一個 1。也就是說我們可以一層一層篩過，先把每一列篩過一次，把列加總為 1 的列找出來。

再來用`Array.indexOf()`的方法找出為 1 的欄位位置。最終把這一欄的值都加總判斷是否為 1。

因為我們不用每一個值都檢查，只需要先檢查所有列，再去找對應的欄位。時間複雜度上可以減少再成 n 次的需求。

> Runtime: 51ms, 88.64%

> Memory Usage: 44.3MB, 73.86%

- 時間複雜度：$O(m*(m+n))$
- 空間複雜度：$O(n)$

```javascript
/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSpecial = function (mat) {
  let time = 0;
  let m = mat.length;

  for (let i = 0; i < m; i++) {
    if (mat[i].reduce((acc, val) => acc + val, 0) === 1) {
      const nPath = mat[i].indexOf(1);

      r = mat.reduce((acc, val) => acc + val[nPath], 0);
      if (r === 1) {
        time++;
      }
    }
  }

  return time;
};
```
