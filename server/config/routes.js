var mongoose = require('mongoose');

module.exports = function(app){
	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]); // params[0] is what will match up with in the asterisk
	});

	app.get('*', function (req, res) {
		// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
		res.render('index');
	});
}