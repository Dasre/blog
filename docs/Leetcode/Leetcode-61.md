---
id: Leetcode-61
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/rotate-list/)

Linked List 旋轉。

## 題目難易度

Medium

## 解題想法

先找出 Linked List 總長度，再將 linked list 的頭尾相連，最後透過兩個 pointer 找出要切斷的位置，即成為一不會有 cycle 的 linked list。

## 初試

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head === null) return null;

  let tx = head;
  let len = 0;
  while (tx !== null) {
    len++;
    tx = tx.next;
  }
  k = k % len;
  let faster = head;
  let slower = head;

  for (let i = 0; i < k; i++) {
    faster = faster.next;
  }

  while (faster.next !== null) {
    faster = faster.next;
    slower = slower.next;
  }

  faster.next = head;
  head = slower.next;
  slower.next = null;
  return head;
};
```
