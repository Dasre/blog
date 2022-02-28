---
slug: Express
title: Express 重點筆記 & 快速複習
authors: [andy]
tags: [Learning]
---

# express

## App.js 文件配置

```javascript
//引入第三方middleware package
//引入http-errors套件
var createError = require('http-errors');

//引入express套件
var express = require('express');

//引入path套件
var path = require('path');

//引入cookie-parser套件
//接收到cookie資料做解析
var cookieParser = require('cookie-parser');

//引入morgan套件
//可以記錄各種事件資料
//例如進行get 或 post等行為
var logger = require('morgan');

//連接透過express.Router()產生實例的router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//模板引擎 這邊使用pug 要使用ejs將pug換成ejs
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

//可以透過json或一般的字串取得get post等資料
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//靜態資料 抓到根目錄/public 資料夾
app.use(express.static(path.join(__dirname, 'public')));

//使用上方引入的./routes/index 來管理根目錄router
app.use('/', indexRouter);
//使用上方引入的./routes/user 來管理user router
app.use('/users', usersRouter);

//如果上方的router都沒進入，抓取錯誤
//透過http-errors套件顯示404錯誤
//也可以自定義404錯誤要顯示的title，這邊title定為"This item is not exist!"
//要顯示其他訊息 將404改成其他http狀態碼
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'This item is not exist!'));
});

//錯誤的處理
//預設的處理方式是僅在開發的過程中提供錯誤訊息
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

上述為 express App.js 的默認設定。

但在實際上，express-generator 產生的專案，package.json 內 npm start 實際上是去執行"node ./bin/www"，也就是執行 bin 資料夾裡 www 的檔案。下面簡單紀錄 www 文件配置。

---

## bin/www 文件配置

```javascript
#!/usr/bin/env node

/**
 * Module dependencies.
 */
//有載入上述說明的app.js檔設定
var app = require('../app');
var debug = require('debug')('expr:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
//設定port 如果環境有預設使用環境預設的，沒有就使用3000 port
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

---

## express router 上個人常用的指令

### req -> request

### res -> response

- req.params
  - 取得路徑參數值
  - ex
  ```javascript
  app.get('user/:number', function (req, res) {
    var num = req.params.number;
    res.json({ number: num });
  });
  ```
- res.json()
  - 輸出 json 資料
- res.render()
  - 渲染指定畫面
- res.redirect()
  - 網址重新導向

其餘大致上是邏輯的處理。

---

## 補充

- req.params. ...
  - 撈出路由設定的資料
- req.query. ...
  - 取得網址的參數
- app.use()
  - 使用 middleware
  - 類似一層一層的過濾，中間可以處理 http 的 request、response 或一些檢查動作等等。
  - [參考](https://expressjs.com/zh-tw/guide/writing-middleware.html)
