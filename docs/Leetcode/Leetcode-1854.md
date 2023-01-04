---
id: Leetcode-1854
tags:
  - Leetcode
---

## 題目

[完整題目](https://leetcode.com/problems/maximum-population-year/)

找出人口最多的最早年份

## 題目難易度

Easy

## 解題想法

先透過字典的概念將每個年份的人口統計出來，再找尋年份最早且人口最多的。

## 初試

```javascript
/**
 * @param {number[][]} logs
 * @return {number}
 */

var maximumPopulation = function (logs) {
  const dict = new Map();
  let max = 0;
  let num = 0;
  for (let i = 0; i < logs.length; i++) {
    for (let j = 0; j <= 1; j++) {
      max = logs[i][j];

      logs.map((item) => {
        if (item[0] <= max && item[1] > max) {
          num += 1;
        }
      });

      dict.set(max, num);

      max = 0;
      num = 0;
    }
  }

  let re = 10000;
  let ma = 0;

  dict.forEach((value, key) => {
    if (value > ma) {
      re = key;
      ma = value;
    } else if (value === ma && re > key) {
      re = key;
      ma = value;
    }
  });

  return re;
};
```

## 可修改地方

組成字典部分，因為題目有限制說年份會在 1950-2050 之間，也可以直接對這個區間去進行統計每個年份有幾人(這樣也不用用字典概念，用 array 直接存)。

```
/**
 * @param {number[][]} logs
 * @return {number}
 */
var maximumPopulation = function(logs) {
    const arr = new Array(101).fill(0);

    let pre = 1950;

    for(let [b, d] of logs){
        for(let i = b - pre; i < d-pre; i++){
            arr[i]++;
        }
    }


    let maxNumber = arr[0];
    let maxNumberIndex = 0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] > maxNumber){
            maxNumber = arr[i];
            maxNumberIndex = i;
        }
    }

    return maxNumberIndex+pre;
};
```

這個做法可以減少記憶體的存取，但相對的找最找年份因為都是用 101 個年份的資料去比對，在運算時間會較久。
