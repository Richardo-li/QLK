// 此文件用来对数据库操作，然后返回一个回调函数！！！！！！

//使用数据库
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'db_travel' //数据库名
});

connection.connect();


// 主页面获取结伴模块的十条记录
module.exports.getCompanionData = function (callback) {
  var sql = 'select * from companion order by ID desc limit 10';    //select * from table1 limit 10
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

//结伴页面所有记录
module.exports.getCompanionAllData = function (callback) {
  var sql = 'select * from companion order by ID desc';
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

// 增加一条记录到结伴信息表
module.exports.doAddCompanioninfo = function (newObj, callback) {
  var sql = `insert into companion(Title,StartDate,Startpoint,Termini,Phone,Content) values('${newObj.Title}','${newObj.StartDate}','${newObj.Startpoint}','${newObj.Termini}','${newObj.Phone}','${newObj.Content}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      // console.log(result);
      if (result.affectedRows == 1) {
        callback();
      } else {
        callback(err);
      }
    }
  })

}

//注册时匹配数据库中的用户名是否存在相同的,存在则返回一个数组，里面有对应用户的所有数据
module.exports.getUserByuserName = function (LoginName, callback) {
  var sql = `select * from member where LoginName='${LoginName}'`;
  // console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//添加用户--注册
module.exports.addUser = function (obj, callback) {
  var x = parseInt(8 * Math.random() + 1);
  //随机头像
  var sql = `insert into member(LoginName,LoginPwd,Headportrait) values('${obj.LoginName}','${obj.LoginPwd}','default${x}.png')`;
  //头像 Headportrait 为默认的，所以自动添加
  connection.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });

}

//会员修改个人资料
module.exports.editper = function (obj, callback) {



  var sql = `update member set MemberName='${obj.MemberName}',Phone='${obj.Phone}',Address='${obj.Address}',Email='${obj.Email}',BirthDate='${obj.BirthDate}',QQ='${obj.QQ}',Sex='${obj.Sex}' where LoginName = '${obj.LoginName}'`;

  // var sql = `insert into member(LoginName,LoginPwd,Headportrait) values('${obj.LoginName}','${obj.LoginPwd}','default${x}.png')`;
  //头像 Headportrait 为默认的，所以自动添加
  connection.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });

}