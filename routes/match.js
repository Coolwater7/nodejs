var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');

var pool = mysql.createPool({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'qwert123',
    database:'prototype',
    connectionLimit:20,
    waitForConnections:false
});

router.get('/list', function(req, res, next) {
  res.render('list', {});
});

router.get('listAjax', function() {
	pool.getConnection(function(err,connection){
	    var query = connection.query('select * from prototype.tbwebuser where account ='+mysql.escape(req.query.account),function(err,rows){
	       console.log(rows);
	        res.json(rows);
	        connection.release();
	    });
	});
});

router.post('/upload', function(req, res) {

    fs.readFile(req.files.myfile.path,function(error,data){
        var destination = __dirname + '\\..\\uploaded\\'+ req.files.myfile.name;
        fs.writeFile(destination,data,function(error){
            if(error){
                console.log(error);
                throw error;
            }else{
                res.redirect('back');
            }
        });
    });
});

router.get('/match/:date', function(req, res, next) {
	var matchDate = req.params.date;
  console.log('date : ' + matchDate);
});