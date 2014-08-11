var mongoose = require('mongoose'),
	crypto = require('crypto');

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
		username: String,
		salt: String, // randomly generated number
		hashed_pw: String,
		roles: [String]
	});
	userSchema.methods = {
		authenticate: function(passwordToMatch){
			return hashPw(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}
	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection){
		if(collection.length === 0){
			var salt, hash;
			salt = createSalt();
			hash = hashPw(salt, 'jose');
			User.create({firstName: 'Josay', lastName:'Con', username:'jose',salt: salt, hashed_pw: hash, roles: ['admin']}); // Of course I must be admin

			salt = createSalt();
			hash = hashPw(salt, 'seymour');
			User.create({firstName: 'Seymour', lastName:'Buts', username:'skinner',salt: salt, hashed_pw: hash, roles: []}); // Empty array for non-admin

			salt = createSalt();
			hash = hashPw(salt, 'amanda');
			User.create({firstName: 'Amanda', lastName:'Hugginkiss', username:'amanda',salt: salt, hashed_pw: hash}); // No role property declared but mongo will create one when I run nodemon server.
		}
	})
}

function createSalt(){
	return crypto.randomBytes(128).toString('base64');
}

function hashPw(salt, pw){
	var hmac = crypto.createHmac('sha1',salt) // sha1 os the algorithm in crypto
	return hmac.update(pw).digest('hex');
}