"use strict";

var express = require('express');

var session = require('express-session');

var con = require('../db/dbconnect');

var userrouter = express.Router();

var _require = require('../tasks/task'),
    SignIn = _require.SignIn,
    SignUp = _require.SignUp,
    SignOut = _require.SignOut,
    password = _require.password,
    search = _require.search,
    addProduct = _require.addProduct; //商品検索


userrouter.get('/search', search); //トップページに遷移

userrouter.get('/', function (req, res) {
  var sql = 'select * from product';
  con.query(sql, function (err, resulls) {
    console.log(resulls);
    res.render('index.ejs', {
      products: resulls
    });
  });
}); // ログインページに遷移

userrouter.get('/signin', function (req, res) {
  res.render('signin.ejs');
}); // 会員登録ページに遷移

userrouter.get('/signup', function (req, res) {
  res.render('signup.ejs');
}); //パスワード変更ページに遷移

userrouter.get('/password', function (req, res) {
  res.render('passUpdate.ejs');
}); //ログイン後マイページに遷移

userrouter.get('/userpage/', function (req, res) {
  res.render('userPage.ejs');
}); //管理者ページにログイン

userrouter.get('/adminpage', function (req, res) {
  res.render('adminpage.ejs');
}); //商品追加ページに遷移

userrouter.get('/addProduct', function (req, res) {
  res.render('addProduct.ejs');
}); //商品追加確定ページに遷移

userrouter.get('/addProductConfirm', function (req, res) {
  res.render('addProductConfirm.ejs');
}); //ログイン

userrouter.post('/signin', SignIn); //会員登録

userrouter.post('/signup', SignUp); //ログアウト

userrouter.post('/logout', SignOut); //pass変更

userrouter.post('/password', password); //商品追加

userrouter.post('/addProduct', addProduct);
module.exports = userrouter;
//# sourceMappingURL=router.dev.js.map
