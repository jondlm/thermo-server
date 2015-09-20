'use strict';

var Joi = require('joi');
var models = require(appRoot + '/src/server/models');

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
  }

];
