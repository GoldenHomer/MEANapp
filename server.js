// Server side appplication

var express = require('express'),
	stylus = require('stylus'), // CSS preprocessor - it's great but needs getting use to like jade.
	logger = require('morgan'), // HTTP request logger middleware
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
	// Mongoose allows Mongo to easily be used in node apps.

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // look for specific node environment. if not, fall back to development env

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

env == 'development' ? mongoose.connect('mongodb://localhost/multivision') : mongoose.connect('mongodb://hosay:Snoogan9s@ds029787.mongolab.com:29787/xvision');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Oh noe, connection error...'));
db.once('open', function callback(){ // Log this message once
	console.log('Success! App db opened');
});

app.get('/partials/*', function(req, res) {
	res.render('../../public/app/' + req.params[0]); // params[0] is what will match up with in the asterisk
});

app.get('*', function (req, res) {
	// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
	res.render('index');
});

// Tell app to listen for ports
var port = process.env.PORT || 4000; //find specified port number; if not, fall back to 4000
app.listen(port);
console.log('Aww yeah, listening on port ' + port + '!');

