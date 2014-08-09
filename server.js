// Server side appplication

var express = require('express'),
	stylus = require('stylus'), // CSS preprocessor - it's great but needs getting use to like jade.
	logger = require('morgan'), // HTTP request logger middleware
	bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine','jade'); // Jade is evil
app.use(logger('dev'));
app.use(stylus.middleware(

	{
		src: __dirname + '/public',
		compile: compile
	}
));

app.use(express.static(__dirname + '/public')); // static route handling

app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});
app.get('*', function (req, res) {
	// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
	res.render('index');
})

// Tell app to listen for ports
var port = 4000;
app.listen(port);
console.log('Aww yeah, listening on port ' + port + '!');

