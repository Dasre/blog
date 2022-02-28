---
slug: curl
title: curl
authors: [andy]
tags: [Learning]
---

# curl

curl 是一個同 wget 為 Linux 上方便的指令，可把網頁抓下來進行分析。一般來說當工程師撰寫完 API 後，都需要進行 HTTP Request 來測試，目前有像 postman 方便的 GUI tool，但如果懶惰或不想啟動較吃資源的 GRU tool，此時我們就可以透過 curl 指令幫助我們測試。

以下我紀錄個人覺得較常用之指令。

## curl GET

crul 預設為使用 GET 請求，一般來說指令組成結構為`curl [option] [URL]`

下方我們會以 httpbin 作為 HTTP Request 的 URL 並說明常用 option 選項。

補充：httpbin 回傳會以 JSON 格式為內容格式。

```
curl https://httpbin.org/get
//取得對httpbin進行get的回傳內容

curl -I https://httpbin.org/get
//只需要顯示response header
//其實就等於 curl --head hhttps://httpbin.org/get
//-I為簡寫，可透過curl -help查詢

curl -o abc.txt https://httpbin.org/get
//將httpbin進行get的回傳內容儲存下來，並存在一為abc.txt的檔案內
//小寫"o"為下載請求資源到新的檔案
//檔案之名稱與副檔名可自行設定

curl -O https://httpbin.org/get
//同為將httpbin進行get的回傳內容
//大寫"O"為使用指定網址伺服器的檔名作為下載之檔名

curl -L google.com
//檔網頁進行redirect時，連到redirect網址
//可以試看看沒有加上"-L"的狀況

curl https://httpbin.org/get -H "accept: application/json"
//設定request所要挾帶的header
//這邊設定告知伺服器用戶端可解讀JSON內容
```

## curl POST/PUT/......

除了最基本的 get，可以使用"-X"決定要進行"GET|POST|PUT|DELETE|PATCH"哪個 http method。

在我們使用-X 得時候，我們常常會使用到下列的指令。

```
-H 夾帶的header
-d 夾帶post data內容
-u 夾帶使用者帳號密碼
-b 攜帶cookie
```

```
curl -X POST "https://httpbin.org/post" -d "email=abc@gmail.com" -H "accept: application/json"
//進行post時，夾帶email內容
//要使用其他的http method 更改-X後面的名稱

curl -X POST "https://httpbin.org/post" -b "num=20"
//設定cookie num=20

curl -u "abc:200" https://httpbin.org/get
//若網頁有使用basic auth，可以使用-u夾帶帳號密碼過驗證
```
