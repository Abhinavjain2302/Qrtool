var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function qrGenerator(req,res,next){
  var receivercontact = req.body.rmobile;
  var receiverAddress = req.body.raddress;
  var productDescription = req.body.proDescription;
  var receiverName = req.body.rname;
  var imageBitmap=req.body.imageBitmap;
  var latitude=req.body.latitude;
  var longitude=req.body.longitude;

  console.log(req.body);
  console.log(receivercontact);
  console.log(receiverAddress);
  console.log(productDescription);
  console.log(receiverName);
  console.log(imageBitmap);

  connection.query("Insert into qrdata (rcontact,raddress,productdescription,rname,imageBitmap,latitude,longitude) values('" + receivercontact + "','" + receiverAddress + "','" + productDescription + "','" + receiverName + "','"+imageBitmap+"','"+latitude+"','"+longitude+"')", function (err, result, fields) {
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
}


module.exports=qrGenerator;