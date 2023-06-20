/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, created_at: 1687147209343, user_id: 1, rock_id: 0, preference: 1},
    {id: 2, created_at: 1687147209343, user_id: 1, rock_id: 0, preference: 2},
    {id: 3, created_at: 1687147209343, user_id: 1, rock_id: 0, preference: 3},
    {id: 4, created_at: 1687147209343, user_id: 2, rock_id: 0, preference: 1},
    {id: 5, created_at: 1687147209343, user_id: 2, rock_id: 0, preference: 2},
    {id: 6, created_at: 1687147209343, user_id: 3, rock_id: 0, preference: 1},
    {id: 7, created_at: 1687147209343, user_id: 3, rock_id: 0, preference: 2},
    {id: 8, created_at: 1687147209343, user_id: 4, rock_id: 0, preference: 1},
    {id: 9, created_at: 1687147209343, user_id: 5, rock_id: 0, preference: 1}
  ]);
};
