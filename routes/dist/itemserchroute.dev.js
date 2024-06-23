"use strict";

var express = require('express');

var session = require('express-session');

var productrouter = express.Router();

var _require = require('../tasks/itemserchtask'),
    itemserch = _require.itemserch;

productrouter.get('/itemserch', itemserch);
//# sourceMappingURL=itemserchroute.dev.js.map
