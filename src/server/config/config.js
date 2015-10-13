/*jshint node:true*/
'use strict';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	dev: {
		environment: 'dev',
		db: 'mongodb://localhost/play4Data',
		rootPath: rootPath,
		port: process.env.PORT || 8001,
		sessionSecret: '1a3sd3asd1a',
		sessionCookie: {
			// session expiration is set by default to 24 hours
			maxAge: 24 * (60 * 60 * 1000),
			// httpOnly flag makes sure the cookie is only accessed
			// through the HTTP protocol and not JS/browser
			httpOnly: true,
			// secure cookie should be turned to true to provide additional
			// layer of security so that the cookie is set only when working
			// in HTTPS mode.
			secure: false
		},
	},
	build: {
		environment: 'build',
		rootPath: rootPath,
		db: '',
		port: process.env.PORT || 80,
		sessionSecret: '1a3sd3asd1a',
		sessionCookie: {
			// session expiration is set by default to 24 hours
			maxAge: 24 * (60 * 60 * 1000),
			// httpOnly flag makes sure the cookie is only accessed
			// through the HTTP protocol and not JS/browser
			httpOnly: true,
			// secure cookie should be turned to true to provide additional
			// layer of security so that the cookie is set only when working
			// in HTTPS mode.
			secure: false
		},
	}

};