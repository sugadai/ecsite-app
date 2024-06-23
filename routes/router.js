const express = require('express');
const session = require('express-session');
const con = require('../db/dbconnect')
const userrouter = express.Router();
const {SignIn, SignUp, SignOut,password,search} = require('../tasks/task')

//商品検索
userrouter.get('/search',search);

//トップページに遷移
userrouter.get('/',(req,res)=>{   
    const sql = 'select * from product'; 
    con.query(sql,
        (err,resulls)=>{
            console.log(resulls)
            res.render('testpage.ejs',{products:resulls});
        }
    )
})
// ログインページに遷移
userrouter.get('/signin',(req,res)=>{
    res.render('testpage6.ejs')
})

// 会員登録ページに遷移
userrouter.get('/signup',(req,res)=>{
    res.render('testpage5.ejs')
})

//プロフィール情報変更ページに遷移
userrouter.get('/password',(req,res)=>{
    res.render('testpage7.ejs');
})

//ログイン後マイページに遷移
userrouter.get('/userpage/',(req,res)=>{
        res.render('testpage9.ejs')
})

//ログイン
userrouter.post('/signin',SignIn)

//会員登録
userrouter.post('/signup',SignUp);

//ログアウト
userrouter.post('/logout',SignOut)

//pass変更
userrouter.post('/password',password)

module.exports = userrouter;

