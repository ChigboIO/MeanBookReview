var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: {type: String , unique: true, required: true, dropDups: true},
	phone: {type: String , unique: false, required: false, dropDups: false},
	email: {type: String , unique: false, required: false, dropDups: false}
});

mongoose.model('Contact', ContactSchema);