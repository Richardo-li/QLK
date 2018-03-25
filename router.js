// 引入handler用户自定义模块
var handler = require("./handler.js");  //使用路由后的处理
// 引入handler-register用户自定义模块
// var handlerReg = require('./handler-register');  //注册模块

var express = require('express');

//创建路由对象
var router = express.Router();

//添加路由   handler.js
router.get('/', handler.getMobileIndexPageCompanion);  //mobile首页结伴模块十条记录
router.get('/companion', handler.getMobileIndexPageAllCompanion);  //结伴页面所有记录
router.get('/addCompanioninfo', handler.getAddCompanioninfoPage);  //打开发布结伴信息页面
router.post('/addCompanioninfo', handler.doAddCompanioninfo);  //发布结伴信息
router.get('/register', handler.getRegisterPage);  //打开注册页面
router.post('/register', handler.doRegisterPage);  //用户进行注册
router.get('/login', handler.getLoginPage);  //打开登录页面
router.post('/login', handler.doLogin);  //用户登录
router.get('/personalCenter', handler.getPersonalCenterPage);  //打开个人中心页面
router.post('/editPersonal', handler.doEditPersonal);  //会员修改个人资料
router.get('/editHeadportrait', handler.getEditHeadportraitPage);  //会员修改个人头像
router.post('/uploadImg', handler.uploadImg);  //会员上传个人头像
router.post('/editheadH', handler.doEditheadH);  //会员修改个人头像
router.post('/editPwd', handler.doEditPwd);  //会员修改密碼
router.get('/logout', handler.doLogout);  //会员退出登录
router.get('/companionDetail', handler.getCompanionDetail);  //结伴详情页面
router.get('/published', handler.getPublished);  //获取会员发表过的信息
router.post('/deleteCompanion', handler.doDeleteCompanion);  //会员删除结伴信息


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