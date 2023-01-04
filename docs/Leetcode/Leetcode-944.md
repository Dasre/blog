---
id: Leetcode-944
title: 944-Delete Columns to Make Sorted
tags:
  - Leetcode
last_update:
  date: 2023-01-03
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

You are given an array of `n` strings `strs`, all of the same length.

The strings can be arranged such that there is one on each line, making a grid. For example, `strs = ["abc", "bce", "cae"]` can be arranged as:

```
abc
bce
cae
```

You want to delete the columns that are not sorted lexicographically. In the above example (0-indexed), columns 0 (`'a'`, `'b'`, `'c'`) and 2 (`'c'`, `'e'`, `'e'`) are sorted while column 1 (`'b'`, `'c'`, `'a'`) is not, so you would delete column 1.

Return the number of columns that you will delete.

**Example 1**

```
Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: The grid looks as follows:
  cba
  daf
  ghi
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.
```

**Example 2**

```
Input: strs = ["a","b"]
Output: 0
Explanation: The grid looks as follows:
  a
  b
Column 0 is the only column and is sorted, so you will not delete any columns.
```

**Example 3**

```
Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: The grid looks as follows:
  zyx
  wvu
  tsr
All 3 columns are not sorted, so you will delete all 3.
```

**Constraints**

- `n == strs.length`
- `1 <= n <= 100`
- `1 <= strs[i].length <= 1000`
- `strs[i]` consists of lowercase English letters.

確認題目給的 array，其越後面的每個字元是否有大於前面的。

## 題目難易度

Easy

## 解題想法

第一次做這個題目的時候，把題目想的太複雜，多去定義了英文字母的 mapping，再雙重迴圈。

第一個迴圈做每個 array 的每個字串，第二個迴圈去掃該字串的每個字元，再把該字元 mapping 結果存下來。若遇到某位元已經有錯了，則把該位元值換成-1，並把錯誤的位元+1。

## 初試

> Runtime: 195ms, 25.23%

> Memory Usage: 47.3MB, 34.58%

```javascript
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x, index) => [
    `${String.fromCharCode(x).toLowerCase()}`,
    index,
  ]);
  const x = new Map(alphabet);

  let num = 0;
  let nums = [];
  for (let i = 0; i < strs.length; i++) {
    for (let j = 0; j < strs[i].length; j++) {
      const target = x.get(strs[i][j]);
      if (i === 0) {
        nums.push(target);
      } else {
        if (nums[j] === -1) {
          continue;
        }
        if (nums[j] > target) {
          num++;
          nums[j] = -1;
        } else {
          nums[j] = target;
        }
      }
    }
  }

  return num;
};
```

## 可修改地方

其實可以直接把位元做比大小，JS 會轉成 UTF-16 編碼的數值，就可以快速的比較出大小。並且雙重迴圈的順序可以調換，第一個迴圈放每個字串的長度(因為題目有說字串長度都一樣)，第二個迴圈放題目 array 的長度。

再每個字元提 array 位置的內容做比較，若發現有 array 前面字串的位元比後面的大，則直接 break 掉迴圈，可以再減少迴圈執行的次數。

> Runtime: 130ms, 42.6%

> Memory Usage: 46.2MB, 60.75%

```javascript
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  let del = 0;

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length - 1; j++) {
      if (strs[j][i] > strs[j + 1][i]) {
        del++;
        break;
      }
    }
  }

  return del;
};
```
