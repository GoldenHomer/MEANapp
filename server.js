// Server side appplication
var express = require('express'),
	mongoose = require('mongoose'), // Mongoose allows Mongo to easily be used in node apps.
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy; //Strategy is how passport will implement the auth. Local is because db is on my machine.
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // look for specific node environment. if not, fall back to development env

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
// Below is User being found and then passed to the post method in routes.js
passport.use(new LocalStrategy(
	function (username, password, done){
		User.findOne({username: username}).exec(function(err, user){
				if(user){
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

// http://passportjs.org/guide/configure/
// serial and deserial used to support login sessions.
require('./server/config/routes')(app);

// Tell app to listen for ports
app.listen(config.port);
console.log('Aww yeah, listening on port ' + config.port + '!');

