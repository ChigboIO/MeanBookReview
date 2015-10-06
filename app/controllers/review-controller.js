var Review = require('../models/review-model');

exports.createBookReview = function(req, res) {
	var review = new Review(req.body);
	review.save(function(err) {
		if(err)
			res.send(err);
		else if(!review)
			res.json({type: false, message: 'Review not created.'});
		else
			res.json({type: true, review: review});
	});
};

exports.getBookReviews = function(req, res) {
	Review.find({bookIsbn: req.params.bookIsbn}, function(err, reviews) {
		if(err)
			res.send(err);
		else if(!reviews.length)
			res.json({type: false, message: 'No review exist for the requested book'});
		else
			res.json({type: true, reviews: reviews});
	});
};

exports.getOneReview = function(req, res) {
	Review.findOne({_id: req.params.reviewId}, function(err, review) {
		if(err)
			res.send(err);
		else if(!review) 
			res.json({type: false, message: 'No such review exist'});
		else
			res.json({type: true, review: review});
	});
};

exports.updateReview = function(req, res) {
	Review.findOneAndUpdate({_id: req.params.reviewId}, req.body, function(err, review) {
		if(err)
			res.send(err);
		else if(!review) 
			res.json({type: false, message: 'No such review exist'});
		else
			res.json({type: true, review: review});
	});
};

exports.deleteReview = function(req, res) {
	Review.remove({_id: req.params.reviewId}, function(err, review) {
		if(err)
			res.send(err);
		else
			res.json({type: true, message: 'Review deleted successfully'});
	});
};