/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary()
      table.timestamp('created_at')
      table.string('name')
      table.string('profile_image')
      table.boolean('previous_winner')
      table.boolean('is_deleted')
    })
    .then(() => {
      return knex.schema.alterTable('users', function (table) {
        table.index('name') // Index the name column
      })
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropIndex('name') // Drop the index from name
    })
    .then(() => {
      return knex.schema.dropTable('users')
    })
}
