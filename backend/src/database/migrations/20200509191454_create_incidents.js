exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.uuid('id').primary(),
    table.string('title', 60).notNullable(),
    table.string('description', 200).notNullable(),
    table.decimal('value', 8, 2).notNullable(),

    table.string('ong_id').notNullable(),

    table.foreign('ong_id').references('id').inTable('ongs')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
}