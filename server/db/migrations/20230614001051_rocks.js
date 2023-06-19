/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('rocks', function (table) {
      table.increments('id').primary()
      table.timestamp('created_at').defaultTo(Date.now())
      table.integer('owner_id')
      table.string('name')
      table.string('description')
      table.string('image').defaultTo(null)
      table.string('weight_division')
      table.boolean('disqualified')
      table.boolean('is_deleted').defaultTo(false)
    })
    .then(() => {
      return knex.schema.alterTable('rocks', function (table) {
        table.index('name')
      })
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('rocks', (table) => {
      table.dropIndex('name')
    })
    .then(() => {
      return knex.schema.dropTable('rocks')
    })
}
