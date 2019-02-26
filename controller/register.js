var bcrypt = require('bcrypt');
var mysql = require('mysql');

var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);


function register(req,res,next){
 var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var contact = req.body.contact.slice(2 - 12);
  console.log(contact);


  connection.query("select contact from user", function (err, result, fields) {
    if (err) throw err;
    else {
      for (var i = 0; i < result.length; i++) {

        if (contact == result[i].contact) {
          console.log("mobile number" + contact + "already exist");
          return res.json({
            success: true,
            msg: 'mobile number already exist'
          });
        }

      }
      console.log("mobile number" + contact + "does not exist");

    }


    var newUser = ({
      name: name,
      email: email,
      password: password,
      contact: contact

    });


    bcrypt.hash(newUser.password, 10, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;



      var sql = "Insert into user ( name , email , contact,password) values('" + newUser.name + "','" + newUser.email + "','" + newUser.contact + "','" + newUser.password + "')";
      connection.query(sql, function (err, result) {
        if (err) throw err;


        return res.json({
          success: true,
          msg: 'user created'
        });

      });

    });
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

module.exports=register;