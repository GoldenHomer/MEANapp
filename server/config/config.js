var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 4000
		//find specified port number; if not, fall back to 4000
	},

	production: {
		db: 'mongodb://hosay:Snoogan9s@ds029787.mongolab.com:29787/xvision',
		rootPath: rootPath,
		port: process.env.PORT || 80 // same principle here 
	}
}