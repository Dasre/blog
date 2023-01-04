---
id: Leetcode-856
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/score-of-parentheses/)

Given a balanced parentheses string s, return the score of the string.

The score of a balanced parentheses string is based on the following rule:

- "()" has score 1.
- AB has score A + B, where A and B are balanced parentheses strings.
- (A) has score 2 \* A, where A is a balanced parentheses string.

**Example 1**

```
Input: s = "()"
Output: 1
```

**Example 2**

```
Input: s = "(())"
Output: 2
```

**Example 3**

```
Input: s = "()()"
Output: 2
```

字串 s 是一個括弧有成對的字串，根據括弧規則去計算字串分數。

## 題目難易度

Medium

## 解題想法

使用 stack 實作 FILO，簡單來說若字串符合題目需求，當遇到")"則目前 stack 最上方存的值會是"("，以此類推。

## 初試

> Runtime: 91ms

> Memory Usage: 41.9MB

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function (s) {
  let stack = [];
  let score = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(score);
      score = 0;
    } else {
      score = stack[stack.length - 1] + Math.max(2 * score, 1);
      stack.pop();
    }
  }

  return score;
};
```

## 修改

使用 Map 實作

## 修改

使用 Map 來實作

> Runtime: 88ms

> Memory Usage: 42.8MB

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const mapping = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
    } else if (s[i] === ")") {
      if (stack.pop(s[i]) !== mapping.get(")")) {
        return false;
      }
    } else if (s[i] === "}") {
      if (stack.pop(s[i]) !== mapping.get("}")) {
        return false;
      }
    } else if (s[i] === "]") {
      if (stack.pop(s[i]) !== mapping.get("]")) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
```
