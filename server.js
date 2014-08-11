// Server side appplication
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // look for specific node environment. if not, fall back to development env

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();

// http://passportjs.org/guide/configure/
// serial and deserial used to support login sessions.
require('./server/config/routes')(app);

// Tell app to listen for ports
app.listen(config.port);
console.log('Aww yeah, listening on port ' + config.port + '!');

