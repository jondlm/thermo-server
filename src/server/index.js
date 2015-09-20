'use strict';

//
// Dependencies
// -------------------------------------
var Hapi = require('hapi');
var routes = require(appRoot + '/src/server/config/routes');
var settings = require(appRoot + '/src/server/config/settings');

// Spin up the server
var server = new Hapi.Server();

// Apply connection settings to the server
server.connection({
	port: settings.get('port')
});

//
// Register packs (aka plugins)
// -------------------------------------
var packs = [];

server.register(packs, function(err) {
	if (err) {
		console.log(err);
	}

	//
	// Register routes
	// -------------------------------------
	server.route(routes);

	//
	// Start server
	// -------------------------------------
	server.start(function() {
		console.log('Server started at ' + server.info.uri);
	});
});


// Export the server for testing
module.exports = server;

