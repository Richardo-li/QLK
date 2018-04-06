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
router.get('/EquipAllData', handler.getEquipAllData);  //获取所有装备信息
router.post('/deleteEquip', handler.doDeleteEquip);  //删除装备信息
router.post('/addEquip', handler.doAddEquip);  //添加装备信息
router.post('/getEquip', handler.getEquip);  //获取一条装备信息
router.post('/editEquip', handler.doEditEquip);  //编辑装备信息
router.get('/foodAllData', handler.getFoodAllData);  //获取所有美食信息
router.post('/deleteFood', handler.doDeleteFood);  //删除美食信息
router.post('/addFood', handler.doAddFood);  //添加美食信息
router.post('/getfood', handler.getfood);  //获取一条美食信息
router.get('/beautifulAllData', handler.getBeautifulAllData);  //获取所有美景信息
router.post('/deleteBeautiful', handler.doDeleteBeautiful);  //删除美景信息
router.post('/addBeautiful', handler.doAddBeautiful);  //添加美景信息
router.post('/getbeautiful', handler.getbeautiful);  //获取一条美食信息


//向外暴露成员，供其他调用的模块使用
module.exports = router;