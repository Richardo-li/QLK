var express = require('express');
var router = require('./router.js');   //设置路由的js文件
// var session = require('express-session');  //session
var app = express();

//设置跨域访问
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

//引入静态资源
app.use('/mobile', express.static('views/mobile/'));  //静态资源的托管，HTML页面中获取静态资源需要加上 mobile/... ,如  mobile/images/1.jpg
app.use('/node_modules', express.static('node_modules'));

//添加express中的template模板
app.engine('html', require('express-art-template'));

//添加端口监听
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})

//添加路由
app.use(router);

