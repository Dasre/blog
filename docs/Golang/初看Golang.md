---
id: 初看 Golang
---

> 本系列文章大量參考[The Go Workshop](https://www.tenlong.com.tw/products/9781838647940)此書內容，目前此書也有[中文版](https://www.tenlong.com.tw/products/9789863126706?list_name=trs-t)可以多多支持

# 初看 Golang

```go
// Part1
package main

// Part2
import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

// Part3
var helloList = []string{
	"Hello",
	"你好",
}

// Part4
func main() {
	rand.Seed(time.Now().UnixNano())
	index := rand.Intn(len(helloList))
	msg, err := hello(index)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(msg)
}

// Part5
func hello(index int) (string, error) {
	if index < 0 || index > len(helloList)-1 {
		return "", errors.New("Out of range")
	}
	return helloList[index], nil
}
```

---

## Part1 - 宣告 Package

每個.go 的檔案都必須宣告套件名稱。一般來說如果是要直接使用這個 package，會將 package 內定義為 main。

但也可以不將 package 名稱定義為 name，將這個套件當成 library，以便在其他 go 的 code 中去使用。

:::note Package Name

位於同一個目錄的.go 檔案，都會視為同一個 package，也就是說所有檔案的開頭 package name 都要設為一樣。

:::

## Part2 - 引入套件

基本上就是匯入每隻檔案會使用到的套件。

## Part3 - 全域變數

後面會在詳細介紹 Golang 各種型別

## Part4 - 主函式

與 Java 等語言很像，main 這個 function 會是此檔案的進入點。

## part5 - 自定義函式

寫法大致上就是

```go
func <function_name> (<args> <args_type>) (<response_type>) {
}
```
