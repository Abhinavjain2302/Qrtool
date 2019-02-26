var jwt = require('jsonwebtoken');
var secret = "supersecret";

var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function scanResult(req,res,next){
  jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
      //console.log("%%%%%%%%%%%%%%%%%%%" + err);
      res.json({
        msg: "some error occured"
      })
      return;
    }

  var userId = decoded.id;

  var scanData=req.body.data;


  console.log(req.body);
  console.log(scanData);
  console.log(scanData.split("qrId:")[1]);
  var qrId=scanData.split("qrId:")[1];

  connection.query("Insert into scanqr (qrId,userId) values('"+qrId+"','"+userId+"')", function (err, result, fields) {
    if (err) throw err;

    res.json({
      success: true
    });

  })
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


module.exports=scanResult;