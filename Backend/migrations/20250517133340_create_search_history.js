exports.up = function(knex) {
  return knex.schema.createTable('search_history', function (table) {
    table.increments('id').primary();
    table.string('keyword').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('search_history');
};
