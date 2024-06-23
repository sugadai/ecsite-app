const express = require('express');
const session = require('express-session');
const con = require('../db/dbconnect')
const userrouter = express.Router();
const {SignIn, SignUp, SignOut,password,search,addProduct} = require('../tasks/task')

//商品検索
userrouter.get('/search',search);

//トップページに遷移
userrouter.get('/',(req,res)=>{   
    const sql = 'select * from product'; 
    con.query(sql,
        (err,resulls)=>{
            console.log(resulls)
            res.render('index.ejs',{products:resulls});
        }
    )
})
// ログインページに遷移
userrouter.get('/signin',(req,res)=>{
    res.render('signin.ejs')
})

// 会員登録ページに遷移
userrouter.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

//パスワード変更ページに遷移
userrouter.get('/password',(req,res)=>{
    res.render('passUpdate.ejs');
})

//ログイン後マイページに遷移
userrouter.get('/userpage/',(req,res)=>{
        res.render('userPage.ejs');
})
//管理者ページにログイン
userrouter.get('/adminpage',(req,res)=>{
    res.render('adminpage.ejs');
})
//商品追加ページに遷移
userrouter.get('/addProduct',(req,res)=>{
    res.render('addProduct.ejs')
})
//商品追加確定ページに遷移
userrouter.get('/addProductConfirm',(req,res)=>{
    res.render('addProductConfirm.ejs')
})

//ログイン
userrouter.post('/signin',SignIn);

//会員登録
userrouter.post('/signup',SignUp);

//ログアウト
userrouter.post('/logout',SignOut);

//pass変更
userrouter.post('/password',password);

//商品追加
userrouter.post('/addProduct',addProduct);
module.exports = userrouter;

