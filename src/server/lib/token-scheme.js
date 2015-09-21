/*eslint camelcase:0 */

'use strict';

var Boom = require('boom');
var models = require(appRoot + '/src/server/models');

module.exports = function(/* server, options */) {
  return {
    authenticate: function(request, reply) {
      var token = request.headers.token;

      // Drop out early if they are missing the correct token header
      if (!token) {
        return reply(Boom.unauthorized('Missing required "token" header', 'token'));
      }

      // Search the database for their token
      new models.Source()
        .where({ api_key: token })
        .fetch()
        .then(function(source) {
          if (!source) {
            return reply(Boom.unauthorized('Invalid token', 'token'));
          }

          return reply.continue({ credentials: { source: source }});
        });
    }
  };
};

