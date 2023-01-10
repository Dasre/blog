---
id: Leetcode-100
title: Same Tree
tags:
  - Leetcode
last_update:
  date: 2023-01-10
---

## 題目

[完整題目](https://leetcode.com/problems/same-tree/description/)

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1**

```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2**

```
Input: p = [1,2], q = [1,null,2]
Output: false
```

**Example 3**

```
Input: p = [1,2,1], q = [1,1,2]
Output: false

```

**Constraints**

- The number of nodes in both trees is in the range [0, 100].
- $-10^4$ <= Node.val <= $10^4$

比較兩個 binary tree 是否相同

## 題目難易度

Easy

## 解題想法

解題上很簡單就是一個一個的去確認 tree 的 node 是否相同，若有一個不同則直接回傳 false(不論是兩者值不同或一個有 node 一個沒有)。

## 初試

> Runtime: 68ms, 73.1%

> Memory Usage: 42.6MB, 11.64%

```javascript
/**
 * @param {number[]} damage
 * @param {number} armor
 * @return {number}
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```
