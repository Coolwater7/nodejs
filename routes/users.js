var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('date-utils');

// var connection = mysql.createConnection({
//     host    :'localhost',
//     port : 3306,
//     user : 'root',
//     password : 'qwert123',
//     database:'prototype'
// });


var pool = mysql.createPool({
    host    :'localhost',
    port : 3306,
    user : 'root',
    password : 'qwert123',
    database:'prototype',
    connectionLimit:20,
    waitForConnections:false
});


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/inqUser', function(req,res){
	pool.getConnection(function(err,connection){
	    var query = connection.query('select * from prototype.tbwebuser where account ='+mysql.escape(req.query.account),function(err,rows){
	       console.log(rows);
	        res.json(rows);
	        connection.release();
	    });
	});
});

router.get('/regUser', function(req, res, next) {
	res.render('user');
});

router.get('/user/:id', function(req, res, next) {
	pool.getConnection(function(err,connection){
	    var query = connection.query('select * from prototype.tbwebuser where account ='+mysql.escape(req.params.id),function(err,rows){
	       console.log(rows);
	        res.json(rows);
	        connection.release();
	    });
	});
});

router.post('/regUser', function(req, res) {
	// res.render('user');

	var user=req.body;
	user.site_clss='01';

	var dt = new Date();
	var d = dt.toFormat('YYYYMMDD');
	user.reg_date=d;

	console.log(user);

	pool.getConnection(function(err,connection){

		var query = connection.query('insert into tbwebuser set ?',user,function(err,result){
	        if (err) {
	            console.error(err);
	            // throw err;
	            res.status(500).send('failed');
	        } else {
				console.log(query);
		        //res.send(200,'success');
		        res.status(200).send('success');
	        }
	        
	        connection.release();
	    });
	});
});

module.exports = router;
