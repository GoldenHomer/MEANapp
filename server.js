// Server side appplication

var express = require('express'),
	stylus = require('stylus'), // CSS preprocessor - it's great but needs getting use to like jade.
	logger = require('morgan'), // HTTP request logger middleware
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');
	// Mongoose allows Mongo to easily be used in node apps.

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

mongoose.connect('mongodb://localhost/multivision');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Oh noe, connection error...'));
db.once('open', function callback(){ // Log this message once
	console.log('Success! App db opened');
});

var messageSchema = mongoose.Schema({message: String}); // Set up message scheme in Mongoose
var Message = mongoose.model('Message', messageSchema); // Create a model based on the schema (similar to how Angular does it)
var mongoMessage;

Message.findOne().exec(function(err, messageDoc){
	mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
	res.render('partials/' + req.params.partialPath);
});
app.get('*', function (req, res) {
	// * will match all routes (any req that gets to this point will be handled; JS CSS and image requests)
	res.render('index', {
		mongoMessage: mongoMessage // Give mongodb mongoMessage to variable to be used in jade file to display to view. 
	});
})

// Tell app to listen for ports
var port = 4000;
app.listen(port);
console.log('Aww yeah, listening on port ' + port + '!');

