"use strict";

var con = require('../db/dbconnect');

var express = require('express');

var session = require('express-session');

var app = express();
var router = express.Router(); //toppage rendering

router.get('/toppage', function (req, res) {
  res.render('index.ejs');
}); // //Render to SignIn page

router.get('/api1/signin', function (req, res) {
  res.render('signin.ejs');
}); // //Render SignUp page

router.get('/api1/signup', function (req, res) {
  res.render('signup.ejs');
});
router.post('/api2/signin', function (req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  con.query('SELECT * FROM USERS WHERE username=? AND password=?;', [username, password], function (error, result) {
    if (error) throw error;
    console.log(result[0]);

    if (result.length) {
      req.session.userid = result[0].id;
      console.log('ログイン成功ユーザーID： ' + req.session.userid);
      req.session.username = result[[0]].username;
      req.session.email = result[0].email;
      console.log(req.session.username); // res.render('userpage.ejs',{username: result[0].username});

      res.redirect("/userpage");
    }
  });
});
router.get('/userpage/', function (req, res) {
  res.render('userpage');
});
router.post('/api2/signup', function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password; // console.log(username,email,password)

  con.query('INSERT INTO USERS (username,email,password) value(?,?,?);', [username, email, password], function (error, result) {
    console.log(result.insertId);
    req.session.userid = result.insertId;
    req.session.username = username;
    req.session.email = email;
    console.log('会員登録されたユーザID：' + result.insertId);
    if (error) throw error;
    res.redirect("/userpage");
  });
});
router.post('/logout', function (req, res) {
  console.log(req.session.userid);
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  console.log('ログアウト完了');
  res.redirect('/toppage');
});
module.exports = router;
//# sourceMappingURL=users.dev.js.map
