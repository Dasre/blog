---
id: Leetcode-71
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/simplify-path/)

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

The canonical path should have the following format:

- The path starts with a single slash '/'.
- Any two directories are separated by a single slash '/'.
- The path does not end with a trailing '/'.
- The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')

Return the simplified canonical path.

**Example 1**

```
Input: path = "/home/"
Output: "/home"
Explanation: Note that there is no trailing slash after the last directory name.
```

**Example 2**

```
Input: path = "/../"
Output: "/"
Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
```

**Example 3**

```
Input: path = "/home//foo/"
Output: "/home/foo"
Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
```

簡單來說就是整理 path。

## 題目難易度

Medium

## 解題想法

先透過字串分割`/`，並去除分割完為空字串的部分。這時分割完的陣列會出現四種狀況，我們需將這四種狀況整理至一陣列，最後再組成文字。

四種狀況：

- `.`: 不做任何事情
- `..`: 要回上一層，所以就 array.pop();
- `...`: array.push()(加入 array)
- `<不包括.與/的文字>`: array.push()(加入 array)

## 初試

> Runtime: 100ms

> Memory Usage: 47MB

```javascript
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  /**
   * @param {string} path
   * @return {string}
   */
  var simplifyPath = function (path) {
    const parts = path.split("/").filter((item) => item);
    const stack = [];
    for (let i of parts) {
      if (i === "..") {
        stack.pop();
      } else if (i === ".") {
      } else {
        stack.push(i);
      }
    }
    return `/${stack.join("/")}`;
  };
};
```
