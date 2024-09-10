---
id: Leetcode-2807
title: 2807. Insert Greatest Common Divisors in Linked List
tags:
  - Leetcode
last_update:
  date: 2024-09-10
---

## 題目

[完整題目](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/)

Given the head of a linked list `head`, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.

**Example 1**

![ex1](/img/tutorial/Leetcode/2807/ex1.png)

```
Input: head = [18,6,10,3]
Output: [18,6,6,2,10,1,3]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes (nodes in blue are the inserted nodes).
- We insert the greatest common divisor of 18 and 6 = 6 between the 1st and the 2nd nodes.
- We insert the greatest common divisor of 6 and 10 = 2 between the 2nd and the 3rd nodes.
- We insert the greatest common divisor of 10 and 3 = 1 between the 3rd and the 4th nodes.
There are no more adjacent nodes, so we return the linked list.
```

**Example 2**

![ex2](/img/tutorial/Leetcode/2807/ex2.png)

```
Input: head = [7]
Output: [7]
Explanation: The 1st diagram denotes the initial linked list and the 2nd diagram denotes the linked list after inserting the new nodes.
There are no pairs of adjacent nodes, so we return the initial linked list.
```

**Constraints**

- The number of nodes in the list is in the range [1, 5000].
- 1 \<= Node.val \<= 1000

## 題目難易度

Medium

## 解題想法

題目基本上就是要會打兩數的最大公因數，因此把最大公因數的公式搞定，剩下的就是 Linked List 如何操作。

## 初試

- Time Complexity: $O(n * log(min(a,b))$

  - 時間複雜度會有 $log(min(a,b)$ 是因為要找兩數的最大公因數

- Space Complexity: $O(1)$

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertGreatestCommonDivisors = function (head) {
  const divisor = (b, s) => {
    if (b % s === 0) return s;
    else return divisor(Math.max(b % s, s), Math.min(b % s, s));
  };

  if (head.next === null) {
    return head;
  }

  let n1 = head;
  let n2 = head.next;

  while (n2 != null) {
    const r = divisor(Math.max(n1.val, n2.val), Math.min(n1.val, n2.val));
    const node = new ListNode(r);

    n1.next = node;
    node.next = n2;

    n1 = n2;
    n2 = n2.next;
  }

  return head;
};
```
