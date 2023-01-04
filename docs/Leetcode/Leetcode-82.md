---
id: Leetcode-82
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)

將一以排序的 linked list，刪除其中 val 重複的 nodes，並做排序。

## 題目難易度

Medium

## 解題想法

透過一 Object 紀錄每個 node val 出現次數，去除次數不等於 1 的，並重新產生一 linked list。

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
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let sets = new Object();
  let nexList = new ListNode(0);
  let first = nexList;
  while (head !== null) {
    if (sets[head.val] !== undefined) {
      sets[head.val] += 1;
    } else {
      sets[head.val] = 1;
    }

    head = head.next;
  }
  const setArr = Object.keys(sets)
    .map((key) => {
      return [key, sets[key]];
    })
    .sort((a, b) => {
      return a[0] - b[0];
    });

  for (let i in setArr) {
    if (setArr[i][1] === 1) {
      let tmpNode = new ListNode(Number(setArr[i][0]), null);
      first.next = tmpNode;
      first = first.next;
    }
  }

  return nexList.next;
};
```
