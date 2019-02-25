var jwt = require('jsonwebtoken');
var secret = "supersecret";
var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function getProfile(req,res,next){

jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
      //console.log("%%%%%%%%%%%%%%%%%%%" + err);
      res.json({
        msg: "some error occured"
      })
      return;
    }
    var userId = decoded.id;


    console.log("Connected form profile");
    connection.query("select * from user where userId='" + userId + "'", function (err, result, fields) {

      if (err) {
        return handleError(err, null, res);
      }
      res.json({
        success: true,
        user: result[0]
      });

    });
  });

}

module.exports=getProfile;