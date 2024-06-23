const { query } = require('express');
const con = require('../db/dbconnect')

//商品検索
const search = (req,res) => {
    res.send('puroduct search')
}


//ログイン
const SignIn = (req,res) =>{
    // console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    const errMsg = {
        usernameErrMsg : '',
        passwordErrMsg : ''
    }
    if(username == '' ){
        errMsg.usernameErrMsg = 'ユーザ名を入力してください';
    }
    if(password == ''){
        errMsg.passwordErrMsg = 'パスワードを入力してください';
    }
    
    console.log(errMsg)
    con.query(
        'SELECT * FROM USERS WHERE username=? AND password=?;'
        ,[username,password],
        (error,result)=>{
            if(error) throw error;
            console.log(result[0])
            if(result.length){
                req.session.userid = result[0].id;
                console.log('ログイン成功ユーザーID： '+req.session.userid);
                req.session.username = result[0].username;
                req.session.email = result[0].email;
                if(req.session.userid === 1){
                    res.redirect('/api/v1/adminpage');
                } else{
                    res.redirect(`/api/v1/userpage`);
                }
                // console.log(req.session.username)
                // res.render('userpage.ejs',{username: result[0].username});
            }else{
                console.log('認証に失敗しました')
                res.redirect('/api/v1/signin')
            }
        }
    )
}

//会員登録
const SignUp = (req,res) =>{
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(username,email,password)
    con.query(
        'INSERT INTO USERS (username,email,password) value(?,?,?);'
        ,[username,email,password],
        (error,result)=>{
            console.log(result.insertId)
            req.session.userid = result.insertId;
            req.session.username = username
            req.session.email = email;
            console.log('会員登録されたユーザID：'+result.insertId)
            if(error) throw error;
            res.redirect(`/api/v1/userpage`)
        }
    )
}

const SignOut = (req,res)=>{
    console.log('a')
    req.session.destroy((err)=>{
        if(err) throw err
    });
    
    console.log('ログアウト完了')
    res.redirect('/api/v1');
}

const password = (req,res) => {
    const new_password = req.body.new_password
    const userid = req.session.userid;
    // console.log(new_password + ' ' + req.session.userid);
    // sql = 'UPDATE users SET password = ? WHERE id = ?;';
    con.query(
        'UPDATE users SET password = ? WHERE id = ?;',
        [new_password,userid],
        (err,result)=>{
            if(err) throw err
            console.log('パスワード変更完了　ユーザID：' + userid);
            res.redirect(`/api/v1/userpage`)
        })
}

//商品追加
const addProduct = (req,res) =>{
    // console.log(req.body)
    const productname =  req.body.productname;
    const price = req.body.price;
    const imgpath = req.body.imgpath;
    const category_id = req.body.category_id;
    const sql = 'INSERT INTO product(productname,price,imgpath,category_id) value(?,?,?,?);'
    con.query(
        sql,
        [productname,price,imgpath,category_id],
        (err,result)=>{
            if(err) throw err
            console.log('商品追加完了')
            req.session.addProduct = req.body;
            console.log(req.session.addProduct)
            res.redirect('/api/v1/addProductConfirm')
        })
}

module.exports = {SignIn,SignUp,SignOut,password,search,addProduct}



// const search = async (req,res) =>{
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