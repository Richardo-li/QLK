// 引入handler用户自定义模块
var handler = require("./handler.js");  //使用路由后的处理
// 引入handler-register用户自定义模块
// var handlerReg = require('./handler-register');  //注册模块

var express = require('express');

//创建路由对象
var router = express.Router();

//添加路由   handler.js
router.get('/', handler.getMobileIndexPage);  //mobile首页路由
// router.get('/', handler.getIndexPage);
// router.post("/postUpload", handler.postUpload);
// router.get("/add", handler.getAddPage);
// router.post("/add", handler.doAdd);
// router.get("/edit", handler.getEditPage);
// router.post("/edit", handler.doEdit);
// router.get("/del", handler.doDel);
// router.get('/login', handler.getLoginPage);
// router.post('/login', handler.doLogin);


//这是另一个文件的路由 handler-register
// router.get('/register', handlerReg.getRegisterPage);
// router.post('/register', handlerReg.doRegister);


//向外暴露成员，供其他调用的模块使用
module.exports = router;