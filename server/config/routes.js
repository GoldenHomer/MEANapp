var auth = require('./auth'),
	users = require('../controllers/users'),
	courses = require('../controllers/courses'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function(app){

	app.get('/api/users', auth.requiresApiLogin, users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.get('/api/courses', courses.getCourses);

	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]); // Render whatever is requested with asterick
	});

	app.post('/login', auth.authenticate);
	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

	app.get('/api/*', function(req, res){// Send a 404 for all types of reqs if API URL does not exist
		res.send(404)
	})
	
	app.get('*', function (req, res) {
		// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
}