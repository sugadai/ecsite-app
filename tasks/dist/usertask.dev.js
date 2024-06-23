"use strict";

var con = require('../db/dbconnect'); //ログイン


var SignIn = function SignIn(req, res) {
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

      res.redirect("/api/v1/userpage");
    }
  });
}; //会員登録


var SignUp = function SignUp(req, res) {
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
    res.redirect("/api/v1/userpage");
  });
};

var SignOut = function SignOut(req, res) {
  console.log(req.session.userid);
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  console.log('ログアウト完了');
  res.redirect('/api/v1/');
};

module.exports = {
  SignIn: SignIn,
  SignUp: SignUp,
  SignOut: SignOut
};
//# sourceMappingURL=usertask.dev.js.map
