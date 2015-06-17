var mongoose = require('mongoose'),
	fs = require('fs');

// bootstrap connections.

console.log('connect to db');
var db = mongoose.connect('mongodb://localhost/first-restify-db');

// bootstrap modules

var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function(file) {
	console.log('load model ' + file);
    require(models_path + '/' + file);
});
