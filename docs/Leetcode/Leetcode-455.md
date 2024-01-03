---
id: Leetcode-455
title: 455. Assign Cookies
tags:
  - Leetcode
last_update:
  date: 2024-01-02
---

## 題目

[完整題目](https://leetcode.com/problems/assign-cookies/)

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor `g[i]`, which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

**Example 1**

```
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3.
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
```

**Exmaple 2**

```
Input: g = [1,2], s = [1,2,3]
Output: 2
Explanation: You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2.
You have 3 cookies and their sizes are big enough to gratify all of the children,
You need to output 2.
```

**Constraints**

- 1 \<= g.length \<= $3*10^4$
- 0 \<= s.length \<= $3*10^4$
- 1 \<= g[i], s[j] \<= $2^31$ - 1

## 題目難易度

Easy

## 解題想法

題目要找餅乾可以分給多少人，因為每個人要求的大小不同，我會先將人的需求和餅乾的大小從小到大做排序，在從尾開始看目前有的餅乾有多少人可以拿到。

## 初試

> Runtime: 78ms, 65.89%

> Memory Usage: 44.58MB, 71.26%

- 時間複雜度：$O(n*\log n + m*\log m)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  if (s.length === 0) return 0;
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  let i = g.length - 1;
  j = s.length - 1;

  while (i >= 0 && j >= 0) {
    if (s[j] >= g[i]) {
      res++;
      j--;
    }
    i--;
  }
  return res;
};
```
