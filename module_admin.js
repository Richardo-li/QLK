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

//查询装备数据总条数
module.exports.getEquipCount = function (callback) {

  var sql = `select count(*) as total from equip`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//分页获取装备数据
module.exports.getEquipAllData = function (pageNo, callback) {
  var page = (pageNo - 1) * 5;
  var sql = `select * from equip limit ${page},5`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//删除装备信息
module.exports.doDeleteEquipData = function (obj, callback) {
  var sql = `delete from equip where ID = ${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

// 添加装备信息
module.exports.doAddEquipData = function (obj, callback) {
  var sql = `insert into equip(Title,img,content,Link) values('${obj.Title}','${obj.img}','${obj.content}','${obj.Link}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      if (result.affectedRows == 1) {
        callback();
      } else {
        callback(err);
      }
    }
  })

}

//获取一条装备数据
module.exports.getEquipData = function (obj, callback) {
  var sql = `select * from equip where ID=${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//修改装备信息
module.exports.doEditEquipData = function (obj, callback) {
  var sql = `update equip set Link='${obj.Link}',Title='${obj.Title}',img='${obj.img}',content='${obj.content}' where ID = '${obj.id}'`;
  //头像 Headportrait 为默认的，所以自动添加
  connection.query(sql, (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });

}

//查询美食数据总条数
module.exports.getfoodCount = function (callback) {
  var sql = `select count(*) as total from food`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//获取所有美食数据
module.exports.getFoodAllData = function (pageNo, callback) {
  var page = (pageNo - 1) * 5;
  var sql = `select * from food limit ${page},5`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//删除美食信息
module.exports.doDeleteFoodData = function (obj, callback) {
  var sql = `delete from food where ID = ${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

// 添加装备信息
module.exports.doAddFoodData = function (obj, callback) {
  var sql = `insert into food(Title,Picture,content) values('${obj.Title}','${obj.img}','${obj.content}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      if (result.affectedRows == 1) {
        callback();
      } else {
        callback(err);
      }
    }
  })

}

//获取一条美食数据
module.exports.getfoodData = function (obj, callback) {
  var sql = `select * from food where ID=${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//查询美景数据总条数
module.exports.getBeautifulCount = function (callback) {
  var sql = `select count(*) as total from beautiful`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//获取所有美景数据
module.exports.getBeautifulAllData = function (pageNo, callback) {
  var page = (pageNo - 1) * 5;
  var sql = `select * from beautiful limit ${page},5`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

//删除美景信息
module.exports.doDeleteBeautifulData = function (obj, callback) {
  var sql = `delete from beautiful where ID = ${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

// 添加装备信息
module.exports.doAddBeautifulData = function (obj, callback) {
  var sql = `insert into beautiful(Title,Picture,content) values('${obj.Title}','${obj.img}','${obj.content}')`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      if (result.affectedRows == 1) {
        callback();
      } else {
        callback(err);
      }
    }
  })

}

//获取一条美食数据
module.exports.getbeautifulData = function (obj, callback) {
  var sql = `select * from beautiful where ID=${obj.id}`;
  connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
