---
id: Go 複合型別
---

> 本系列文章大量參考[The Go Workshop](https://www.tenlong.com.tw/products/9781838647940)此書內容，目前此書也有[中文版](https://www.tenlong.com.tw/products/9789863126706?list_name=trs-t)可以多多支持

# Go 複合型別

## 陣列 (Array)

Go 裡面的陣列是`必須`指定長度的，若沒有指定長度，雖然也會成立，但是會得到一個`切片`（後面會介紹）。

各種宣告方式

```go
func main() {
	var arr1 [5]int
	var arr2 = [5]int{1, 2, 3, 4, 5}
	arr3 := [...]int{1, 2, 3, 4, 5}
	arr4 := [5]int{1, 2, 3, 4, 5}

	fmt.Println(arr1, arr2, arr3, arr4)

  fmt.Println(arr1 == arr2) // false
  fmt.Println(arr2 == arr3) // true
  fmt.Println(arr2 == arr4) // true
}
```

透過索引賦值

```go
func main() {
	var arr1 [10]int
	var arr2 = [...]int{9: 1}
	var arr3 = [10]int{8: 2, 9: 3}
	var arr4 = [10]int{9: 2, 4: 1, 5}

	fmt.Println(arr1) // [0 0 0 0 0 0 0 0 0 0]
	fmt.Println(arr2) // [0 0 0 0 0 0 0 0 0 1]
	fmt.Println(arr3) // [0 0 0 0 0 0 0 0 2 3]
	fmt.Println(arr4) // [0 0 0 0 1 5 0 0 0 2]
}
```

Go 裡面的索引基本上與 JavaScript 一樣，第一個值的索引為 0。

```go
// 取值
func main() {
	arr := [5]int{1,3,5,7,9}

	fmt.Println(arr[1]) // 3
	arr[1] = 4
	fmt.Println(arr[1]) // 4

	// 0
	// 1
	// 2
	// 3
	// 4
	for i := 0; i<len(arr); i++ {
		fmt.Println(i)
	}
}
```

## 切片 (slice)

切片基本上就是陣列再進行重新包裝，讓我們可以不再受長度等限制影響。

```go
// 建立切片
func main() {
	// 建立切片
	letters := []string{"a", "b", "c", "d"}

	// 使用make建立切片長度與容量
	letters2 := make([]string, 4, 4)
	letters2[0], letters2[1], letters2[2], letters2[3] = "a", "b", "c", "d"

	// 切片增加元素
	letters3 := append(letters2, "e")
	letters4 := append(letters2, "e", "f")

	// 從切片建立切片
	letters5 := letters4[0:4]

	fmt.Println(letters) // [a b c d]
	fmt.Println(letters2) // [a b c d]
	fmt.Println(letters3) // [a b c d e]
	fmt.Println(letters4) // [a b c d e f]
	fmt.Println(letters5) // [a b c d]
}
```

### 切片的內部

切片的後面，其實有一個隱藏的陣列，用來儲存真正的資料。但當切片加入新的值的時候，後面的隱藏陣列可能會被換成更大的陣列。

切片的三個屬性：
- 指向隱藏陣列的指標(pointer)
- 長度(length)：現有元素數量
- 容量(capacity)：切片可以放入的元素數量

to be added...


## Map
Go 裡面的Map基本上就是Key-Value的組合。但有個限制是Key的型別要都一樣，Value的型別也都要一樣。

f