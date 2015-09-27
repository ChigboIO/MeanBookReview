var express = require('express');
var	bodyParser = require('body-parser');
var passport = require('./passport')();
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

module.exports = function() {
	var app = express();

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(morgan('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	app.use(express.static('./public'));

	var routes = require('../routes.js');

	// var rootRouter = express.Router();
	// routes.rootRoute(rootRouter, passport);

	var apiRouter = express.Router();
	routes.apiRoute(apiRouter, passport);

	// app.use('/', rootRouter);
	app.use('/api', apiRouter);

	return app;
};