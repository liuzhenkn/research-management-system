// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

// 创建账号接口
// router.post('/api/login/createAccount',(req,res) => {
//     // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
//     let newAccount = new models.Login({
//         account : req.body.account,
//         password : req.body.password
//     });
//     // 保存数据newAccount数据进mongoDB
//     newAccount.save((err,data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send('createAccount successed');
//         }
//     });
// });
router.get('/api/isLogin',(req,res) => {
  res.send(req.session.account);
});
// 登录接口
router.post('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    var account = req.body.account;
    var password = req.body.password;
    models.Login.find({account:account},(err,data) => {
        if (!data[0]) {
            var msg = "0";
            res.send(msg);
        } else if(data[0].password != password){
            var msg = "1";
            res.send(msg);
        } else {
            req.session.account = account;
            res.send(data);
        }
    });
});

module.exports = router;
