const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

var con = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


// con.connect(function(err){
//     if(err) throw err;
//     console.log("Connected!")
// })


module.exports = con;
