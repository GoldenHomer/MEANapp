var passport = require('passport');

exports.authenticate = function(req, res, next){
	var auth = passport.authenticate('local',function(err, user){
		if(err){return next(err);}
		if(!user){res.send({success:false})}
		req.logIn(user, function(err){ // IF user was found, run this
			if(err){return next(err);}
			res.send({success:true, user: user});
		})
	})
	auth(req, res, next); // Variable auth created a function, so for the post to work, must call auth
};

exports.requiresApiLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		res.status(403);
		res.end();
	}
	else{
		next(); //if user authenticated, go to next function (let user see JSON)
	}
};

exports.requireRole = function(role){
	return function(req, res, next){
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
			res.status(403);
			res.end();
		}
		else{
			next();
		}
	}
}