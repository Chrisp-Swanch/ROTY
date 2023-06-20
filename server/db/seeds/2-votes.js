/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('votes').del()
  await knex('votes').insert([
    {
      id: 1,
      created_at: 1687147209343,
      user_id: 1,
      rock_id: 1,
      preference: 1,
      is_deleted: 0,
    },
    {
      id: 2,
      created_at: 1687147209343,
      user_id: 1,
      rock_id: 3,
      preference: 2,
      is_deleted: 0,
    },
    {
      id: 3,
      created_at: 1687147209343,
      user_id: 1,
      rock_id: 5,
      preference: 3,
      is_deleted: 0,
    },
    {
      id: 4,
      created_at: 1687147209343,
      user_id: 2,
      rock_id: 6,
      preference: 1,
      is_deleted: 0,
    },
    {
      id: 5,
      created_at: 1687147209343,
      user_id: 2,
      rock_id: 5,
      preference: 2,
      is_deleted: 0,
    },
    {
      id: 6,
      created_at: 1687147209343,
      user_id: 2,
      rock_id: 1,
      preference: 3,
      is_deleted: 0,
    },
    {
      id: 7,
      created_at: 1687147209343,
      user_id: 3,
      rock_id: 9,
      preference: 1,
      is_deleted: 0,
    },
    {
      id: 8,
      created_at: 1687147209343,
      user_id: 3,
      rock_id: 7,
      preference: 2,
      is_deleted: 0,
    },
    {
      id: 9,
      created_at: 1687147209343,
      user_id: 3,
      rock_id: 5,
      preference: 3,
      is_deleted: 0,
    },
    {
      id: 10,
      created_at: 1687147209343,
      user_id: 4,
      rock_id: 3,
      preference: 1,
      is_deleted: 0,
    },
    {
      id: 11,
      created_at: 1687147209343,
      user_id: 4,
      rock_id: 8,
      preference: 2,
      is_deleted: 0,
    },
    {
      id: 12,
      created_at: 1687147209343,
      user_id: 5,
      rock_id: 3,
      preference: 1,
      is_deleted: 0,
    },
  ])
}
