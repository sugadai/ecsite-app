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
    search = _require.search; //商品検索


userrouter.get('/search', search); //トップページに遷移

userrouter.get('/', function (req, res) {
  var sql = 'select * from product';
  con.query(sql, function (err, resulls) {
    console.log(resulls);
    res.render('testpage.ejs', {
      products: resulls
    });
  });
}); // ログインページに遷移

userrouter.get('/signin', function (req, res) {
  res.render('testpage6.ejs');
}); // 会員登録ページに遷移

userrouter.get('/signup', function (req, res) {
  res.render('testpage5.ejs');
}); //プロフィール情報変更ページに遷移

userrouter.get('/password', function (req, res) {
  res.render('testpage7.ejs');
}); //ログイン後マイページに遷移

userrouter.get('/userpage/', function (req, res) {
  res.render('testpage9.ejs');
}); //ログイン

userrouter.post('/signin', SignIn); //会員登録

userrouter.post('/signup', SignUp); //ログアウト

userrouter.post('/logout', SignOut); //pass変更

userrouter.post('/password', password);
module.exports = userrouter;
//# sourceMappingURL=router.dev.js.map
