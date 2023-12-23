---
id: Leetcode-1496
title: 1496. Path Crossing
tags:
  - Leetcode
last_update:
  date: 2023-12-23
---

## 題目

[完整題目](https://leetcode.com/problems/path-crossing/)

Given a string path, where path[i] = 'N', 'S', 'E' or 'W', each representing moving one unit north, south, east, or west, respectively. You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is, if at any time you are on a location you have previously visited. Return false otherwise.

**Example 1**

![1](/img/tutorial/Leetcode/1496/1.png)

```
Input: path = "NES"
Output: false
Explanation: Notice that the path doesn't cross any point more than once.
```

**Exmaple 2**

![2](/img/tutorial/Leetcode/1496/2.png)

```
Input: path = "NESWW"
Output: true
Explanation: Notice that the path visits the origin twice.
```

**Constraints**

- 1 \<= path.length \<= 104
- path[i] is either 'N', 'S', 'E', or 'W'.

## 題目難易度

Easy

## 解題想法

題目基本上就是要你從 0 開始上下左右移動，若移動的過程中，有走到之前走到的點就會傳 true，反之 false。

我們只需要使用一個 Set 去紀錄走過得點。移動完先檢查走到的點有沒有在 Set 裡面，沒有就在 Set 多紀錄現在走到的點，反之有就代表有走到過。

原本一開始走過的點是用 Array 去紀錄，並用`Array.includes`的語法去看每次移動完的點有沒有在 Array 裡。但因為`Array.includes`的操作時間複雜度為$O(n)$，所以改用`Set.has`（時間複雜度$O(1)$）的語法去檢查。

## 初試

> Runtime: 49ms, 74.82%

> Memory Usage: 42MB, 74.1%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function (path) {
  let x = 0;
  let y = 0;
  const visit = new Set();
  visit.add("0,0");

  for (let i = 0; i < path.length; i++) {
    if (path[i] === "N") {
      y += 1;
    } else if (path[i] === "S") {
      y -= 1;
    } else if (path[i] === "E") {
      x += 1;
    } else {
      x -= 1;
    }

    if (visit.has(`${x},${y}`)) return true;
    else visit.add(`${x},${y}`);
  }

  return false;
};
```
