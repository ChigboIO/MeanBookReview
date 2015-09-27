//load the contact model file and select the 'Contact' mongoose model
require('../models/contact_model');
Contact = require('mongoose').model('Contact');

exports.getAll = function(req, res) {
	// find and return all the contacts in the contact model
	Contact.find(function(err, contacts) {
		if (err) {
			res.send(err);
		} else if(!contacts.length) {
			res.json({message: "No contact exist in address book"});
		} else {
			res.json(contacts);
		}
	});
};

exports.createContact = function(req, res) {
	// create and save a contact
	if(!contactExists(req.body.name)){
		var contact = new Contact(req.body);
		contact.save(function(err) {
			if(err)
				res.send(err);
			else
				res.json(contact);
		});
	} else {
		res.json({message: "Contact Name already exist"});
	}
};

exports.getContact = function(req, res) {
	// get one particular contact
	Contact.find({name: req.params.contact_name}, function(err, contact) {
		if(err)
			res.send(err);
		else if(!contact.length)
			res.json({message: "No such contact found in address book"});
		else
			res.json(contact);
	});
};

exports.updateContact = function(req, res) {
	// update a contact information
	if(!contactExists(req.body.name)) {
		Contact.findOneAndUpdate({name: req.params.contact_name}, req.body, function(err, contact) {
			if(err)
				res.send(err);
			else if(contact === null)
				res.json({message: "No matching contact found"});
			else
				res.json(contact);
		});
	} else {
		res.json({message: "Contact Name already exist"});
	}
};

exports.deleteContact = function(req, res) {
	// delete a selected contact
	Contact.remove({name: req.params.contact_name}, function(err, contact) {
		if(err)
			res.send(err);
		else
			res.json({message: "Contact deleted successfully"});
	});
};

var exists_responce = false;
contactExists = function(arg_name) {
	exists_responce = false;

	Contact.find({name: arg_name}, function(err, contact) {
		if(contact.length){
			// console.log('contact already exists');
			exists_responce = true;
		}
		else{
			// console.log('contact does not exist');
			exists_responce = false;
		}
	});
	console.log(exists_responce);
	return exists_responce;
};