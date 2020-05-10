exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary(),
    table.string('name', 60).notNullable(),
    table.string('email', 120).notNullable(),
    table.string('whatsapp', 15).notNullable(),
    table.string('city', 60).notNullable(),
    table.string('uf', 2).notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
}