var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
	bookIsbn: {type: String, required: true},
	reviewerId: {type: String, required: true},
	review: {type: String, required: true}
});

module.exports = mongoose.model('Review', reviewSchema);