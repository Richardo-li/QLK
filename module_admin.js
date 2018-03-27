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


//注册时匹配数据库中的用户名是否存在相同的,存在则返回一个数组，里面有对应用户的所有数据
module.exports.getUserByuserName = function (LoginName, callback) {
  var sql = `select * from admin where LoginName='${LoginName}'`;
  // console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//获取首页轮播图
module.exports.getRotationData = function (callback) {
  var sql = `select * from rotation order by ID asc`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//修改首页轮播图      //一次更新多条，对应ID
module.exports.updateImg = function (obj, callback) {
  var sql = `UPDATE rotation
               SET picture = CASE ID
                   WHEN 1 THEN '${obj.p1}'
                   WHEN 2 THEN '${obj.p2}'
                   WHEN 3 THEN '${obj.p3}'
                   WHEN 4 THEN '${obj.p4}'
               END
             WHERE ID IN (1,2,3,4)`

  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//获取所有装备数据
module.exports.getEquipAllData = function (callback) {
  var sql = `select * from equip order by ID desc`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

