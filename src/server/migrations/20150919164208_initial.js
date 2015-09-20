/*eslint camelcase:0 strict:0*/

exports.up = function(knex) {
  return knex.schema.createTable('source_type', function (table) {
    table.increments().primary();
    table.string('name').notNull();
    table.timestamps();
  }).then(function () {
    return knex('source_type').insert([
      { name: 'Local', created_at: new Date() },
      { name: 'External', created_at: new Date() }
    ]);
  }).then(function () {
    return knex.schema.createTable('source', function (table) {
      table.increments().primary();
      table.string('name').notNull();
      table.integer('source_type_id')
        .references('id')
        .inTable('source_type')
        .notNull();
      table.string('api_key').notNull();
      table.timestamps();
    });
  }).then(function () {
    return knex('source').insert([
      { created_at: new Date(), name: 'Living Room', source_type_id: 1, api_key: '72f18b5f6f63b572e58c48d19c957b51'},
      { created_at: new Date(), name: 'Bedroom', source_type_id: 1, api_key: '72f18b5f6f63b572e58c48d19c957b52'},
      { created_at: new Date(), name: 'Lake Oswego', source_type_id: 2, api_key: '72f18b5f6f63b572e58c48d19c957b53'}
    ]);
  }).then(function () {
    return knex.schema.createTable('reading', function (table) {
      table.bigIncrements().primary();
      table.decimal('temperature', 5, 2).notNull();
      table.integer('source_id')
        .references('id')
        .inTable('source')
        .notNull();
      table.timestamps();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reading').then(function() {
    return knex.schema.dropTable('source');
  }).then(function () {
    return knex.schema.dropTable('source_type');
  });
};
