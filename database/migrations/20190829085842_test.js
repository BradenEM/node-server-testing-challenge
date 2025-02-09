exports.up = function(knex) {
  return knex.schema.createTable('test', tbl => {
    tbl.increments();
    tbl.string('name', 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('test');
};