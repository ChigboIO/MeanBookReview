var contact = require('./controllers/contact_controller.js');

// exports.rootRoute = function(Router, passport) {
// 	Router.route('/').get(rootHomeClosure = function(req, res) {	// the closure here is named.
// 		res.json({message: 'This is the App HOME'});
// 	});

// 	Router.route('/login')
// 		.get(rootGetLoginClosure = function(req, res) {
// 			res.render('login.ejs', { message: req.flash('loginMessage') });
// 		})
// 		.post(rootPostLoginClosure = function(req, res) {
// 			//do some login logic here
// 		});

// 	Router.route('/signup')
// 		.get(rootGetSignupClosure = function(req, res) {
// 			res.render('signup.ejs', { message: req.flash('signupMessage') });
// 		})
// 		.post(rootPostSignupClosure = function(req, res) {
// 			//do some signup logic here
// 		});

// };

exports.apiRoute = function(Router, passport) {
	
	Router.route('/').get(apiHomeClosure = function(req, res) {	// the closure here is named.
		res.render('index')
	});


	Router.route('/login')
		.get(rootGetLoginClosure = function(req, res) {
			res.render('login', { message: req.flash('loginMessage') });
		})
		.post(passport.authenticate('local-login', {
	        successRedirect : '/api/profile', // redirect to the secure profile section
	        failureRedirect : '/api/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	Router.route('/signup')
		.get(rootGetSignupClosure = function(req, res) {
			res.render('signup', { message: req.flash('signupMessage') });
		})
		.post(passport.authenticate('local-signup', {
	        successRedirect : '/api/profile', // redirect to the secure profile section
	        failureRedirect : '/api/signup', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	    }));

	Router.route('/profile').get(isLoggedIn, getProfileClosure = function(req, res, next) {
		res.render('profile',  {
            user : req.user // get the user out of session and pass to template
        });
	});

	Router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/api');
	});

	Router.route('/contacts')
		.get(isLoggedIn, contact.getAll)
		.post(isLoggedIn, contact.createContact);

	Router.route('/contacts/:contact_name')
		.get(isLoggedIn, contact.getContact)
		.put(isLoggedIn, contact.updateContact)
		.delete(isLoggedIn, contact.deleteContact);
};

isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated)
		next();
	else
		res.redirect('/api');
};