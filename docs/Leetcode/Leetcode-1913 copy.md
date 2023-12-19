---
id: Leetcode-661
title: 661. Image Smoother
tags:
  - Leetcode
last_update:
  date: 2023-12-19
---

## 題目

[完整題目](https://leetcode.com/problems/image-smoother/)

An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an image by rounding down the average of the cell and the eight surrounding cells (i.e., the average of the nine cells in the blue smoother). If one or more of the surrounding cells of a cell is not present, we do not consider it in the average (i.e., the average of the four cells in the red smoother).

![smooth](/img/tutorial/Leetcode/661/smoother-grid.jpg)

Given an m x n integer matrix img representing the grayscale of an image, return the image after applying the smoother on each cell of it.

**Example 1**

![1](/img/tutorial/Leetcode/661/1.jpg)

```
Input: img = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[0,0,0],[0,0,0],[0,0,0]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor(3/4) = floor(0.75) = 0
For the points (0,1), (1,0), (1,2), (2,1): floor(5/6) = floor(0.83333333) = 0
For the point (1,1): floor(8/9) = floor(0.88888889) = 0
```

**Exmaple 2**

![2](/img/tutorial/Leetcode/661/2.jpg)

```
Input: img = [[100,200,100],[200,50,200],[100,200,100]]
Output: [[137,141,137],[141,138,141],[137,141,137]]
Explanation:
For the points (0,0), (0,2), (2,0), (2,2): floor((100+200+200+50)/4) = floor(137.5) = 137
For the points (0,1), (1,0), (1,2), (2,1): floor((200+200+50+200+100+100)/6) = floor(141.666667) = 141
For the point (1,1): floor((50+200+200+200+200+100+100+100+100)/9) = floor(138.888889) = 138
```

**Constraints**

- m == img.length
- n == img[i].length
- 1 <= m, n <= 200
- 0 <= img[i][j] <= 255

## 題目難易度

Easy

## 解題想法

剛看到此題題目時，其實看不太懂題目的表達。最後直接參考 Ex1 和 Ex2 的中心的算法，把全部值加起來除以對應的數目。

選擇了一個最暴力的作法，陣列每個元素都掃過一次。但因為像在(0,0)這種在邊邊的欄位只會拿(0,1), (1,0), (1,1)和自己算，所以我們要取陣列值是要注意不要取道不存在的。

但也因為這種作法，讓空間複雜度需要 $O(m * n)$ 。如果能減少重複取以取過得值，應該能減少空間複雜度。

## 初試

> Runtime: 107ms, 61.73%

> Memory Usage: 49.16MB, 70.37%

- 時間複雜度：$O(m * n)$
- 空間複雜度：$O(m * n)$

```javascript
/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  let a = img.length;
  let b = img[0].length;

  let arr = Array.from({ length: a }, () => Array.from({ length: b }, () => 0));

  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      let sum = 0;
      let count = 0;

      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          if (0 <= x && x < a && 0 <= y && y < b) {
            sum += img[x][y];
            count++;
          }
        }
      }

      arr[i][j] = Math.floor(sum / count);
    }
  }

  return arr;
};
```
