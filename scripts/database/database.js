'use strict';

var mongoose = require('mongoose'),
	fs = require('fs');

// bootstrap connections.

console.log('connect to db');
var db = mongoose.connect('mongodb://localhost/angular-restify-mongo-blogger');

// bootstrap modules

var modelsPath = __dirname + '/models';
fs.readdirSync(modelsPath).forEach(function(file) {
	console.log('load model ' + file);
    require(modelsPath + '/' + file);
});
