var express = require('express');
var router = require('./router_admin.js');   //设置路由的js文件
var session = require('express-session');  //session  第三方模块
var app = express();


//引入静态资源
app.use('/admin', express.static('views/admin'));  //静态资源的托管，HTML页面中获取静态资源需要加上 mobile/... ,如  mobile/images/1.jpg
app.use('/mobile', express.static('views/mobile/'));  //静态资源的托管，HTML页面中获取静态资源需要加上 mobile/... ,如  mobile/images/1.jpg
app.use('/node_modules', express.static('node_modules'));

//添加express中的template模板
app.engine('html', require('express-art-template'));

// 添加使用session中间件                                                          
app.use(session({
  secret: 'mylove1',
  resave: false,
  saveUninitialized: false
}))


//添加端口监听
app.listen(3002, () => {
  console.log('http://127.0.0.1:3002');
})


// 添加中间件：判断是否登陆过，如果没有登陆，则跳转到登陆页面。否则可以继续操作
// next:如果执行完当前中间件的操作之后需要继续后续的操作，则需要使用next继续操作，如果没有添加next,那么操作到这里就结束了
// 全局中间件
app.use((req, res, next) => {
  if (req.session.isLogin == true || req.url == "/login") {
    next(); //不需要登录的页面，直接跳过！
  } else {
    res.writeHeader(200, {
      "Content-Type": "text/html;charset=utf-8"
    });
    //需要登录才能使用
    res.end("<script>alert('您还没有登陆，请先登陆');location.href='/login';</script>");
  }

});




//添加路由
app.use(router);

