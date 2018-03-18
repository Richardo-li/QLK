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

//注册时匹配数据库中的用户名是否存在相同的，存在相同不允许注册该用户名
// module.exports.getUserByuserName = function (LoginName, callback) {
//   var sql = "select * from member where LoginName =" + LoginName;
//   connection.query(sql, (err, results, fileds) => {
//     if (err) {
//       return callback(err);
//     }
//     callback(null, results[0]);
//   });
// }

module.exports.getUserByuserName = function (LoginName, callback) {
  var sql = `select * from member where LoginName='${LoginName}'`;
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
  var sql = `insert into member(LoginName,LoginPwd) values('${obj.LoginName}','${obj.LoginPwd}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });

}