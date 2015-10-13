
'use strict';
var express = require('express'),
	four0four = require('./404.js')(),
	compress = require('compression'),
	passport = require('passport'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	multer = require('multer'),
	favicon = require('serve-favicon'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	helmet = require('helmet'),
	flash = require('connect-flash'),
	consolidate = require('consolidate'),
	path = require('path');


module.exports = function (app, config) {

	/**
	* Initialize local variables
	*/
    app.locals.title = 'play4';
    app.locals.description = 'play4 description';
	//todo config SSL
	app.locals.keywords = 'play4 keywords';
	app.locals.googleAnalyticsTrackingID = 'config.app.googleAnalyticsTrackingID';
	app.locals.facebookAppId = 'config.facebook.clientID';
	//app.locals.jsFiles = config.files.client.js;
	//app.locals.cssFiles = config.files.client.css;
	app.locals.logo = 'config.logo';
	app.locals.favicon = './src/server/favicon.ico';

	/**
	* Initialize application middleware
	*/
	// Showing stack errors
	app.set('showStackError', true);
	// Enable jsonp
	app.enable('jsonp callback');
	// Should be placed before express.static
	app.use(compress({
		filter: function (req, res) {
			return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));
	// Initialize favicon middleware
	app.use(favicon('./src/server/favicon.ico'));
	// Environment dependent middleware
	if (config.environment === 'dev') {
		// Enable logger (morgan)
		app.use(logger('dev'));
		// Disable views cache
		app.set('view cache', false);
	} else if (config.environment === 'build') {
		app.locals.cache = 'memory';
	}
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	// Add the cookie parser and flash middleware
	app.use(cookieParser());
	app.use(flash());
	// Add multipart handling middleware
	app.use(multer({
		dest: './uploads/',
		inMemory: true
	}).array('multiInputFileName'));

	/**
	* Configure Express session
	*/







	//dependent middleware
	//body parsing middleware should be above methodOverride
	//Configure view engine
	//Configure Express session
	//Invoke modules server configuration
	//Configure Helmet headers configuration
	//Configure the modules static routes
	//Configure the modules ACL policies
	//Configure the modules server routes
	//Configure error handling
	//Configure Socket.io

	app.use(session({ secret: 'multi vision unicorns' }));
	app.use(passport.initialize());
    app.use(passport.session());



	app.use('/api', require('./routes'));
	switch (config.environment) {
		case 'build':
			console.log('** BUILD **');
			app.use(express.static('./build/'));
			// Any invalid calls for templateUrls are under app/* and should return 404
			app.use('/app/*', function (req, res, next) {
				four0four.send404(req, res);
			});
			// Any deep link calls should return index.html
			app.use('/*', express.static('./build/index.html'));
			break;

		default:
			console.log('** DEV **');
			app.use(express.static('./src/client/'));
			app.use(express.static('./'));
			app.use(express.static('./tmp'));
			// Any invalid calls for templateUrls are under app/* and should return 404
			app.use('/app/*', function (req, res, next) {
				four0four.send404(req, res);
			});
			// Any deep link calls should return index.html
			app.use('/*', express.static('./src/client/index.html'));
			break;

	}

};