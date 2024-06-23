"use strict";

var mysql = require('mysql');

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'm.s.l_sd6016',
  database: 'ecsitedb'
});
module.exports = con;
//# sourceMappingURL=dbconnect.dev.js.map
