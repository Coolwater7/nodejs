var express = require('express');
var router = express.Router();
var redis_util = require('../util/redis_util');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/redis', function(req, res, next) {
  
  redis_util.inquire('framework', function(err, data) {
  	console.log(err);
  	console.log(data);
	res.render('index', {title : data});
  });

 
});

module.exports = router;
