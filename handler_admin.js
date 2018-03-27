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
var mymodule = require("./module_admin.js");
//第三方模块  加密
var md5 = require("blueimp-md5");


//渲染admin首页   
module.exports.getIndexPage = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/admin/page/index.html'); //res.render() 为第三方模块 express 内置的方法！
}

//渲染登录页面  
module.exports.getLoginPage = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.render(__dirname + '/views/admin/page/login.html'); //res.render() 为第三方模块 express 内置的方法！
}

//实现admin登录 
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
          req.session.admin = obj;  // 2.需要一些需要的数据 
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

//admin退出登录
module.exports.doLogout = function (req, res) {
  req.session.destroy();
  return res.end(JSON.stringify({ 'code': 200, 'msg': '退出成功！' }));
}

//获取mobile轮播图    
module.exports.getRotation = function (req, res) {
  // req.session.user.LoginName;  //登录名
  mymodule.getRotationData((err, result) => {
    if (err) {
      return res.end(JSON.stringify({ 'code': 500, 'msg': '获取首页轮播图失败！' }));
    } else {
      return res.end(JSON.stringify({ 'code': 200, 'msg': '获取首页轮播图成功！', 'data': result }));
    }
  })

}

//admin上传主页轮播图
module.exports.uploadImg = function (req, res) {
  // 接收参数：因为参数中有图片，需要使用第三方模块formidable
  // 1.创建表单对象
  var form = new formidable.IncomingForm();
  // 2，设置上传的目录   是当前文件的目录，handler.js
  form.uploadDir = './views/mobile/images/';

  form.keepExtensions = true;

  form.parse(req, function (err, fields, files) {
    // 获取一次传递的图片的名称
    var last = fields.last;

    // 实现删除操作
    fs.unlink(__dirname + "/views/mobile/images/" + last, (err) => {
      res.end("没事，继续！！！");
    });
    if (err) {
      var obj = {
        "code": 500,
        "msg": "上传失败"
      }
      return res.end(JSON.stringify(obj));
    }
    var obj = {
      "code": 200,
      "msg": "上传成功",
      // 我们只需要文件名：因为数据文件中存储的仅仅是文件名称，并没有包含文件夹
      "img": path.basename(files.img.path)
    }
    return res.end(JSON.stringify(obj));

  });
}


//admin修改轮播图
module.exports.doEditRotation = function (req, res) {
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });

  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    // console.log(obj);
    for (var x in obj) {
      //  console.log(x);
      //  console.log(obj[x]);
      obj[x] = path.basename(obj[x]);    //截取图片名+后缀
    }
    mymodule.updateImg(obj, (err, result) => {
      if (err) {
        return res.end(JSON.stringify({ "code": 500, "msg": "修改失败" }));
      } else {
        res.end(JSON.stringify({ "code": 200, "msg": "修改成功" }));
      }
    })
  });



}

//获取所有装备信息    
module.exports.getEquipAllData = function (req, res) {
  // req.session.user.LoginName;  //登录名
  mymodule.getEquipAllData((err, result) => {
    if (err) {
      return res.end(JSON.stringify({ 'code': 500, 'msg': '获取装备信息失败！' }));
    } else {
      return res.end(JSON.stringify({ 'code': 200, 'msg': '获取装备信息成功！', 'data': result }));
    }
  })

}
