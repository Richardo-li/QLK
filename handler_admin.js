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

    // 实现删除操作，删除上一张不要的图片
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
      // 只需要文件名：因为数据文件中存储的仅仅是文件名称，并没有包含文件夹
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
    for (var x in obj) {
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

//分页获取装备信息    
module.exports.getEquipAllData = function (req, res) {
  var url = req.url;
  // 接收参数
  var pageNo = myurl.parse(url, true).query.pageNo;
  var total = '';
  //获取总条数
  mymodule.getEquipCount((err, result) => {
    if (err) {
      return res.end(JSON.stringify({ 'code': 500, 'msg': '获取总条数失败！' }));
    } else {
      total = result[0].total;
      //根据pageNo获取数据
      mymodule.getEquipAllData(pageNo, (err, result) => {
        if (err) {
          return res.end(JSON.stringify({ 'code': 500, 'msg': '获取美景信息失败！' }));
        } else {
          return res.end(JSON.stringify({ 'code': 200, 'msg': '获取美景信息成功！', 'data': result, 'total': total, 'currentPage': pageNo }));
        }
      })
    }
  })
}

//删除装备信息
module.exports.doDeleteEquip = function (req, res) {
  //先得到前端传来的数据
  var str = '';
  req.on('data', (chunk) => {
    str += chunk;
  })
  req.on('end', () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象

    mymodule.doDeleteEquipData(obj, (err, result) => {
      if (err) return res.end('服务器异常');
      return res.end(JSON.stringify({
        code: 200,
        msg: '删除成功！'
      }))

    });

  })

}

// 添加装备信息
module.exports.doAddEquip = function (req, res) {
  // 接收参数
  // data事件可以接收参数，但是是以拼接的方式，如果参数较多，有可能分多次来接收，
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 判断参数是否完全接收完毕
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    obj.img = path.basename(obj.img);
    mymodule.doAddEquipData(obj, (err, result) => {
      if (err) return res.end(JSON.stringify({ "code": 500, "msg": "添加失败" }));
      res.end(JSON.stringify({ "code": 200, "msg": "添加成功" }));
    })

  });
}

//获取一条装备信息    
module.exports.getEquip = function (req, res) {
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    mymodule.getEquipData(obj, (err, result) => {
      if (err) {
        return res.end(JSON.stringify({ 'code': 500, 'msg': '获取装备信息失败！' }));
      } else {
        return res.end(JSON.stringify({ 'code': 200, 'msg': '获取装备信息成功！', 'data': result }));
      }
    })

  });


}

//admin修改装备信息
module.exports.doEditEquip = function (req, res) {
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象

    obj.img = path.basename(obj.img);    //截取图片名+后缀

    mymodule.doEditEquipData(obj, (err, result) => {
      if (err) {
        return res.end(JSON.stringify({ "code": 500, "msg": "修改失败" }));
      } else {
        res.end(JSON.stringify({ "code": 200, "msg": "修改成功" }));
      }
    })
  });
}

//分页获取美食信息    
module.exports.getFoodAllData = function (req, res) {
  var url = req.url;
  // 接收参数
  var pageNo = myurl.parse(url, true).query.pageNo;
  var total = '';
  //获取总条数
  mymodule.getfoodCount((err, result) => {
    if (err) {
      return res.end(JSON.stringify({ 'code': 500, 'msg': '获取总条数失败！' }));
    } else {
      total = result[0].total;
      //根据pageNo获取数据
      mymodule.getFoodAllData(pageNo, (err, result) => {
        if (err) {
          return res.end(JSON.stringify({ 'code': 500, 'msg': '获取美景信息失败！' }));
        } else {
          return res.end(JSON.stringify({ 'code': 200, 'msg': '获取美景信息成功！', 'data': result, 'total': total, 'currentPage': pageNo }));
        }
      })
    }
  })
}

//删除美食信息
module.exports.doDeleteFood = function (req, res) {
  //先得到前端传来的数据
  var str = '';
  req.on('data', (chunk) => {
    str += chunk;
  })
  req.on('end', () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象

    mymodule.doDeleteFoodData(obj, (err, result) => {
      if (err) return res.end('服务器异常');
      return res.end(JSON.stringify({
        code: 200,
        msg: '删除成功！'
      }))

    });

  })

}

// 添加美食信息
module.exports.doAddFood = function (req, res) {
  // 接收参数
  // data事件可以接收参数，但是是以拼接的方式，如果参数较多，有可能分多次来接收，
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 判断参数是否完全接收完毕
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    obj.img = path.basename(obj.img);
    mymodule.doAddFoodData(obj, (err, result) => {
      if (err) return res.end(JSON.stringify({ "code": 500, "msg": "添加失败" }));
      res.end(JSON.stringify({ "code": 200, "msg": "添加成功" }));
    })

  });
}

//获取一条美食信息    
module.exports.getfood = function (req, res) {
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    mymodule.getfoodData(obj, (err, result) => {
      if (err) {
        return res.end(JSON.stringify({ 'code': 500, 'msg': '获取美食信息失败！' }));
      } else {
        return res.end(JSON.stringify({ 'code': 200, 'msg': '获取美食信息成功！', 'data': result }));
      }
    })

  });


}

//分页获取美景信息      
module.exports.getBeautifulAllData = function (req, res) {
  var url = req.url;
  // 接收参数
  var pageNo = myurl.parse(url, true).query.pageNo;
  var total = '';
  //获取总条数
  mymodule.getBeautifulCount((err, result) => {
    if (err) {
      return res.end(JSON.stringify({ 'code': 500, 'msg': '获取总条数失败！' }));
    } else {
      total = result[0].total;
      //根据pageNo获取数据
      mymodule.getBeautifulAllData(pageNo, (err, result) => {
        if (err) {
          return res.end(JSON.stringify({ 'code': 500, 'msg': '获取美景信息失败！' }));
        } else {
          return res.end(JSON.stringify({ 'code': 200, 'msg': '获取美景信息成功！', 'data': result, 'total': total, 'currentPage': pageNo }));
        }
      })
    }
  })
}

//删除美景信息
module.exports.doDeleteBeautiful = function (req, res) {
  //先得到前端传来的数据
  var str = '';
  req.on('data', (chunk) => {
    str += chunk;
  })
  req.on('end', () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    mymodule.doDeleteBeautifulData(obj, (err, result) => {
      if (err) return res.end('服务器异常');
      return res.end(JSON.stringify({
        code: 200,
        msg: '删除成功！'
      }))

    });

  })

}

// 添加美食信息
module.exports.doAddBeautiful = function (req, res) {
  // 接收参数
  // data事件可以接收参数，但是是以拼接的方式，如果参数较多，有可能分多次来接收，
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 判断参数是否完全接收完毕
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    obj.img = path.basename(obj.img);
    mymodule.doAddBeautifulData(obj, (err, result) => {
      if (err) return res.end(JSON.stringify({ "code": 500, "msg": "添加失败" }));
      res.end(JSON.stringify({ "code": 200, "msg": "添加成功" }));
    })

  });
}

//获取一条美食信息    
module.exports.getbeautiful = function (req, res) {
  var str = "";
  req.on("data", (chunk) => {
    str += chunk;
  });
  req.on("end", () => {
    var obj = querystring.parse(str);   //querystring第三方模块将拿到的数据分解成对象
    mymodule.getbeautifulData(obj, (err, result) => {
      if (err) {
        return res.end(JSON.stringify({ 'code': 500, 'msg': '获取美景信息失败！' }));
      } else {
        return res.end(JSON.stringify({ 'code': 200, 'msg': '获取美景信息成功！', 'data': result }));
      }
    })

  });


}