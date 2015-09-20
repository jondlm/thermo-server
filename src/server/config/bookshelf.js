'use strict';

var settings = require(appRoot + '/src/server/config/settings');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.get('postgres:host'),
    user: settings.get('postgres:user'),
    password: settings.get('postgres:password'),
    database: settings.get('postgres:database'),
    charset: 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

