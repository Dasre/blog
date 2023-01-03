---
id: Leetcode-20
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/valid-parentheses/)

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Note that an empty string is also considered valid.

**Example 1**

```
Input: s = "()"
Output: true
```

**Example 2**

```
Input: s = "()[]{}"
Output: true
```

**Example 3**

```
Input: s = "(]"
Output: false
```

## 題目難易度

Easy

## 解題想法

使用 stack 實作 FILO，簡單來說若字串符合題目需求，當遇到")"則目前 stack 最上方存的值會是"("，以此類推。

## 初試

> Runtime: 401ms

> Memory Usage: 51MB

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "(":
      case "{":
      case "[":
        stack.push(s[i]);
        console.log(stack);
        break;
      case ")":
        if (stack.pop(s[i]) !== "(") {
          return false;
        }
        break;
      case "}":
        if (stack.pop(s[i]) !== "{") {
          return false;
        }
        break;
      case "]":
        if (stack.pop(s[i]) !== "[") {
          return false;
        }
        break;
    }
  }

  return stack.length === 0;
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
