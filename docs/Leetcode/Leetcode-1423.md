---
id: Leetcode-1423
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/)

算出所選張數最大的數字合。

因為題目有要求第一步驟要先在陣列頭或陣列尾選取。

## 解題想法

將可選擇的張數組合先選取好，再根據可選張數一組一組去比較大小。

## 初試

```javascript
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  if (cardPoints.length === k) {
    return cardPoints.reduce(reducer);
  }
  let newArr = cardPoints.concat(cardPoints);

  const arr = newArr.slice(cardPoints.length - k, cardPoints.length + k);

  let max = arr.slice(0, k).reduce(reducer);
  let now = max;

  for (let i = 0; i < k; i++) {
    let sum = now - arr[i] + arr[i + k];
    console.log(sum, max);
    if (sum > max) {
      max = sum;
    }
    now = sum;
  }
  return max;
};
```

這個寫法在題目給的 cardPoints 長度不大且可選取張數 k 不大時是可以用的，但同樣的當 cardPoints 和 k 變大時(題目給的範圍是 1<=cardPoints.length <= 10^5, 1<=k <=cardPoints.length)，在先列出組合的 array 就很容易導致 memory 吃很大且運算時間拉長。

## 可修改地方

![](/img/tutorial/Leetcode/1423/1.JPG)

我們用上面那張圖來說明。根據圖，這時的 cardPoints 長度會為 6，假如我們 k 為 3，那我們可選取的組合應該會有

- [R, O, Y] => sum = R + O + Y
- [I, R, O] => sum = sum - Y + I
- [B, I, R] => sum = sum - O + B
- [G, B, I] => sum = sum - R + G

在算出第一個組合的總和後，可以明顯發現接下來的組合大小就是減去從陣列頭開始的數字，並加入陣列尾的數字。

也就是說我們要比較各種組合的大小時，我們是有一個規律去控制取陣列頭或陣列尾的元素。因此也就不必再把各種組合的陣列給組出來。

```javascript=
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let max = cardPoints.slice(0, k).reduce((a, b) => a+b);
    let now = max;

    let left = k - 1;
    let right = cardPoints.length - 1;

    for(let i=0; i< k; i++){
       now = now - cardPoints[left--] + cardPoints[right--];
        max = Math.max(now, max);
    }

    return max;
};
```
