---
id: Leetcode-1436
title: 1436. Destination City
tags:
  - Leetcode
last_update:
  date: 2023-12-15
---

## 題目

[完整題目](https://leetcode.com/problems/destination-city/)

You are given the array paths, where paths[i] = [$cityA_i$, $cityB_i$] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, the city without any path outgoing to another city.

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.

**Example 1**

```
Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
Output: "Sao Paulo"
Explanation: Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" -> "New York" -> "Lima" -> "Sao Paulo".

```

**Example 2**

```
Input: paths = [["B","C"],["D","B"],["C","A"]]
Output: "A"
Explanation: All possible trips are:
"D" -> "B" -> "C" -> "A".
"B" -> "C" -> "A".
"C" -> "A".
"A".
Clearly the destination city is "A".
```

**Example 3**

```
Input: paths = [["A","Z"]]
Output: "Z"
```

**Constraints**

- 1 <= paths.length <= 100
- paths[i].length == 2
- 1 <= $cityA_i$.length, $cityB_i$.length <= 10
- $cityA_i$ != $cityB_i$
- All strings consist of lowercase and uppercase English letters and the space character.

## 題目難易度

Easy

## 解題想法

找到最終的目的地。因為題目不會有 loop 的狀況發生，我們可以先把城市 A 會到哪個城市 B 用 Map 記下來，最終直接一個一個查詢，直到最後一個城市 B 查不到下一個城市。

## 初試

> Runtime: 50ms, 86.71%

> Memory Usage: 44.15MB, 62.79%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1+n)$

```javascript
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const l = paths.length;

  const m = new Map();
  for (let i = 0; i < l; i++) {
    m.set(paths[i][0], paths[i][1]);
  }

  let r = paths[0][0];
  for (let i = 0; i < l; i++) {
    const x = m.get(r);
    if (x === undefined) return r;
    else r = x;

    if (i === l - 1) {
      return r;
    }
  }
};
```
