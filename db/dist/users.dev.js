"use strict";

var con = require('./dbconnect');

var express = require('express');

var bodyParser = require('body-parser');

var app = express(); // app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

var signin = function signin(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  con.query('SELECT * uses WHERE username=? AND password=?;', [username, password], function (error, result) {
    if (error) throw error;
    console.log(result);
  });
};

var signup = function signup(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  con.query('INSERT INTO USERS (username,email,password) value(username=?,email=?,password=?)', [username, email, password], function (error, result) {
    if (error) throw error;
    console.log(result);
  });
};

module.exports = {
  signin: signin,
  signup: signup
};
//# sourceMappingURL=users.dev.js.map
