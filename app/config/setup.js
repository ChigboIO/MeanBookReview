//////////////////////////////////////////
// setup the backend API configurations //
//////////////////////////////////////////

// pull all dependencies

// var mongoose = require('mongoose');

var env = require('./env/' + process.env.NODE_ENV + '.js');

// exports.express = function() {
// 	var app = require('./express')(express, bodyParser);
// 	return app;
// };

// exports.mongoose = function() {
// 	return require('./mongoose')(env.db);
// };

exports.config = {
	port: process.env.PORT || 3000,
	dbUrl: env.db || 'mongodb://127.0.0.1/address_book'
};