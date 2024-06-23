"use strict";

var _require = require('express'),
    query = _require.query;

var con = require('../db/dbconnect'); //商品検索


var search = function search(req, res) {
  res.send('puroduct search');
}; //ログイン


var SignIn = function SignIn(req, res) {
  // console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;
  var errMsg = {
    usernameErrMsg: '',
    passwordErrMsg: ''
  };

  if (username == '') {
    errMsg.usernameErrMsg = 'ユーザ名を入力してください';
  }

  if (password == '') {
    errMsg.passwordErrMsg = 'パスワードを入力してください';
  }

  console.log(errMsg);
  con.query('SELECT * FROM USERS WHERE username=? AND password=?;', [username, password], function (error, result) {
    if (error) throw error;
    console.log(result[0]);

    if (result.length) {
      req.session.userid = result[0].id;
      console.log('ログイン成功ユーザーID： ' + req.session.userid);
      req.session.username = result[0].username;
      req.session.email = result[0].email; // console.log(req.session.username)
      // res.render('userpage.ejs',{username: result[0].username});

      res.redirect("/api/v1/userpage");
    } else {
      console.log('認証に失敗しました');
      res.redirect('/api/v1/signin');
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
  console.log('a');
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  console.log('ログアウト完了');
  res.redirect('/api/v1');
};

var password = function password(req, res) {
  var new_password = req.body.new_password;
  var userid = req.session.userid; // console.log(new_password + ' ' + req.session.userid);
  // sql = 'UPDATE users SET password = ? WHERE id = ?;';

  con.query('UPDATE users SET password = ? WHERE id = ?;', [new_password, userid], function (err, result) {
    if (err) throw err;
    console.log('パスワード変更完了　ユーザID：' + userid);
    res.redirect("/api/v1/userpage");
  });
};

module.exports = {
  SignIn: SignIn,
  SignUp: SignUp,
  SignOut: SignOut,
  password: password,
  search: search
}; // const search = async (req,res) =>{
//     console.log(req.query.puroduct);
//     const client_id = `dj00aiZpPUhPVW9ISXpNN3Q0RSZzPWNvbnN1bWVyc2VjcmV0Jng9Mjc-`;
//     // const query = req.query.puroduct;
//     // const url = `https://shopping.yahooapis.jp/ShoppingWebService/V2/itemSearch?appid=${client_id}>query=${query}`;
//     const params = {
//         response_type : 'code',
//         client_id : client_id,
//         redirect_uri : `https://www.yahoo.co.jp/`,
//         scope : 'email'
//     }
//     const query = new URLSearchParams(params);
//     const url = `https://auth.login.yahoo.co.jp/yconnect/v2/authorization?response_type=code&client_id=${client_id}&redirect_uri=https://www.yahoo.co.jp/&scope=openid`
//     console.log(url)
//     try {
//         const resdata =  await fetch(url)
//         console.log(resdata)
//         const data = await resdata.json();
//         console.log(data);
//         res.send(resdata);
//     } catch (error) {
//         res.send(error.status)
//     }
// }
//# sourceMappingURL=task.dev.js.map
