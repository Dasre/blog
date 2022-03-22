---
id: Leetcode-144
---

## 題目

[完整題目](https://leetcode.com/problems/binary-tree-preorder-traversal/)

Given the root of a binary tree, return the preorder traversal of its nodes' values.

**Example 1**

```
Input: root = [1,null,2,3]
Output: [1,2,3]
```

**Example 2**

```
Input: root = []
Output: []
```

**Example 3**

```
Input: root = [1]
Output: [1]
```

簡單來說就是整理 path。

## 題目難易度

Medium

## 解題想法

先透過字串分割`/`，並去除分割完為空字串的部分。這時分割完的陣列會出現四種狀況，我們需將這四種狀況整理至一陣列，最後再組成文字。

四種狀況：

- `.`: 不做任何事情
- `..`: 要回上一層，所以就 array.pop();
- `...`: array.push()(加入 array)
- `<不包括.與/的文字>`: array.push()(加入 array)

## 初試

> Runtime: 100ms

> Memory Usage: 47MB

```javascript
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  /**
   * @param {string} path
   * @return {string}
   */
  var simplifyPath = function (path) {
    const parts = path.split('/').filter((item) => item);
    const stack = [];
    for (let i of parts) {
      if (i === '..') {
        stack.pop();
      } else if (i === '.') {
      } else {
        stack.push(i);
      }
    }
    return `/${stack.join('/')}`;
  };
};
```
