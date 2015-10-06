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
	PORT: process.env.PORT || 3000,
	JWT_SECRET: 'ilovescotchyscotch',
	DB_URL: env.DB_URL || 'mongodb://127.0.0.1/book_review'
};