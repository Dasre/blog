---
sidebar_position: 1
---

# Vue 模板

```javascript
new Vue({
  el: '#app',
  data: {
    message: 'OK',
    message2: '<h1>Hello</h1>',
    selected: false,
  },
  methods: {
    append() {
      this.message += '!';
    },
    toggle() {
      this.selected = !this.selected;
    },
  },
});
```

- {{}} 賦值

```html
<div id="app">
  <span>{{message}}</span>
</div>
```

- v-once 一次性賦值

```html
<div id="app">
  <span v-once>{{message}}</span>
</div>
```

- v-html 輸出原始 HTML（少用，可能會有 XSS 攻擊）

  確保資料來源可靠再使用

```html
<div id="app">
  <span v-html="message2"></span>
</div>
```

- v-bind (Dom Attribute)

  縮寫 v-bind => `:`

```html
<div id="app">
  <input type="checkbox" v-bind:checked="selected" />
  <button v-on:click="toggle">Toggle</button>
</div>
```

- v-on (監聽Dom事件)

  縮寫 v-on => `@`

```html

```
