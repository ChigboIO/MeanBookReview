var user = require('./controllers/user-controller');
var book = require('./controllers/book-controller');
var review = require('./controllers/review-controller');

// exports.rootRoute = function(Router, passport) {
// 	Router.route('/').get(rootHomeClosure = function(req, res) {	// the closure here is named.
// 		res.render('index');
// 	});

// 	Router.route('/login')
// 		.get(rootGetLoginClosure = function(req, res) {
// 			res.render('login', { message: req.flash('loginMessage') });
// 		})
// 		.post(passport.authenticate('local-login', {
// 	        successRedirect : '/profile', // redirect to the secure profile section
// 	        failureRedirect : '/login', // redirect back to the signup page if there is an error
// 	        failureFlash : true // allow flash messages
// 	    }));

// 	Router.route('/signup')
// 		.get(rootGetSignupClosure = function(req, res) {
// 			res.render('signup', { message: req.flash('signupMessage') });
// 		})
// 		.post(passport.authenticate('local-signup', {
// 	        successRedirect : '/profile', // redirect to the secure profile section
// 	        failureRedirect : '/signup', // redirect back to the signup page if there is an error
// 	        failureFlash : true // allow flash messages
// 	    }));


// 	Router.route('/profile').get(isLoggedIn, getProfileClosure = function(req, res, next) {
// 		res.render('profile',  {
//             user : req.user // get the user out of session and pass to template
//         });
// 	});

// 	Router.get('/logout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});

// };

exports.apiRoute = function(Router, passport) {
	
	// The authentication should be handled here. i.e POST login
	Router.route('/')
		.get(apiHomeClosure = function(req, res) {	// the closure here is named.
			res.json({message: 'This is the API HOME'}); // Request isn't coming here afterall
		})
		.post(user.authenticate);

	Router.route('/signup')
		.get(function(req, res) {
			res.json({message: 'API user signup form'});
		})
		.post(user.createUser);

	Router.route('/login')
		.get(function(req, res) {
			res.json({message: 'API user login form'});
		})
		.post(user.authenticate);

	Router.route('/users')
		.get(user.isAuthenticated, user.getAllUsers);

	Router.route('/books')
		.get(book.getAll)
		.post(user.isAuthenticated, book.createBook);

	Router.route('/books/:bookIsbn')
		.get(book.getBook)
		.put(user.isAuthenticated, book.updateBook)
		.delete(user.isAuthenticated, book.deleteBook);

	Router.route('/reviews/:bookIsbn')
		.get(review.getBookReviews)
		.post(user.isAuthenticated, review.createBookReview);

	Router.route('/reviews/review/:reviewId')
		.get(review.getOneReview)
		.put(user.isAuthenticated, review.updateReview)
		.delete(user.isAuthenticated, review.deleteReview);
};
