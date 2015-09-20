'use strict';

var bookshelf = require(appRoot + '/src/server/config/bookshelf');

var SourceType = bookshelf.Model.extend({
  tableName: 'source_type'
});

var Source = bookshelf.Model.extend({
  tableName: 'source',
  sourceType: function () {
    this.hasOne(SourceType);
  }
});

var Reading = bookshelf.Model.extend({
  tableName: 'reading',
  source: function () {
    this.belongsTo(Source);
  }
});

module.exports = {
  Reading: Reading,
  Source: Source,
  SourceType: SourceType
};

