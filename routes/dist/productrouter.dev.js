"use strict";

var express = require('express');

var session = require('express-session');

var productrouter = express.Router();

var _require = require('../tasks/producttask'),
    producttask = _require.producttask;

productrouter.get('/itemserch', function (req, res) {
  res.send(req.url);
});
module.exports = productrouter;
//# sourceMappingURL=productrouter.dev.js.map
