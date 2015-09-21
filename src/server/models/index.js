/*eslint no-use-before-define:0 */
'use strict';

var bookshelf = require(appRoot + '/src/server/config/bookshelf');

var SourceType = bookshelf.Model.extend({
  tableName: 'source_type',
  hasTimestamps: true,
  sources: function() {
    return this.hasMany(Source);
  }
});

var Source = bookshelf.Model.extend({
  tableName: 'source',
  hasTimestamps: true,
  source_type: function() {
    return this.belongsTo(SourceType);
  },
  readings: function() {
    return this.hasMany(Reading);
  }
});

var Reading = bookshelf.Model.extend({
  tableName: 'reading',
  hasTimestamps: true,
  source: function() {
    return this.belongsTo(Source);
  }
});

module.exports = {
  Reading: Reading,
  Source: Source,
  SourceType: SourceType
};

