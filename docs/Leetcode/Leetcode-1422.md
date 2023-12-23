---
id: Leetcode-1422
title: 1422. Maximum Score After Splitting a String
tags:
  - Leetcode
last_update:
  date: 2023-12-23
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-score-after-splitting-a-string/)

Given a string s of zeros and ones, return the maximum score after splitting the string into two `non-empty` substrings (i.e. `left` substring and `right` substring).

The score after splitting a string is the number of `zeros` in the `left` substring plus the number of `ones` in the `right` substring.

**Example 1**

```
Input: s = "011101"
Output: 5
Explanation:
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5
left = "01" and right = "1101", score = 1 + 3 = 4
left = "011" and right = "101", score = 1 + 2 = 3
left = "0111" and right = "01", score = 1 + 1 = 2
left = "01110" and right = "1", score = 2 + 1 = 3
```

**Exmaple 2**

```
Input: s = "1111"
Output: 3
```

**Constraints**

- 2 \<= s.length \<= 500
- The string `s` consists of characters '0' and '1' only.

## 題目難易度

Easy

## 解題想法

題目要將 1string 切成 2 個 string。切出來的左邊 string 要看有幾個 0，右邊 string 有幾個 1。

想法是先把 string 1 的個數找出來，接著掃過一次。掃過一次的用意是要去找出要切在哪個位置，因為最終 substring 不會是 non-empty substring，所以不必全部掃完，掃到字串長度-1 的位元就好。

在掃的過程中，當遇到是"1"的狀況就把一開始找的 1 的個數-1，代表右邊 substring 1 的個數會減少，遇到 0 就就是把 0 的個數+1，代表左邊 substring 的 0 的個數，再把 0 和 1 的個數相加，去找出 0 和 1 相加的 max 值就是答案了。

## 初試

> Runtime: 53ms, 81.82%

> Memory Usage: 42.3MB, 74.55%

- 時間複雜度：$O(n)$
- 空間複雜度：$O(1)$

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let one = s.split("").filter((e) => e === "1").length;
  let zero = 0;
  let ans = 0;

  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === "1") {
      one -= 1;
    } else {
      zero += 1;
    }

    ans = Math.max(ans, one + zero);
  }

  return ans;
};
```
