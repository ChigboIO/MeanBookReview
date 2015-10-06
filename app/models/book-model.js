var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: {type: String , unique: false, required: true},
	author: {type: String , unique: false, required: false},
	genre: {type: String , unique: false, required: false},
	isbn: {type: String , unique: true, required: true, dropDups: true},
	pages: {type: String , unique: false, required: false}
});

module.exports = mongoose.model('Book', BookSchema);