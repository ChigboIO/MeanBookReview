process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var setup = require('./app/config/setup');

//connect to mong
require('mongoose').connect(setup.config.DB_URL);

// var passport = require('./app/config/passport');
var	app		= require('./app/config/express')();
var	port	= setup.config.PORT;

app.listen(port);

module.exports = app;
console.log('App running in http://localhost:' + port);