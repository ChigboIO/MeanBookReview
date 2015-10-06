//load the book model file and select the 'Book' mongoose model
var Book = require('../models/book-model');

exports.getAll = function(req, res) {
	// find and return all the books in the book model
	Book.find(function(err, books) {
		if (err) {
			res.send(err);
		} else if(!books.length) {
			res.json({message: "No book exist in DB"});
		} else {
			res.json(books);
		}
	});
};

exports.createBook = function(req, res) {
	// create and save a book
	if(!bookExists(req.body.name)){
		var book = new Book(req.body);
		book.save(function(err) {
			if(err)
				res.send(err);
			else
				res.json(book);
		});
	} else {
		res.json({message: "Book ISBN already exist"});
	}
};

exports.getBook = function(req, res) {
	// get one particular book
	Book.find({isbn: req.params.bookIsbn}, function(err, book) {
		if(err)
			res.send(err);
		else if(!book.length)
			res.json({message: "No book with that ISBN was found"});
		else
			res.json(book);
	});
};

exports.updateBook = function(req, res) {
	// update a book information
	if(!bookExists(req.body.name)) {
		Book.findOneAndUpdate({isbn: req.params.bookIsbn}, req.body, function(err, book) {
			if(err)
				res.send(err);
			else if(book === null)
				res.json({message: "No matching book found"});
			else
				res.json(book);
		});
	} else {
		res.json({message: "Book ISBN already exist"});
	}
};

exports.deleteBook = function(req, res) {
	// delete a selected book
	Book.remove({isbn: req.params.bookIsbn}, function(err, book) {
		if(err)
			res.send(err);
		else
			res.json({message: "Book deleted successfully"});
	});
};

var exists_responce = false;
bookExists = function(arg_isbn) {
	exists_responce = false;

	Book.find({isbn: arg_isbn}, function(err, book) {
		if(book.length){
			// console.log('book already exists');
			exists_responce = true;
		}
		else{
			// console.log('book does not exist');
			exists_responce = false;
		}
	});
	console.log(exists_responce);
	return exists_responce;
};