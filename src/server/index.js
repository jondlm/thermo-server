'use strict';

//
// Dependencies
// -------------------------------------
var Hapi = require('hapi');
var routes = require(appRoot + '/src/server/config/routes');
var settings = require(appRoot + '/src/server/config/settings');
var tokenScheme = require(appRoot + '/src/server/lib/token-scheme');

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
  // Register authentication
  // -------------------------------------

  // Make the 'token' scheme available
  server.auth.scheme('token', tokenScheme);

  // This allows you to attach the "auth: 'token'" property to routes to have
  // them authenticated
  server.auth.strategy('token', 'token');

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

