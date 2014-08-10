var mongoose = require('mongoose');

module.exports = function(app){
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]); // params[0] is what will match up with in the asterisk
	});

	app.post('/login', function(req, res, next){
		var auth = passport.authenticate('local',function(err, user){
			if(err){return next(err);}
			if(!user){res.send({success:false})}
			req.logIn(user, function(err){ // IF user was found, run this
				if(err){return next(err);}
				res.send({success:true, user: user});
			})
		})
		auth(req, res, next); // Variable auth created a function, so for the post to work, must call auth
	})
	app.get('*', function (req, res) {
		// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
		res.render('index');
	});
}