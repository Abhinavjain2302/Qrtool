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

  //var promise =new Promise(function(resolve,reject){
  connection.query("Insert into scanqr (qrId,userId) values('"+qrId+"','"+userId+"')", function (err, result, fields) {
    if (err) {
      console.log(err);
      console.log("db connection problem");
      res.json({
        success:false
      })
      //reject("success false");
    }else{
     //resolve("success");

   
//})

 // promise.then(function(value){
  //console.log(value);
  connection.query("select * from storeimage where userId='"+userId+"'",function(err,result2){
   if (err) {
      console.log(err);
      console.log("db connection problem");
      res.json({
        success:false
      })
    }else{
     connection.query("UPDATE storeimage SET qrId ='"+qrId+"' where imageId='"+result2[result2.length-1].imageId+"'",function(err,result3){
    if (err) {
      console.log(err);
      console.log("db connection problem");
      res.json({
        success:false
      })
    }else{
      console.log("qrId stored in storeimage");
      connection.query("UPDATE scanqr SET imageId ='"+result2[result2.length-1].imageId+"' where scanId='"+result.insertId+"'",function(err,result4){
    if (err) {
      console.log(err);
      console.log("db connection problem");
      res.json({
        success:false
      })
    }else{
       console.log(result.insertId);
       console.log("imageId stored in scanqr table");
      }

       })
    }


     })

     console.log(result2);
    }
   

  })


   res.json({
      success: true
    });
   }
  })    

  //})


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