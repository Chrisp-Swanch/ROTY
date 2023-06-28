"use strict";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('votes', function (table) {
        table.increments('id').primary();
        table.timestamp('created_at').defaultTo(Date.now());
        table.integer('user_id');
        table.integer('rock_id');
        table.integer('preference');
        table.boolean('is_deleted').defaultTo(false);
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('votes');
};
