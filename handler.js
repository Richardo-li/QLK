//此文件用来渲染页面和接收前台传来的参数和处理数据库返回的参数

// 引入核心模块 fs
var fs = require("fs");
// 引入第三方模块 art-template
var template = require("art-template");
// 引入第三方模块formidable
var formidable = require("formidable");
// 引入核心模块path
var path = require("path");
// 引入核心模块 url
var myurl = require("url");
//引入核心模块
var querystring = require('querystring');
//引入自己的模块
// var mymodule = require("./myModule.js");
//第三方模块  加密
var md5 = require("blueimp-md5");
//引入自己的模块
// var mymoduleReg = require('./mymodule-register.js');


//渲染登录页面   res.render()方法渲染
module.exports.getMobileIndexPage = function (req, res) {
  // res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/mobile/index.html'); //res.render() 为第三方模块 express 内置的方法！
  
}