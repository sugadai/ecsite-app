"use strict";

var express = require('express');

var session = require('express-session');

var userrouter = express.Router();

var _require = require('../tasks/usertask'),
    SignIn = _require.SignIn,
    SignUp = _require.SignUp,
    SignOut = _require.SignOut; //トップページに遷移


userrouter.get('/', function (req, res) {
  res.render('index.ejs');
}); // ログインページに遷移

userrouter.get('/signin', function (req, res) {
  res.render('signin.ejs');
}); // 会員登録ページに遷移

userrouter.get('/signup', function (req, res) {
  res.render('signup.ejs');
}); //ログイン後マイページに遷移

userrouter.get('/userpage/', function (req, res) {
  res.render('userpage');
}); //ログイン

userrouter.post('/signin', SignIn); //会員登録

userrouter.post('/signup', SignUp); //ログアウト

userrouter.post('/logout', SignOut);
module.exports = userrouter;
//# sourceMappingURL=usersrouter.dev.js.map
