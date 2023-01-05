---
id: Go 變數、條件式與迴圈
---

> 本系列文章大量參考[The Go Workshop](https://www.tenlong.com.tw/products/9781838647940)此書內容，目前此書也有[中文版](https://www.tenlong.com.tw/products/9789863126706?list_name=trs-t)可以多多支持

# Go 變數、條件式與迴圈

## 變數

### 變數宣告

大致上可分為用`var`宣告與`短宣告`

### var 宣告

```go
// 單一變數宣告
var <param_name> <param_type> = <param_value>

// 多變數宣告
var (
  <param1_name> <param1_type> = <param1_value>
  <param2_name> <param2_type> = <param2_value>
)
```

宣告的過程中，不一定每次都要給予型別和其值，兩者可以二選一。

- 只給予型別的狀況下，go 會將該變數設為預設的 zero value。
- 若只給予值得狀況，go 會根據值去推論變數的型別。

但有些狀況我們還是必須在宣告變數時先明確定義型別。

```go
package main

import "math/rand"

// cannot use seed (variable of type int) as type int64 in argument to rand.Seed
func main() {
  var seed = 12345 // Error
  var seed int64 = 12345 // Correct
  rand.Seed(seed);
}
```

以上述範例來說，rand.Seed()內參數所需要的型別必須為 int64，但是 go 針對數字的值其型別推斷為 int，此時就會報錯。

### 短宣告

短宣告基本上與用 var 宣告一樣，但其只能做用在 function 內。

```go
<param_name> := <param_value>
```

### 變數重新賦值

```go
// 單一變數重新賦值
<param_name> = <param_value>

// 多變數重新賦值
<param1_name>, <param2_name> = <param1_value>, <param2_value>
```

:::note 同時建立新變數與舊值重新賦值

```go
size, color, price := "L", "Red", 20

// is ok!
size, color, material := "L", "Red", "cotton"
```

:::

### Zero Value（零值）

| type                                          | value |
| --------------------------------------------- | ----- |
| bool (布林值)                                 | false |
| 數字 (整式與小數)                             | 0     |
| string (字串)                                 | ""    |
| pointer, func, interface, slice, channel, map | nil   |

### pointer 指標

一般來說，我們在把參數傳遞進 func 時，func 會複製這些值，變成新的變數。也就是說若你在函式中對參數做變動，原始值也不會受影響。

而這種方式，在 go 中的記憶體管理是採用`stack`的方式做儲存。然而若越多的參數傳入 func，所需複製的記憶體量也會越大。

若我們採用 pointer 的方式做傳遞，就不會有複製值得行為發生。指標只是單純提供值的所在位置，並不包含其值。

當我們建立指標後，go 就無法使用`stack`去管理該值的記憶體量，會轉而儲存在`heap`之中。`heap`內可以存放值，並直到·程式中沒有任何指標參照到這個值，才會被 GC(Garbage Collection)來回收記憶體。

指標是有未設定的狀態，當沒有儲存目標值的位置時會回傳 nil，而 nil 在 go 中代表無值。

:::tip 何時使用指標

是否採用指標，沒有標準答案。基本上還是根據程式的效能來決定是否要改採用指標。

:::

取得指標方式：

```go
// 此param初始值會是nil
var <param> *<param_type>

// 透過 new()函式可以達到賦值的效果。
// 這個函式是用來為某種型別取得記憶體並填入該型別的零值，然後回傳該記憶體的指標
<param> := new(<param_type>)
var <param> = new(<param_type>)

// 取得既有變數的指標
<param1> := &<param2>

// 從指標取得其值
<value> = *<pointer_param>
```

### 常數(constants)

常數代表無法改變其初始值。其宣告方式與 var 相似。

```go
const <param_name> <param_type> = <param_value>

const (
  <param1_name> <param1_type> = <param1_value>
  <param2_name> <param2_type> = <param2_value>
)
```

### 列舉(enums)

列舉是用來定義一系列常數的方式，這些常數的值會是整數，並且互相有關係。

```go
const (
  Sunday    = 0
  Monday    = 1
  Tuesday   = 2
  Wednesday = 3
  Thursday  = 4
  Friday    = 5
  Saturday  = 6
)

const (
  Sunday    = iota // 0
  Monday           // 1
  Tuesday          // 2
  Wednesday
  Thursday
  Friday
  Saturday
)
```

### 變數作用範圍(Scope)

每個變數都有他的作用範圍，最頂層的範圍是在套件的範圍，而每個變數下面又可以包含其他子範圍，範圍基本上可以用`{}`來判斷。

go 會在編譯的時候就檢查變數可以執行的範圍，當他在該範圍內找不到該變數，就會開始往上層找，直到最頂層。相反的，在父層是無法取得子層的變數。

go 的變數與其他語言一樣，若變數名稱相同，子範圍的變數就會遮蔽掉父層的變數。

```go
// Main Start: ppp
// Block Start: qqq
// funcA Start: ppp
// Main End: qqq

package main

import "fmt"

var level = "ppp"

func main() {
  fmt.Println("Main Start:", level)

  level := "qqq"

  if true {
    fmt.Println("Block Start:", level)
    funcA()
  }
  fmt.Println("Main End:", level)
}

func funcA() {
  fmt.Println("funcA Start:", level)
}
```

---

## 條件式

### if

```go
if <boolean_expression> {
  // ...
}else{
  // ...
}

if <boolean_expression1> {
  // ...
}else if <boolean_expression2> {
  // ...
}else {
  // ...
}
```

golang 有一種可以將變數範圍鎖定在 if 範圍內的變數作法，可以說是 if 的起始賦值。

```go
// ex
package main

import (
	"fmt"
)

func getNumber(i int) int {
	return i
}

func main() {
	var i = 100
	if x := getNumber(i); x > 10 {
		fmt.Println("Yes")
	} else {
		fmt.Println("No")
	}
}
```

### switch

switch 同樣如 if 一樣，有可以將變數起始賦值的方式。

```go
switch <起始賦值>; <boolean_expression> {
  case <expression>:
    // ...
  case <expression>, <expression>:
    // ...
  default:
    // ...
}
```

在 switch 中，起始賦值與 boolean_expression 並不一定需要。若沒有 boolean_expression 則代表`switch true`等同於`if true`。

而若要多個 case 執行同一段 code，在 js 裡面多個 case 會分多行寫，但在 go 裡面，可以將其寫在同一個 case 裡。

```javascript
// JavaScript
switch (20) {
  case 10:
  case 20:
    console.log('<=20');
    break;
  case 30:
    console.log('=30');
    break;
  default:
    console.log('no');
}
```

```go
// Golang
switch 20 {
  case 10, 20:
    fmt.Println("<=20")
  case 30:
    fmt.Println("=30")
  default:
    fmt.Println("no")
}
```

:::tip go switch

go 裡面的 switch，在其中一個 case 檢查通過後，go 只會執行其下方的程式碼，就會離開 switch，與我們寫其他語言不同。

因此若要像其他語言一樣，所有條件相符的都執行，需要在 case 裡面加上`fallthrough`敘述，讓 go 執行到該行時，仍會繼續檢查其他 case。

:::

### for 迴圈

```go
// 常見for迴圈
for <起始賦值敘述>; <條件式>; <結尾敘述> {
  // code
}

// 會產生無圈迴圈的for寫法，通常code裡面會下判斷，使用break離開迴圈
for {
  // code
}

// 與上述很像，只是把判斷式拉出來
for <條件式> {
  // code
}

// 用來處理無序或長度不確定的資料集
for key, value := range <data> {
  // code
}
```

:::tip 無序處理

前三種 for 的寫法在非常常見，這邊就不做敘述。只針對第四種無序的資料做額外說明。

因我們也不是每次 data 的 key 或 value 都需要使用

```go
// 只需要value
for _, value := range <data> {
  // code
}

// 只需要key
for value := range <data> {
  // code
}

// 用於切片資料
names := []string{"AA", "BB", "CC"}
for i, value := range names {
  fmt.Println("Index" i, value)
}
```

:::

#### 迴圈常見中斷或離開方式

- break: 中斷當下這輪的迴圈，並完全離開迴圈。
- continue: 一樣會中斷當下這輪的迴圈，並進入下一輪的迴圈。而迴圈的結尾敘述同樣也會執行。

:::note 更新

- Author: Andy Chen
- Last-Modify: 2022/04/11

:::
ter, func, interface, slice, channel, map | nil |