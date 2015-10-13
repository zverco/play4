/*jshint node:true*/
'use strict';
var express = require('express');
var environment = process.env.NODE_ENV || 'dev';
var port = process.env.PORT || 8001;
var app = express();

var config = require('./config/config')[environment];

var mongoose =  require('./config/mongoose')(config);

require('./config/express')(app, config);

require('./config/passport')();

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.listen(port, function() {
	console.log('Express server listening on port ' + port);
	console.log('env = ' + app.get('env') +
		'\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});
