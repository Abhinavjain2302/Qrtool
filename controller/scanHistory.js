var jwt = require('jsonwebtoken');
var secret = "supersecret";

var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function scanHistory(req,res,next){
  jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
      //console.log("%%%%%%%%%%%%%%%%%%%" + err);
      res.json({
        msg: "some error occured"
      })
      return;
    }

  var userId = decoded.id;

    console.log(req.body);
  var qrId=req.body.id;


  var sql="SELECT imageBitmap,latitude,longitude,scanqrId,storeimage.date,storeimage.time,scanqr.userId,user.name,user.contact FROM storeimage LEFT JOIN scanqr ON storeimage.imageId=scanqr.imageId  AND scanqrId='"+qrId+"' LEFT JOIN user ON user.userId=scanqr.userId ORDER BY date"
  connection.query(sql, function (err, result, fields) {
      if (err) {
      console.log(err);
      console.log("db connection problem");
      res.json({
        success:false
      })
      //reject("success false");
    }else{
     
    console.log(result);
    
    res.json({
      success: true,
      status:result
    });
      }
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


module.exports=scanHistory;