var jwt = require('jsonwebtoken');
var secret = "supersecret";
var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function postProfile(res,res,next){

jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
      //console.log("%%%%%%%%%%%%%%%%%%%" + err);
      res.json({
        msg: "some error occured"
      })
      return;
    }
    var userId = decoded.id;


    var id = userId;
    var name = req.body.name;
    var email = req.body.email;

    console.log("Connected form edit profile");

    var sql = "update user SET name='" + name + "', email='" + email + "' where userId='" + id + "'";
    console.log(sql);
    connection.query(sql, function (err, result, fields) {
      if (err) {
        handleError(err, null, res);
      }
      res.json({
        success: true
      })
    });


  });

}

module.exports=postProfile;