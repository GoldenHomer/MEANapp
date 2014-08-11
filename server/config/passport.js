var passport = require('passport'),
	mongoose = require('mongoose'), // Mongoose allows Mongo to easily be used in node apps.
	LocalStrategy = require('passport-local').Strategy, //Strategy is how passport will implement the auth. Local is because db is on my machine.
	User = mongoose.model('User');

module.exports = function(){
	// Below is User being found and then passed to the post method in routes.js
	passport.use(new LocalStrategy(
		function (username, password, done){
			User.findOne({username: username}).exec(function(err, user){
					if(user && user.authenticate(password)){
						return done(null, user)
					}
					else{
						return done(null, false);
					}
				}
			);
		}
	));

	passport.serializeUser(function(user, done){
		if(user){
			done(null, user._id);
		}
	});

	passport.deserializeUser(function(id, done){
		User.findOne({_id: id}).exec(function(err, user){
			if(user){
				return done(null, user)
			}
			else{
				return done(null, false);
			}
		})
	});
}