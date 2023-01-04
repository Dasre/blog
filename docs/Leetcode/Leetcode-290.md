---
id: Leetcode-290
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/word-pattern/)

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.

**Example 1**

```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

**Example 2**

```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

**Example 3**

```
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
```

Constraints:

- 1 <= pattern.length <= 300
- pattern contains only lower-case English letters.
- 1 <= s.length <= 3000
- s contains only lowercase English letters and spaces ' '.
- s does not contain any leading or trailing spaces.
- All the words in s are separated by a single space.

簡單來說 pattern 每個字元會有一個對應的英文字詞，我們需要建立 mapping 的表並且確認是否正確。

## 題目難易度

Easy

## 解題想法

基本上只要確認幾點

1. pattern 的每個字元和 s 字串使用空格切割出來的長度會一樣(`pattern.length === s.split(" ").length`)
2. 不會有同樣的字元對應的內容是一樣的

依照上方的規則，我們只需要一步一步建立 mapping 表，在遇到 mapping 表有的去檢查其值是否相符合(不符合直接 retrun false)，若 mapping 表沒有的，則再多檢查對應的值是否有被其他字元使用，若有則一樣 return false。

## 初試

> Runtime: 57ms, 95.63%

> Memory Usage: 41.9MB, 68.56%

字元對應的內容是否有重複，應可以使用 new Set()去做，可以再減少 Array.includes()的 o(n)的時間複雜度。

```javascript
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const x = new Map();
  const xx = s.split(" ");
  const use = [];

  if (pattern.length !== xx.length) return false;

  for (let i = 0; i < pattern.length; i++) {
    if (!x.has(pattern[i])) {
      if (use.includes(xx[i])) {
        return false;
      }
      x.set(pattern[i], xx[i]);
      use.push(xx[i]);
    } else {
      if (x.get(pattern[i]) !== xx[i]) {
        return false;
      }
    }
  }
  return true;
};
```
