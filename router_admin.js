// 引入handler用户自定义模块
var handler = require("./handler_admin.js");  //使用路由后的处理
// 引入handler-register用户自定义模块
// var handlerReg = require('./handler-register');  //注册模块

var express = require('express');

//创建路由对象
var router = express.Router();

//添加路由   handler.js
router.get('/', handler.getIndexPage);  //admin首页
router.get('/login', handler.getLoginPage);  //admin登录页面
router.post('/login', handler.doLogin);  //admin登录
router.get('/logout', handler.doLogout);  //admin退出登录
router.get('/getRotation', handler.getRotation);  //获取mobile首页轮播图
router.post('/uploadImg', handler.uploadImg);  //上传主页轮播图
router.post('/editRotation', handler.doEditRotation);  //修改主页轮播图



//向外暴露成员，供其他调用的模块使用
module.exports = router;