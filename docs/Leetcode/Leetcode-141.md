---
id: Leetcode-141
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/linked-list-cycle/)

找出 Linked List 有沒有 cycle。

## 題目難易度

Easy

## 解題想法

使用兩個 pointer
一個一次位移一格(慢 pointer)
一個一次位移兩格(快 pointer)

如果此 linked list 有 cycle，兩個 pointer 會相遇

## 初試

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let pointer1 = head;
  let pointer2 = head;

  while (pointer2 && pointer2.next) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next.next;

    if (pointer1 === pointer2) return true;
  }

  return false;
};
```
