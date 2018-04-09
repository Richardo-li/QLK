var express = require('express');
var router = require('./router.js');   //设置路由的js文件
var session = require('express-session');  //session  第三方模块
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

// 添加使用session中间件                                                          
app.use(session({
  secret: 'mylove',
  resave: false,
  saveUninitialized: false
}))


//添加端口监听
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000');
})


// 添加中间件：判断是否登陆过，如果没有登陆，则跳转到登陆页面。否则可以继续操作
// next:如果执行完当前中间件的操作之后需要继续后续的操作，则需要使用next继续操作，如果没有添加next,那么操作到这里就结束了
// 全局中间件
app.use((req, res, next) => {             //str.indexOf("3") != -1
  if (req.session.isLogin == true || req.url == "/login" || req.url.indexOf('/foodDetail') != -1 || req.url.indexOf('/beautifulDetail') != -1 || req.url == "/equip" || req.url == "/beautiful" || req.url == "/food" || req.url == "/getWeather" || req.url == "/getRotation" || req.url == "/" || req.url == '/register' || req.url == '/companion' || req.url == '/editHeadportrait' || req.url.indexOf('/companionDetail') != -1) {
    next(); //不需要登录的页面，直接跳过！
  } else {
    res.writeHeader(200, {
      "Content-Type": "text/html;charset=utf-8"
    });
    //需要登录才能使用
    res.end("<script>location.href='/login';</script>");
  }
});







//添加路由
app.use(router);

