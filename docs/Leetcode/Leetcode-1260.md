---
id: Leetcode-1260
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

Given a 2D `grid` of size `m x n` and an integer `k`. You need to shift the `grid` `k` times.

In one shift operation:

- Element at `grid[i][j]` moves to `grid[i][j + 1]`.
- Element at `grid[i][n - 1]` moves to `grid[i + 1][0]`.
- Element at `grid[m - 1][n - 1]` moves to `grid[0][0]`.

Return the 2D grid after applying shift operation `k` times.

**Example 1**

![Example1](/img/tutorial/Leetcode/1260/1260-1.png)

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
Output: [[9,1,2],[3,4,5],[6,7,8]]
```

**Example 2**

![Example2](/img/tutorial/Leetcode/1260/1260-2.png)

```
Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
```

**Example 3**

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 9
Output: [[1,2,3],[4,5,6],[7,8,9]]
```

將二維陣列裡面的值進行 K 次旋轉。

## 題目難易度

Easy

## 解題想法

若要將每個值進行 K 次旋轉，會相當耗時。

若先建立好相同維度的二維陣列，並都先篩好 0 為預設值。

再去將每一個值去旋轉 K 次，去找到其最後的位置。

則每個值最後更動位置只需要做一次。

## 初試

> Runtime: 126ms

> Memory Usage: 46.9MB

```javascript
/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
  const arr = new Array(grid.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(grid[0].length).fill(0);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let p1 = i;
      let p2 = j + k;

      if (p2 >= grid[i].length) {
        p1 = p1 + parseInt(p2 / grid[i].length);
        p2 = p2 % grid[i].length;
      }

      if (p1 >= grid.length) {
        p1 = p1 % grid.length;
      }

      arr[p1][p2] = grid[i][j];
    }
  }
  return arr;
};
```
