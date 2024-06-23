"use strict";

var _require = require('ejs'),
    render = _require.render;

var express = require('express');

var mysql = require('mysql');

var bodyParser = require('body-parser');

var con = require('./db/dbconnect');

var router = require('./routes/router');

var productrouter = require('./routes/productrouter');

var session = require('express-session');

var app = express();
var PORT = 3000; // set the view engine to ejs

app.set('view engine', 'ejs');
app.use(express["static"]('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // secure: true, // HTTPSを使用
    httpOnly: true,
    // XSS攻撃を防ぐ
    sameSite: 'strict',
    // CSRF攻撃を防ぐ
    maxAge: 24 * 60 * 60 * 1000 // セッションの有効期限を設定（例: 24時間）

  }
}));
app.use(function (req, res, next) {
  console.log(req.session.username);

  if (req.session.userid === undefined) {
    console.log(req.session.userid);
    console.log('ログインしていません。');
    res.locals.username = 'ゲスト';
  } else {
    res.locals.username = req.session.username;
    res.locals.email = req.session.email;

    if (req.session.addProduct !== undefined) {
      console.log('a');
      res.locals.addProduct = req.session.addProduct;
    }

    console.log(req.session.addProduct);
    console.log('ログイン中ユーザーID' + req.session.userid);
  }

  next();
});
app.use('/api/v1/', router); // app.use('/producttask',productrouter)
// app.get('/',(req,res)=>{
//     res.render('testpage.ejs');
// })
//DB Connection

con.connect(function (err) {
  if (err) throw err;
  console.log('MySQL Connection!');
}); //Server Start

app.listen(PORT, console.log("Server Start on port Number ".concat(PORT)));
//# sourceMappingURL=app.dev.js.map
