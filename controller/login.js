var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = "supersecret";
var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);



var login=function (req, res, next) {

  var contact = req.body.contact;
  var password = req.body.password;

  console.log(typeof (req.body.contact));
  console.log(contact);
  console.log(password);
  connection.query("select * from user where contact='" + contact + "'", function (err, result, fields) {
    if (err) {
      return handleError(err, null, res);
    }
    else {

      if (result.length <= 0) {
        console.log("user with contact number: " + contact + " does not exist");
        msg = "user with contact number does not exist";
        debugger
        return handleError(null, msg, res);
        
      }
      console.log(result[0].password);


      bcrypt.compare(password, result[0].password, function (err, isMatch) {
        if (err) {
          return handleError(err, null, res);
        }
        if (!isMatch) {
          return handleError(null, "wrong password", res);
        }
        jwt.sign({ id: result[0].userId }, secret, function (err, token) {
          if (err) handleError(err, null, res);
          res.json({
            success: true,
            token: token

          });
        });
      })
    }
  })
}

//this function is a general error handler
function handleError(err, msg, res) {
  console.log(err);
  if (msg == undefined) {
    msg = "there was some error at the server"
  }
  return res.json({
    success: false,
    msg: msg,
    err: err
  })
}



module.exports = login;