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
//引入自己的模块  数据库操作
var mymodule = require("./module.js");
//第三方模块  加密
var md5 = require("blueimp-md5");
//引入自己的模块
// var mymoduleReg = require('./mymodule-register.js');


//渲染XXXXX页面   res.render()方法渲染
// module.exports.getXXXXXPage = function (req, res) {
// res.setHeader("Content-Type", "text/html");
//   res.render(__dirname + '/views/mobile/index.html'); //res.render() 为第三方模块 express 内置的方法！
// }


//渲染主页面结伴模块十条数据   res.render()方法渲染------------------
module.exports.getMobileIndexPageCompanion = function (req, res) {
  mymodule.getCompanionData((err, data) => {
    if (err) return res.end("err");
    res.render(__dirname + '/views/mobile/index.html', { 'companion': data }, (err1, result) => {
      //数据库获取到的是数组，然而模板传入数据要的是对象，所以写成  {'heros':data}
      if (err1) {
        res.end("err1");
      } else {
        res.end(result);
      }
    })
  })
}

//结伴页面所有数据   res.render()方法渲染------------------------------
module.exports.getMobileIndexPageAllCompanion = function (req, res) {
  mymodule.getCompanionAllData((err, data) => {
    if (err) return res.end("err");
    res.render(__dirname + '/views/mobile/companion.html', { 'companionAlldata': data }, (err1, result) => {
      //数据库获取到的是数组，然而模板传入数据要的是对象，所以写成  {'heros':data}
      if (err1) {
        res.end("err1");
      } else {
        res.end(result);
      }
    })
  })
}

//渲染添加结伴信息页面   res.render()方法渲染--------------------------
module.exports.getAddCompanioninfoPage = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/mobile/addCompanioninfo.html'); //res.render() 为第三方模块 express 内置的方法！
}

// 实现添加结伴信息-------------------------------------------------
module.exports.doAddCompanioninfo = function (req, res) {
  // 接收参数
  // data事件可以接收参数，但是是以拼接的方式，如果参数较多，有可能分多次来接收，
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 判断参数是否完全接收完毕
  req.on("end", () => {
    var newObj = querystring.parse(str);
    // 拿到的参数是key=value&key=value的字符串数据，但是我们需要的是对象。所以我们利用核心模块querystring将这个格式的字符串转换为对象

    // 写入
    // 
    mymodule.doAddCompanioninfo(newObj, (err, result) => {
      if (err) return res.end(JSON.stringify({ "code": 0, "msg": "添加失败" }));
      res.end(JSON.stringify({ "code": 1, "msg": "添加成功" }));
    })
  });
}

//渲染注册页面   res.render()方法渲染------------------------------
module.exports.getRegisterPage = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/mobile/user/register.html'); //res.render() 为第三方模块 express 内置的方法！
}

// 实现注册------------------------------------------------------
module.exports.doRegisterPage = function (req, res) {
  // 接收参数
  // data事件可以接收参数，但是是以拼接的方式，如果参数较多，有可能分多次来接收，
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });

  // 判断参数是否完全接收完毕
  req.on("end", () => {
    var newObj = querystring.parse(str);
    //查询数据库是否有相同的账号
    mymodule.getUserByuserName(newObj.LoginName, (err, data) => {
      if (err) {
        res.end('注册失败');
      } else if (data.length > 0) {
        return res.end(JSON.stringify({
          code: 500,
          msg: '该用户名已被注册！'
        }))
      }
      //数据库无相同账号名后
      //注册，添加账号进数据库
      mymodule.addUser(newObj, (err, result) => {
        if (err) {
          res.json({ "code": 0, "msg": "注册失败！" });
        } else {
          return res.end(JSON.stringify({
            code: 200,
            msg: '注册成功！'
          }))
        }
      })
    })
  });
}

//渲染登录页面   res.render()方法渲染-----------------------------
module.exports.getLoginPage = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/mobile/user/login.html'); //res.render() 为第三方模块 express 内置的方法！
}

// 实现登录------------------------------------------------------
module.exports.doLogin = function (req, res) {
  //先得到前端传来的数据
  var str = '';
  req.on('data', (chunk) => {
    str += chunk;
  })
  req.on('end', () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    // obj.LoginPwd = md5(obj.password, "这是我加的盐,增加密码的复杂程度");
    // 之前通过加密存储的密码，也需要通过加密进行匹配判断

    mymodule.getUserByuserName(obj.LoginName, (err, result) => {
      if (err) return res.end('服务器异常');
      if (result.length > 0) { //说明找到了记录
        if (result[0].LoginPwd == obj.LoginPwd) {
          req.session.isLogin = true;  // 1.标记登陆状态
          req.session.user = obj;  // 2.需要一些需要的数据 

          return res.end(JSON.stringify({
            code: 200,
            msg: '登录成功'
          }))
        } else {
          return res.end(JSON.stringify({
            code: 500,
            msg: '密码错误！'
          }))
        }
      } else {
        return res.end(JSON.stringify({
          code: 500,
          msg: '该账号不存在！'
        }))
      }
    });

  })

}

//渲染个人中心页面   res.render()方法渲染
module.exports.getPersonalCenterPage = function (req, res) {
  // req.session.user.LoginName;  //登录名

  mymodule.getUserByuserName(req.session.user.LoginName, (err, data) => {
    if (err) return res.end("err");

    res.render(__dirname + '/views/mobile/user/personalCenter.html', { 'personalCenterData': data }, (err1, result) => {
      //数据库获取到的是数组，然而模板传入数据要的是对象，所以写成  {'heros':data}
      if (err1) {
        res.end("err1");
      } else {
        res.end(result);
      }
    })
  })

}


