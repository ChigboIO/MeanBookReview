var setup = require('../config/setup');
var jwt = require('jsonwebtoken');
var User = require('../models/user-model');


exports.createUser = function(req, res) {
	// create and save a user
	// if(!emailExists(req.body.email)){
		var user = new User(req.body);
		user.save(function(err) {
			if(err)
				res.send(err);
			else
				res.json(user);
		});
	// } else {
	// 	res.json({message: "Email already in use"});
	// }
};


exports.getAllUsers = function(req, res) {
	// find and return all the books in the book model
	User.find(function(err, users) {
		if (err) {
			res.send(err);
		} else if(!users.length) {
			res.json({message: "No registered User"});
		} else {
			res.json(users);
		}
	});
};


exports.authenticate = function(req, res, next) {
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
		if(err)
			res.send(err);
		else if(!user)
			res.json({success: false, message: "Invalid email or password"});
		else{
			var token = jwt.sign(user, setup.config.JWT_SECRET, {
				expiresInMinutes: 1440 //expires in 24hrs
			});
			res.json({success: true, message: "Successfully authenticated.", token: token});
		}
	});
};


exports.isAuthenticated = function(req, res, next) {
	
  	// check header or url parameters or post parameters for token
  	var token = req.body.token || req.query.token || req.headers['x-access-token'];

  	// decode token
  	if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, setup.config.JWT_SECRET, function(err, decoded) {      
	      	if (err) {
	        	return res.json({ success: false, message: 'Failed to authenticate token.' });
	      	} else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;    
		        next();
		    }
	    });

  	} else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	}


	// if(req.isAuthenticated)
	// 	next();
	// else
	// 	res.redirect('/api');
};