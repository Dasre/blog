---
id: Go 基本型別
---

> 本系列文章大量參考[The Go Workshop](https://www.tenlong.com.tw/products/9781838647940)此書內容，目前此書也有[中文版](https://www.tenlong.com.tw/products/9789863126706?list_name=trs-t)可以多多支持

# Go 基本型別

Go 與 JavaScript 不同之處在於它是一個強型別的語言，代表每個資料都是有其型別，並且不可以變更。

型別的定義包括

- 儲存何種資料
- 可以進行什麼操作
- 操作會對資料有什麼影響
- 佔用多少記體空間ㄋ

## 布林值 bool

其值只有 true 與 false 兩種，零值時為 false。

## 數字

可以分為整數與浮點數兩部分。

### 整數

整數又可以分為`有號整數(signed number)`與`無號整數(unsigned number)`。至於可以儲存到多大大小的數字，又因型別不同而不同。

| 型別     | 可儲存範圍                                                   |
|--------|---------------------------------------------------------|
| uint8  | 無號的 8 位元整數(0 ~ 255)                                     |
| uin16  | 無號的 16 位元整數(0 ~ 65535)                                  |
| uint32 | 無號的 32 位元整數(0 ~ 2^32-1)                                 |
| uint64 | 無號的 64 位元整數(0 ~ 2^64-1)                                 |
| int8   | 有號的 8 位元整數(-128 ~ 127)                                  |
| int16  | 有號的 16 位元整數(-32768 ~ 32767)                             |
| int32  | 有號的 32 位元整數(-2147483648 ~ 2147483647)                   |
| int64  | 有號的 64 位元整數(-9223372036854775808 ~ 9223372036854775807) |
| byte   | uint8 別稱                                                |
| rune   | uint32 別稱                                               |
| uint   | 無號 32 或 64 位元（取決於在多少位元的系統上執行，目前大多 64)                   |
| int    | 有號 32 或 64 位元（取決於在多少位元的系統上執行，目前大多 64)                   |

至於如何選擇適合的整數型別，可以都先使用`int`。當使用`int`型別會造成問題時，在考慮改成其他型別。（大多都是與記憶體使用量有關）

### 浮點數

浮點數的型別基本上就`float32`和`float64`兩種。

```go
func main() {
  var n1 int = 100
  var n2 float32 = 100
  var n3 float64 = 100

  fmt.Println(n1 / 3) // 33
  fmt.Println(n2 / 3) // 33.333332
  fmt.Println(n3 / 3) // 33.333333333333336
}
```

```go
func main() {
  var a int = 100
  var b float32 = 100
  var c float64 = 100

  fmt.Prinln((a / 3) * 3) // 99
  fmt.Prinln((b / 3) * 3) // 100
  fmt.Prinln((c / 3) * 3) // 100
}
```

從上述範例可以得知，以整數做除法，只會回傳整數。

而使用浮點數做除法，則可以有小數點後的數字。只是在於`float32`與`float64`可以顯示的數量不同。

### 數字溢位(overflow)

分成兩種狀況

- 宣告變數時就溢位

```go
func main() {
  var a int8 = 128 // constant 128 overflows int8
  fmt.Println(a)
}
```

- 建立變數之後，操作導致溢位

```go
// step 0 => int8 126 & uint8 254
// step 1 => int8 127 & uint8 255
// step 2 => int8 -128 & uint8 0
// step 3 => int8 -127 & uint8 1
// step 4 => int8 -126 & uint8 2

func main() {
  var a int8 = 125
  var b uint8 = 253

  for i := 0; i < 5; i++ {
    a++
    b++
    fmt.Println("step", i, "=>", "int8", a, "& uint8", b)
  }
}
```

從範例可以得知，有號整數在溢位後會回到該型別的最小值`(負數)`，無號整數則會變成該型別最小值`(0)`。

### 大數

若我們所需要使用到的數字大小超過 int64 或 uint64 的大小，則可以使用`math/big`套件來協助處理。

> 官方文件：https://golang.org/pkg/math/big/

```go
func main() {
	var a int64 = math.MaxInt64
	fmt.Println("a :", a) // a : 9223372036854775807
	a = a + 1
	fmt.Println("a+1 :", a) // a+1 : -9223372036854775808

	var b = big.NewInt(math.MaxInt64)
	fmt.Println("b :", b) // b : 9223372036854775807
	b = b.Add(b, big.NewInt(1))
	fmt.Println("b+1 :", b.String()) // b+1 : 9223372036854775808
}
```

### 位元 Byte

如同前面所說，byte 型別就是 uint8 型別的別名。

其值有 0 ~ 255 256 種可能

## 字串

字串分為兩種

- 原始的(raw) => 由反引號括住的字串。
- 轉譯的(interpreted) => 由雙引號括住的字串。

若字串變數採用 raw 的方式儲存，會直接顯示變數內儲存的值，不會做任何處理。

反之，若採用 interpreted 的方式儲存，Go 會經過處理再顯示。

```go
// This is the BEST
// thing ever!


// This is the BEST\nthing ever!


// This is the BEST
// thing ever!

func main() {
	comment1 := `This is the BEST
thing ever!`
	comment2 := `This is the BEST\nthing ever!`
	comment3 := "This is the BEST\nthing ever!"

	fmt.Print(comment1, "\n\n")
	fmt.Print(comment2, "\n\n")
	fmt.Print(comment3, "\n")
}
```

簡單來說，若我們的文字包含`\n`, `\t`這種換行 or tab 的需要轉意的字元，則我們需要使用轉譯字串來存。

```go
// In "Windows" the user directory is "C:\Users\"
// In "Windows" the user directory is "C:\Users\"

func main() {
	comment1 := `In "Windows" the user directory is "C:\Users\"`
	comment2 := "In \"Windows\" the user directory is \"C:\\Users\\\""

	fmt.Println(comment1)
	fmt.Println(comment2)
}
```

若我們使用轉譯字串來存，又想要正常顯示`\` or `""`之類的，則需要在其前面再加一個`\`反斜線。

### Rune

rune 是一個 UTF-8，佔用 1~4 個位元的型別。rune 主要是可以協助我們處理不同編碼的問題。

在 Go 的字串裡，不只可以儲存 UTF-8 編碼的文字，像 ASCII 之類的也可以。然後像 ASCII 是只會用到一個位元的編碼，與 UTF-8 使用 4 個位元不同。

當文字以 String 型別儲存時，Go 會以 byte 來儲存所有字串(String 實際上是唯獨的 byte 切片)，這同時代表著 UTF-8 編碼的字元可能會被拆成多個位元。

```go
// 83 105 114 95 75 105 110 103 95 195 156 98 101 114
func main() {
	username := "Sir_King_Über"

	for i := 0; i < len(username); i++ {
		fmt.Print(username[i], " ")
	}
}

```

在上面的範例中，會將每個文字的編碼印出來。比較特殊的是我們的文字只有 13 碼，卻會印出 14 個編碼數字，主要是因為`Ü`是一個雙位元的字元。

如果我們把上述編碼的數字重新轉回文字，

```go
// S i r _ K i n g _ Ã  b e r
func main() {
	username := "Sir_King_Über"

	for i := 0; i < len(username); i++ {
		fmt.Print(string(username[i]), " ")
	}
}
```

可以發現在`Ü`這個字上會出錯，若要解決這個問題，我們需要將字串轉儲存在 nune 切片上。

```go
func main() {
  username := "Sir_King_Über"
  runes := []rune(username)

	for _, v := range runes {
		fmt.Print(string(v), " ")
	}
}
```

同樣的若我們使用 len()去抓字串長度，沒有先轉成 rune 切片，也會出現抓錯長度的問題。

```go
func main() {
  username := "Sir_King_Über"
	fmt.Println("[]byte", len(username)) // []byte 14
	fmt.Println("[]rune", len([]rune(username))) // []rune 13
	fmt.Println(string(username[:10])) //Sir_King_�
	fmt.Println(string([]rune(username)[:10])) // Sir_King_Ü
}
```

因此在處理字串上，若會使用到 len()或字串擷取等功能，最好是先將字串轉為 rune 切片再做處理。

### nil

nil 基本上不是一個型別。是在 Go 中代表無型別也無資料的狀態。在指標、map、interface 和 error 都會大量使用到，確認現在是否為 nil 的狀況。

```go
// nil
func main() {
  var message *string
  if message == nil {
    fmt.Println("nil")
    return
  }
  fmt.Println("Not nil")
}
```
