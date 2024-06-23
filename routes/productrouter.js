const express = require('express');
const session = require('express-session');
const productrouter = express.Router();
const {producttask} = require('../tasks/producttask');

productrouter.get('/itemserch',(req,res)=>{
    res.send(req.url);
});

module.exports = productrouter;

