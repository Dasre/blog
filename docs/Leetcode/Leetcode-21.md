---
id: Leetcode-21
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/merge-two-sorted-lists/)

兩個 Linked List 做合併並從小到大。

## 題目難易度

Easy

## 解題想法

比較兩 Linked List 現在指到的值並比大小，較小的優先塞入暫存 Linked List 內。當其中一個 Linked List 填完，將另外一個 Linked List 裡面值放置暫存 Linked List 後。

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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  let link = new ListNode(0);
  let pointer = link;

  while (list1 !== null && list2 !== null) {
    if (list1.val > list2.val) {
      pointer.next = list2;
      list2 = list2.next;
    } else {
      pointer.next = list1;
      list1 = list1.next;
    }
    pointer = pointer.next;
  }

  if (list1 !== null) {
    pointer.next = list1;
  }

  if (list2 !== null) {
    pointer.next = list2;
  }

  return link.next;
};
```
