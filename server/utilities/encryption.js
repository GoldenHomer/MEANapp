var crypto = require('crypto');

exports.createSalt = function(){
	return crypto.randomBytes(128).toString('base64');
}

exports.hashPw = function(salt, pw){
	var hmac = crypto.createHmac('sha1',salt) // sha1 os the algorithm in crypto
	return hmac.update(pw).digest('hex');
}