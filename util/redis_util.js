var redis = require('redis');


module.exports = {

  inquire: function(key, callback) {
  	var client = redis.createClient();
  	client.get(key, function(err, reply) {
	    callback(err, reply);
	});

	// build a map of all keys and their types
	// client.keys('*', function (err, all_keys) {
	//     var key_types = {};

	//     all_keys.forEach(function (key, pos) { // use second arg of forEach to get pos
	//         client.type(key, function (err, type) {
	//             key_types[key] = type;
	//             if (pos === all_keys.length - 1) { // callbacks all run in order
	//                 console.dir(key_types);
	//             }
	//         });
	//     });
	// });
  },

  insert: function() {
  	var client = redis.createClient();
  	client.set('framework', 'AngularJS', function(err, reply) {
		console.log(reply);
	});
  }

};
