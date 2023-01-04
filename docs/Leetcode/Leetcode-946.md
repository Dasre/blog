---
id: Leetcode-946
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

Given two integer arrays pushed and popped each with distinct values, return true if this could have been the result of a sequence of push and pop operations on an initially empty stack, or false otherwise.

**Example 1**

```
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: We might do the following sequence:
push(1), push(2), push(3), push(4),
pop() -> 4,
push(5),
pop() -> 5, pop() -> 3, pop() -> 2, pop() -> 1
```

**Example 2**

```
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: 1 cannot be popped before 2.
```

根據 pushed 和 popped 兩 array 的資料，push 和 pop 完的 array 是否可以清空。

## 題目難易度

Medium

## 解題想法

透過兩 pointer 去紀錄 pushed 和 popped 目前操作到的進度。

先去將 pushed 內的 array 進度執行完，再一一確認 pop 的操作是否正確。

## 初試

> Runtime: 105ms

> Memory Usage: 42.8MB

```javascript
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
  let puP = 0;
  let poP = 0;

  let stack = [];

  while (puP < pushed.length) {
    if (stack[stack.length - 1] !== popped[poP]) {
      stack.push(pushed[puP]);
      puP++;
    } else {
      stack.pop();
      poP++;
    }
  }

  while (poP < popped.length) {
    if (stack[stack.length - 1] === popped[poP]) {
      stack.pop();
      poP++;
    } else {
      return false;
    }
  }

  return true;
};
```
