/*eslint camelcase:0 */

'use strict';

var models = require(appRoot + '/src/server/models');
var Boom = require('boom');

module.exports = {
  list: function(request, reply) {
    new models.Reading()
      .fetchAll({withRelated: ['source', 'source.sourceType']})
      .then(reply, function(err) {
        reply(Boom.badImplementation(err));
      });
  },

  create: function(request, reply) {
    var temperature = request.payload.temperature;
    var newReading = {
      temperature: temperature,
      source_id: 1
    };

    new models.Reading(newReading)
      .save()
      .then(function(reading) {
        reply(reading).code(201);
      }, function(err) {
        reply(Boom.badImplementation(err));
      });
  }
};
