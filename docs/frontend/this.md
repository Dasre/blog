---
id: JavaScript This
---

## This 規律

- 在函式中，this 沒有被明確指定的或沒有透過物件來呼叫時（非顯性或隱性呼叫函式），在嚴格模式下函數內的 this 會被綁定到 undefined，非嚴格模式下會被綁定到全域物件 window/global 上。
- 一般透過上下文物件呼叫函數時，函數本體的 this 會被綁定到該物件上。
- 透過 call/apply/bind 方法顯性呼叫函數時，函數本體內的 this 會被綁定到指定的參數物件上。
- 使用 new 方法呼叫建構函數，this 會被綁定到新建立的物件上。
- 在箭頭函式中，this 的指向由外層（函數 or 全域）作用域來決定。

### this 沒有被明確指定的或沒有透過物件來呼叫時

在全域環境中執行，所以指向 window

```javascript
function f1() {
  console.log(this);
}

function f2() {
  "use strict";
  console.log(this);
}

f1(); // window
f2(); // undefined
```

因為 fn1 實際上是在全域環境中執行，所以還是指向 window

```javascript
function foo = {
    bar: 10,
    fn: function() {
        console.log(this)
        console.log(this.bar)
    }
}

var fn1 = foo.fn;
fn1();
// window
// undefined
```

除非被有顯性的綁定，不然函數中的 this 會指向上一級的物件；反之指向全域。

```javascript
const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};

foo.fn();
// {bar: 10, fn: f}
// 10
```

### 上下文呼叫的 this

一般來說 this 會被綁定到呼叫的物件上

```javascript
const student = {
  name: "Lucas",
  fn: function () {
    return this;
  },
};

console.log(student.fn() === student); // true

const person = {
  name: "Lucas",
  brother: {
    name: "Mike",
    fn: function () {
      return this.name;
    },
  },
};

console.log(person.brother.fn()); // Mike
```

以下範例因為呼叫 fn()時沒有明確的上下文，所以還是指向 window，但 window 之中沒有 text，所以回傳 undefined

```javascript
const o1 = {
  text: "o1",
  fn: function () {
    return this.text;
  },
};

const o2 = {
  text: "o2",
  fn: function () {
    return o1.fn();
  },
};

const o3 = {
  text: "o3",
  fn: function () {
    var fn = o1.fn;
    return fn();
  },
};

console.log(o1.fn()); // o1
console.log(o2.fn()); // o1
console.log(o3.fn()); // undefined
```

如果要讓 o2.fn()回傳 o2

```javascript
// 只要是使用o2.fn()，都會明確把this指向o2
...
const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn.call(this)
    // return o1.fn.apply(this)
    // const bfn = o1.fn.bind(this); return bfn();
  }
}

// 上下文呼叫方式，因為this指向最後呼叫他的物件
...
const o2 = {
  text: 'o2',
  fn: o1.fn;
}

console.log(o2.fn())
```

### bind, call, apply

用來改變 this 指向的

```javascript
// call
const target = {};
fn.call(target, "args1", "args2");

// apply
const target = {};
fn.apply(target, ["args1", "args2"]);

// bind
const target = {};
const bfn = fn.bind(target, "args1", "args2");
bfn();
```

### 建構函數

建構函數實際執行流程

1. 建立一個新物件
2. 將建構函數的 this 指向新物件
3. 為這個物件西曾屬性&方法
4. 回傳新物件

```javascript
function Foo() {
  this.bar = "lucas";
}
const instance = new Foo();
console.log(this.bar); // lucas
```

要特別注意如果建構函數中有顯性的 return，會依據 return 回傳內容會有不同結果

- 基本型別 this 會直接指向實例

```javascript
function Foo() {
  this.bar = "Lucas";
  return 1;
  // return false
  // return "348597824379854"
}
const instance = new Foo();
console.log(instance.bar); // Lucas
```

- 複合型別 this 會指向 return 的回傳

```javascript
function Foo() {
  this.bar = "Lucas";
  return {};
  // return ["12312421", "9489i"]
}
const instance = new Foo();
console.log(instance.bar); // undefined
```

### 箭頭函數的 this

箭頭函數中的 this 指向是由其所屬函數或全域作用域決定

```javascript
const foo = {
  fn: function () {
    setTimeout(function () {
      console.log(this);
    });
  },
};
console.log(foo.fn()); // window

const foo2 = {
  fn: function () {
    setTimeout(() => {
      console.log(this);
    });
  },
};
console.log(this.fn()); // {fn: f}
```

### this 的優先順序

- call, apply, bind, new 方法對 this 的綁定我們稱為顯性綁定
- 依據呼叫關係的稱為隱性綁定

一般來說使用顯性綁定的方式優先即最高，但如果使用new的方式，new的綁定還可以修改call, apply, bind的this指定。