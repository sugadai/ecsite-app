"use strict";

var express = require('express');

var session = require('express-session');

var productrouter = express.Router();

var _require = require('../tasks/producttask'),
    productserch = _require.productserch;

productrouter.get('/itemserch', productserch);
//# sourceMappingURL=productroute.dev.js.map
