var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()
var app = express()

app.use(cors())
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });



app.get('/hello' ,function(req,res,next){
  res.json({msg:'helloworld'})  
})

app.get('/attractions' ,function(req,res,next){
    pool.query("select * from attractions",function(err,rows,fields){
        res.json(rows)
        console.log(err)
    })
  })



app.listen(5000,function(){
    console.log('web server listening on port 5000')
})