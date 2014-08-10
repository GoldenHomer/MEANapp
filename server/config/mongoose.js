var mongoose = require('mongoose');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Oh noe, connection error...'));
	db.once('open', function callback(){ // Log this message once
		console.log('Success! App db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			User.create({firstName: 'Josay', lastName:'Con', username:'jose'});
			User.create({firstName: 'Seymour', lastName:'Buts', username:'skinner'});
			User.create({firstName: 'Amanda', lastName:'Hugginkiss', username:'amanda'});
		}
	})
}