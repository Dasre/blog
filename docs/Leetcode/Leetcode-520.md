---
id: Leetcode-520
title: 520-Detect Capital
tags:
  - Leetcode
last_update:
  date: 2023-01-03
---

## 題目

<i>Detect Capital</i>

[完整題目](https://leetcode.com/problems/detect-capital/description/)

We define the usage of capitals in a word to be right when one of the following cases holds:

- All letters in this word are capitals, like "USA".
- All letters in this word are not capitals, like "leetcode".
- Only the first letter in this word is capital, like "Google".

Given a string `word`, return `true` if the usage of capitals in it is right.

**Example 1**

```
Input: word = "USA"
Output: true
```

**Example 2**

```
Input: word = "FlaG"
Output: false
```

Constraints:

- `1 <= word.length <= 100`
- `word` consists of lowercase and uppercase English letters.

檢查題目給的文字是否符合全大寫 or 全小寫 or 第一字大小其他泉小寫的規則。

## 題目難易度

Easy

## 解題想法

把每個規則的正規式都寫出來，再分別去測試是否符合正規式條件，若有一符合則回傳 true。

## 初試

> Runtime: 52ms, 99.73%

> Memory Usage: 42MB, 87.77%

每個

```javascript
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  let re = false;
  const allCapitals = new RegExp("^[A-Z]+$");
  const allNCapitals = new RegExp("^[a-z]+$");
  const oneCapitals = new RegExp("^[A-Z]{1}[a-z]+$");

  if (allCapitals.test(word)) re = true;
  if (allNCapitals.test(word)) re = true;
  if (oneCapitals.test(word)) re = true;
  return re;
};
```
