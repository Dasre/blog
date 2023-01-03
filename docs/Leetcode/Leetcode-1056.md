---
id: Leetcode-1056
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/confusing-number/)

A confusing number is a number that when rotated `180` degrees becomes a different number with each digit valid.

We can rotate digits of a number by `180` degrees to form new digits.

When `0`, `1`, `6`, `8`, and `9` are rotated `180` degrees, they become `0`, `1`, `9`, `8`, and `6` respectively.
When `2`, `3`, `4`, `5`, and `7` are rotated `180` degrees, they become invalid.
Note that after rotating a number, we can ignore leading zeros.

For example, after rotating `8000`, we have `0008` which is considered as just `8`.
Given an integer `n`, return `true` if it is a confusing number, or `false` otherwise.

**Example 1**

```
Input: n = 6
Output: true
Explanation: We get 9 after rotating 6, 9 is a valid number, and 9 != 6.
```

**Example 2**

```
Input: n = 89
Output: true
Explanation: We get 68 after rotating 89, 68 is a valid number and 68 != 89.
```

**Example 3**

```
Input: n = 11
Output: false
Explanation: We get 11 after rotating 11, 11 is a valid number but the value remains the same, thus 11 is not a confusing number
```

Constraints:

- 0 <= n <= 109

先根據題目給的內容建立 mapping 表。在將題目倒轉，確認倒轉後的數值是否和原本相同。

## 題目難易度

Easy

## 解題想法

為了方便做每個字元的 mapping 確認，mapping 表均是使用字串，而題目給的部分翻轉會是`invalid`的字元，則用 null 表示。

先將題目給的字串反轉，接下來一個一個確認每個字元，若遇到題目給的 mapping 出來會是`invalid`的則直接回傳 false。

若均無`invalid`的狀況，則最後將所有 mapping 完的字元組成字串去比較和原本題目給的數值轉為字串是否相同。

## 初試

> Runtime: 63ms, 80%

> Memory Usage: 41.8MB, 76%

```javascript
/**
 * @param {number} n
 * @return {boolean}
 */
var confusingNumber = function (n) {
  const rMap = new Map([
    ["0", "0"],
    ["1", "1"],
    ["6", "9"],
    ["8", "8"],
    ["9", "6"],
    ["2", null],
    ["3", null],
    ["4", null],
    ["5", null],
    ["7", null],
  ]);

  const nArrayR = n.toString().split("").reverse();

  const xxA = [];

  for (let i = 0; i < nArrayR.length; i++) {
    const target = rMap.get(nArrayR[i]);
    if (target === null) {
      return false;
    }
    xxA.push(target);
  }

  return xxA.join("") === n.toString() ? false : true;
};
```
