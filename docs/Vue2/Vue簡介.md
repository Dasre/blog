---
sidebar_position: 1
---

# Vue簡介

Vue是一個MVVM架構的前端框架。

## Vue學習筆記
* Vue模板
  * v-if
  * v-else
  * v-for
  * ...
* Vue實例
  * data
  * props
  * computed
  * methods
  * watch
* Vue組件
  * webpack
  * Vue-cli

## Vue的渲染方式

Vue是採樣宣告式渲染（其實就是模板）的方式來把JavaScript的資料表現在網頁上，當有狀態或資料更新時，Vue會根據內容來判斷html的呈現內容。

舉例來說假使我的html是如下
```html
<div id="counter">
  <h1>0</h1>
  <button>+1</button>
</div>
```

今天我要把h1的tag作為count的計數呈現，button會將h1的count值+1。

傳統命令式寫法，也就是取值 + 1, 再重塞回h1
```javascript
document.querySelector('button').addEventListener('click', (el) => {
  const count = document.querySelector('h1').innerText;
  document.querySelector('h1').innerText = Number(count) + 1;
})
```

但在宣告事渲染中，我們會明確告知h1就是要呈現count值，button用來更新count的值，至於count值更新後要如何重新渲染，就交給框架處理。
```html
<div id="counter">
  <h1>{{count}}</h1>
  <button v-on:click="add">+1</button>
</div>
```
```js
new Vue({
  el: "#counter",
  data: {
    count: 0
  },
  methods: {
    add(){
      this.count += 1;
    }
  }
})
```