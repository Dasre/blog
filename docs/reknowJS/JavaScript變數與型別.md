---
id: 1
---

# JavaScript型別

JavaScript的型別分成`原始型別`和`物件型別`兩種。

## 原始型別

### number

在其他語言中，數字可能會再分成float, double, int之類的，但在JavaScript中，不管是小數還是整數，型別都是number。

除了常見的小數和整數，還有像`Infinity`無限大、`-Infinity`負無限大與`NaN`（Not a number）這些特殊的值。

  * Infinity、-Infinity

    ![](/img/tutorial/reknowJS/1/1.png)

我們前面說到了`NaN`的字面意思是不是數字，但是當我們使用typeof去檢查型別時會發現奇怪的狀況
```javascript
typeof NaN // number
NaN === NaN // false
```

因此若要檢查變數是否為NaN，我們會透過`isNaN(value)`來判斷。
```js
isNaN(NaN); // true
isNaN(37); // false

isNaN("string") // true
isNaN("37"); // false, 字串"37"會被轉成數字37
```
:::tip

更多的`isNaN`結果可參考

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

:::

### string

基本上就是使用單引號`''`和雙引號`""`來表示為字串文字。

```js
// 輸入的文字含有引號
const text1 = "Let's do it"; // ok
const text2 = 'Let\'s do it'; // ok, 使用跳脫字元
const text3 = "Let's " + "do it";
```

在ES6提供字串模板的方式串接
```js
const test1 = "Let's do it";
const test2 = "Hello World";
const combine = `${test1} ${test2}`; // Let's do it Hello World
```
### boolean

基本上就是`true`和`false`。

隱含轉換的部分後面再說明。
### null、undefined

null可以代表值為空的狀況，也可以說是沒有值。

undefined比較偏向沒有去定義值或變數沒有宣告。

可以從Number()強制轉型發現
```js
Number(null) // 0
Number(undefined) // NaN
```

null與undefined做typeof檢查時，會發現
```js
typeof null // object (這是bug XDD)
typeof undefined // undefined
```
### symbol (ES6 新增)

## 物件型別
### Object
  * 原始型別封裝(Number, String, Boolean)
  * Object, Function, Array, Date, Math, RegExp ......
### Host
  * window, global
  * DOM

:::note 更新

* Author: Andy Chen
* Last-Modify: 2021/11/02

:::