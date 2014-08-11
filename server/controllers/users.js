var User = require('mongoose').model('User'),
	encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase(); // Prevent case-sensitive username
	userData.salt = encrypt.createSalt();
	userData.hashed_pw = encrypt.hashPw(userData.salt, userData.password);
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf('E11000') > -1){ // E11000 is error code in Mongo for duplicate.
				err = new Error('Duplicate Username');
			} // E11000
			res.status(400);
			return res.send({reason: err.toString()})
		}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send(user);
		});
	});
}