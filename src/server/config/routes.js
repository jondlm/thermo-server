'use strict';

var Joi = require('joi');
var models = require(appRoot + '/src/server/models');
var readingsController = require(appRoot + '/src/server/controllers/readings-controller');

// Export an array of routes
module.exports = [

  {
    path: '/',
    method: 'GET',
    handler: function (request, reply) {
      models.Source.fetchAll().then(function (sources) {
        reply(sources);
      });
    }
  }, {
    path: '/test',
    method: 'GET',
    handler: function (request, reply) {
      reply('it worked');
    },
    config: {
      validate: {
        query: {
          test: Joi.boolean().required()
        }
      }
    }
  },

  //
  // Readings routes
  // -----------------------------------
  {
    path: '/api/readings',
    method: 'POST',
    handler: readingsController.create,
    config: {
      auth: 'token', // see the src/server/lib/token-scheme.js file for details on how this works
      validate: {
        payload: {
          temperature: Joi.number().precision(2).required()
        }
      }
    }
  }, {
    path: '/api/readings',
    method: 'GET',
    handler: readingsController.list
  }


];
