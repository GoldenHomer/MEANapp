var express = require('express'),
	stylus = require('stylus'), // CSS preprocessor - it's great but needs getting use to like jade.
	logger = require('morgan'), // HTTP request logger middleware
	bodyParser = require('body-parser');


module.exports = function(app, config){

function compile(str, path){
	return stylus(str).set('filename', path);
}

app.set('views', config.rootPath + '/server/views');
app.set('view engine','jade'); // Jade is evil
app.use(logger('dev'));
app.use(stylus.middleware(

	{
		src: config.rootPath + '/public',
		compile: compile
	}
));

app.use(express.static(config.rootPath + '/public')); // static route handling

}