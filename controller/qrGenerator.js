var jwt = require('jsonwebtoken');
var secret = "supersecret";
var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function qrGenerator(req,res,next){
  jwt.verify(req.headers.authorization, secret, function (err, decoded) {
    if (err) {
      //console.log("%%%%%%%%%%%%%%%%%%%" + err);
      res.json({
        msg: "some error occured"
      })
      return;
    }

       var userId = decoded.id;


  var receivercontact = req.body.rmobile;
  var receiverAddress = req.body.raddress;
  var productDescription = req.body.proDescription;
  var receiverName = req.body.rname;
  var imageBitmap=req.body.imageBitmap;
  var latitude=req.body.latitude;
  var longitude=req.body.longitude;
  var date=req.body.date;
  var time=req.body.time;

  console.log(req.body);
  console.log(receivercontact);
  console.log(receiverAddress);
  console.log(productDescription);
  console.log(receiverName);
  console.log(imageBitmap);

  connection.query("Insert into qrdata (rcontact,raddress,productdescription,rname,imageBitmap,latitude,longitude,creatorId,date,time) values('" + receivercontact + "','" + receiverAddress + "','" + productDescription + "','" + receiverName + "','"+imageBitmap+"','"+latitude+"','"+longitude+"','"+userId+"','"+date+"','"+time+"')", function (err, result, fields) {
    if (err) throw err;

    var result = {
      rmobile: receivercontact,
      raddress: receiverAddress,
      proDescription: productDescription,
      rname: receiverName,
      imageBitmap:imageBitmap,
      latitude:latitude,
      longitude:longitude
    }


    res.json({
      success: true,
      msg: 'qrdata successfully stored in database',
      data: result
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

module.exports=qrGenerator;