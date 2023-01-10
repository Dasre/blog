---
id: Leetcode-144
title: Binary Tree Preorder Traversal
tags:
  - Leetcode
last_update:
  date: 2023-01-09
---

## 題目

[完整題目](https://leetcode.com/problems/binary-tree-preorder-traversal/description/)

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

**Constraints**

- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100

透過 preorder 的走法去把 node 紀錄出來。
preorder 的順序: 中 -> 左 -> 右
inorder 的順序: 左 -> 中 -> 右
postorder 的順序: 左 -> 右 -> 中

## 題目難易度

Easy

## 解題想法

簡單來說就是中左右的順序透過 recursive 的方法把每個 node 走過一次並記錄下來。

## 初試

> Runtime: 64ms, 82.81%

> Memory Usage: 42.2MB, 52.42%

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (!root) return [];

  let res = [root.val];
  res.push(...preorderTraversal(root.left));
  res.push(...preorderTraversal(root.right));

  return res;
};
```
