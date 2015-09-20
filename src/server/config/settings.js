'use strict';

var nconf = require('nconf');

var defaults = {
  port: 3000,
  postgres: {
    host: '192.168.59.103',
    user: 'postgres',
    password: 'da87bzZd',
    database: 'thermo'
  }
};

nconf.defaults(defaults);

module.exports = nconf;

