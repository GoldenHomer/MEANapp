// Server side appplication
var express = require('express'),
	mongoose = require('mongoose'); // Mongoose allows Mongo to easily be used in node apps.

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // look for specific node environment. if not, fall back to development env

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

// Tell app to listen for ports
app.listen(config.port);
console.log('Aww yeah, listening on port ' + config.port + '!');

