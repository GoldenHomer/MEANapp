var mongoose = require('mongoose');

module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Oh noe, connection error...'));
	db.once('open', function callback(){ // Log this message once
		console.log('Success! App db opened');
	});
}