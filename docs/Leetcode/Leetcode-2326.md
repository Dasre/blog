---
id: Leetcode-2326
title: 2326. Spiral Matrix IV
tags:
  - Leetcode
last_update:
  date: 2024-09-09
---

## 題目

[完整題目](https://leetcode.com/problems/spiral-matrix-iv/description/)

You are given two integers `m` and `n`, which represent the dimensions of a matrix.

You are also given the `head` of a linked list of integers.

Generate an `m x n` matrix that contains the integers in the linked list presented in spiral order (clockwise), starting from the top-left of the matrix. If there are remaining empty spaces, fill them with `-1`.

Return the generated matrix.

**Example 1**

![ex1](/img/tutorial/Leetcode/2326/1.jpg)

```
Input: m = 3, n = 5, head = [3,0,2,6,8,1,7,9,4,2,5,5,0]
Output: [[3,0,2,6,8],[5,0,-1,-1,1],[5,2,4,9,7]]
Explanation: The diagram above shows how the values are printed in the matrix.
Note that the remaining spaces in the matrix are filled with -1.
```

**Example 2**

![ex2](/img/tutorial/Leetcode/2326/2.jpg)

```
Input: m = 1, n = 4, head = [0,1,2]
Output: [[0,1,2,-1]]
Explanation: The diagram above shows how the values are printed from left to right in the matrix.
The last space in the matrix is set to -1.
```

根據 pushed 和 popped 兩 array 的資料，push 和 pop 完的 array 是否可以清空。

## 題目難易度

Medium

## 解題想法

題目要求我們最終產生一二維陣列，且多餘的格子填上-1。因此我們的解題方法會是先產生一結果的二維陣列，並都填上-1，再依序往右、往下、往左、往上、往右...把 head 走完並把值填上對應的二維陣列上。

要注意的是題目不是單純的右下左上各走一次就做完，因此還需要檢查如果發現欄位的值不等於-1 時就要轉向。

## 初試

> Runtime: 484ms

> Memory Usage: 88.4MB

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
  const arr = Array.from({ length: m }, () => {
    return Array.from({ length: n }, () => -1);
  });

  const vector = [
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
    [-1, 0], // 上
  ];
  let direction = 0;
  let x = 0;
  let y = 0;

  while (head !== null) {
    arr[x][y] = head.val;

    let nx = x + vector[direction][0];
    let ny = y + vector[direction][1];
    if (nx >= m || ny >= n || nx < 0 || ny < 0 || arr[nx][ny] !== -1) {
      direction = (direction + 1) % 4;
    }
    x = x + vector[direction][0];
    y = y + vector[direction][1];

    head = head.next;
  }

  return arr;
};
```
