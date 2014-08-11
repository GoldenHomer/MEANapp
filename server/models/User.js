var mongoose = require('mongoose'),
	encrypt = require('../utilities/encryption');	



var userSchema = mongoose.Schema({
		firstName: {type: String, required:'{PATH} is required.'},
		lastName: {type: String, required:'{PATH} is required.'},
		username: {
			type: String,
			required: '{PATH} is required.',
			unique: true
		},
		salt: {type: String, required:'{PATH} is required.'}, // randomly generated number
		hashed_pw: {type: String, required:'{PATH} is required.'},
		roles: [String]
	});

userSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPw(this.salt, passwordToMatch) === this.hashed_pw;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;
			salt = encrypt.createSalt();
			hash = encrypt.hashPw(salt, 'jose');
			User.create({firstName: 'Josay', lastName:'Con', username:'jose',salt: salt, hashed_pw: hash, roles: ['admin']}); // Of course I must be admin

			salt = encrypt.createSalt();
			hash = encrypt.hashPw(salt, 'seymour');
			User.create({firstName: 'Seymour', lastName:'Buts', username:'skinner',salt: salt, hashed_pw: hash, roles: []}); // Empty array for non-admin

			salt = encrypt.createSalt();
			hash = encrypt.hashPw(salt, 'amanda');
			User.create({firstName: 'Amanda', lastName:'Hugginkiss', username:'amanda',salt: salt, hashed_pw: hash}); // No role property declared but mongo will create one when I run nodemon server.
		}
	})
};

exports.createDefaultUsers = createDefaultUsers;