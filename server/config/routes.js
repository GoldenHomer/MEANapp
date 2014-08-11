var auth = require('./auth');

module.exports = function(app){
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]); // Render whatever is requested with asterick
	});

	app.post('/login', auth.authenticate);
	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});
	
	app.get('*', function (req, res) {
		// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
}