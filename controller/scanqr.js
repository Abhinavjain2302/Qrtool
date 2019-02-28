var jwt = require('jsonwebtoken');
var secret = "supersecret";

var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function scanqr(req,res,next){
  jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
     
      res.json({
        msg: "some error occured"
      })
      return;
    }

       var userId = decoded.id;

  var imageBitmap=req.body.imageBitmap;
  var latitude=req.body.latitude;
  var longitude=req.body.longitude;
  var date=req.body.date;
  var time=req.body.time;

  console.log(req.body);
  console.log(latitude);
  console.log(longitude);
  console.log(imageBitmap);

  connection.query("Insert into storeimage (imageBitmap,latitude,longitude,date,time,userId) values('"+imageBitmap+"','"+latitude+"','"+longitude+"','"+date+"','"+time+"','"+userId+"')", function (err, result, fields) {
    if (err) throw err;

    res.json({
      success: true,
      msg: 'scanned image successfully stored in database'
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


module.exports=scanqr;