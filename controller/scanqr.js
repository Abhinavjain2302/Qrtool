var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function scanqr(req,res,next){
  var imageBitmap=req.body.imageBitmap;
  var latitude=req.body.latitude;
  var longitude=req.body.longitude;

  console.log(latitude);
  console.log(longitude);
  console.log(imageBitmap);

  connection.query("Insert into scanimage (imageBitmap,latitude,longitude) values('"+imageBitmap+"','"+latitude+"','"+longitude+"')", function (err, result, fields) {
    if (err) throw err;

    res.json({
      success: true,
      msg: 'scanned image successfully stored in database'
    });



  })

}

module.exports=scanqr;