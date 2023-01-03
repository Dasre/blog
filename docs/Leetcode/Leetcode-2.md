---
id: Leetcode-2
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/add-two-numbers/)

給予兩個非空且值不為負數的 linked list，且這兩個 linked list 為 reverse order。將這兩個 linked list 轉為數字並相加，最後以 linked list 返回。

ex: l1 = [2,4,3], l2 = [5,6,4] => 342 + 465 = 807 => [7,0,8];

## 題目難易度

Medium

## 解題想法

因為題目有說這兩個 linked list 是 reverse order，所以兩個 linked list 的第一位都是個位數，下一個數都是十位數。

因此可以將兩個 linked list 的數字相加，做餘數可得知 node 的 val，做除法可得知是否有進位，若有進位再下一位數在相加判斷是否有再進位狀況。直到兩個 linked list 都走完且沒有進位狀況了。

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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let tmpNode = new ListNode(0);
  let head = tmpNode;
  let carry = 0; // 進位值

  while (l1 !== null || l2 !== null || carry > 0) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    sum += carry;

    carry = Math.floor(sum / 10);
    let tNode = new ListNode(sum % 10);
    head.next = tNode;
    head = head.next;
  }
  return tmpNode.next;
};
```
