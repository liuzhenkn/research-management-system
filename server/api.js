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
//查询登录状态
router.get('/api/isLogin',(req,res) => {
  if(req.session.account){
    models.Login.find({account:req.session.account},(err,data) => {
      res.send(data);
    });
  }else{
    res.send(req.session.account);
  }
});
//注销接口
router.get('/api/logoff',(req,res) => {
  req.session.account = null;
  res.send("log off success!");
});
// 登录接口
router.post('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    let account = req.body.account;
    let password = req.body.password;
    models.Login.find({account:account},(err,data) => {
        if (!data[0]) {
            let msg = "0";
            res.send(msg);
        } else if(data[0].password != password){
            let msg = "1";
            res.send(msg);
        } else {
            req.session.account = account;
            res.send(data);
        }
    });
});
//修改密码
router.post('/api/changePassword',(req,res) => {
  console.log(req.body.newPassword);
  let account = req.body.account;
  let password = req.body.newPassword;
  models.Login.update({'account':account},{$set:{'password':password}},function(err){
    if(err){
      console.log(err);
    }else{
      let msg = "修改成功";
      res.send(msg);
    }
  })
});
module.exports = router;



// function versionCompare(v1,v2){
//   let params = trimVersion(v1,v2);
//   if(params){
//     let version1 = params.version1;
//     let version2 = params.version2;
//     let i = 0;
//     let length = version1.length<version2.length?version1.length:version2.length;
//     let result = version1[i]-version2[i];
//     //循环比较直到不同或到达长度
//     while(result===0 && i<length){
//       i++;
//       result = version1[i]-version2[i];
//     }
//     //比较不同版本号的大小，如果是NaN则比较长度
//     if(result>0){
//       return true;
//     }else if(result<0){
//       return false;
//     }else{
//       if(version1.length === version2.length){
//         console.log("版本号相同");
//       }else{
//           return version1.length>version2.length?true:false;
//       }
//     }
//   }else{
//     console.log("版本号参数错误!");
//   }
// }
//
// //版本号预先处理，取出主版本号、子版本号、阶段版本号
// function trimVersion(v1,v2){
//   if(v1&&v2){
//     var arr1 = v1.replace(/(^\s*)|(\s*$)/g, "").split(/\D/);
//     var arr2 = v2.replace(/(^\s*)|(\s*$)/g, "").split(/\D/);
//     var version1 = [];
//     var version2 = [];
//     arr1.forEach((value) =>{
//       if(value != ''){
//         version1.push(value);
//       }
//     });
//     arr2.map((value) =>{
//       if(value != ''){
//         version2.push(value);
//       }
//     });
//     return {
//       version1: version1,
//       version2: version2
//     };
//   }else{
//     return false;
//   }
// }
