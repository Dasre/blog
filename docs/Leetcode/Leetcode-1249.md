---
id: Leetcode-1249
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/)

Given a string s of '(' , ')' and lowercase English characters.

Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

Formally, a parentheses string is valid if and only if:

- It is the empty string, contains only lowercase characters, or
- It can be written as AB (A concatenated with B), where A and B are valid strings, or
- It can be written as (A), where A is a valid string.

**Example 1**

```
Input: s = "lee(t(c)o)de)"
Output: "lee(t(c)o)de"
Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
```

**Example 2**

```
Input: s = "a)b(c)d"
Output: "ab(c)d"
```

**Example 3**

```
Input: s = "))(("
Output: ""
Explanation: An empty string is also valid.
```

移除不必要的括弧使其字串括弧符合格式。

## 題目難易度

Medium

## 解題想法

一樣透過一 array 來處理字串，但這次 array 內會儲存括弧的位置。

簡單來說遇到`(`就把其在字串位置存進 array。當遇到`)`，若 array 內有`(`則 pop 出來，而若 array 沒有則將該位置的值變成空字串（代表括弧位置有誤，要移除）。

最後再檢查 array 內是否還有值，有值代表該括弧無法收尾，也需要將該括弧位置變成空字串。

## 初試

> Runtime: 96ms

> Memory Usage: 51.4MB

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  const stack = [];

  const sl = s.split("");

  let tmp = "";
  for (let i = 0; i < sl.length; i++) {
    const char = sl[i];

    if (sl[i] === "(") {
      stack.push(i);
    } else if (sl[i] === ")") {
      if (stack.length === 0) {
        sl[i] = "";
      } else {
        stack.pop();
      }
    }
  }

  for (let i = 0; i < stack.length; i++) {
    sl[stack[i]] = "";
  }

  return sl.join("");
};
```
