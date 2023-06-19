/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('rocks').del()
  await knex('rocks').insert([
    {
      id: 1,
      created_at: 1687147209343,
      owner_id: 1,
      name: 'Rock of Ages',
      description: 'A beautiful collection of sand-coloured stones',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktckLlDpbYJWcj60hZcubQVuxVjAMNfOJXNK0_Ewv_vU0O6S2ENGzeDAho2NHMvxIyp0&usqp=CAU',
      weight_division: 'Middleweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 2,
      created_at: 1687147209343,
      owner_id: 1,
      name: 'Rocky III',
      description: 'Wild-foraged greywacke with strong eye-contact',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtOVmKAMSRivthNb5sO8Y6ITVtGmMQhFlUA&usqp=CAU',
      weight_division: 'Lightweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 3,
      created_at: 1687147209343,
      owner_id: 2,
      name: 'Shiny Boi',
      description: 'A metallic rock found on a nearby asteroid',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgTQE7q6YB8o6TXGaR_STDfeQCA1Lk5_cAkQ&usqp=CAU',
      weight_division: 'Lightweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 4,
      created_at: 1687147209343,
      owner_id: 3,
      name: 'Rocky Balboa',
      description: 'Rose-tinted and rough, this rock is not to be messed with',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBcc4akME-gY_W73uKrTKJp9NYZorHH_1KQ&usqp=CAU',
      weight_division: 'Middleweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 5,
      created_at: 1687147209343,
      owner_id: 4,
      name: 'Primordial Ooze',
      description:
        "This rock is in liquid-form, a competition first. Look, but don't touch",
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEDW0e4pyaM4FZ1E_sRmmBZO0tYgKfT310A&usqp=CAU',
      weight_division: 'Super Heavyweight',
      disqualified: true,
      is_deleted: false,
    },
    {
      id: 6,
      created_at: 1687147209343,
      owner_id: 4,
      name: "Dragon's Egg",
      description:
        'Emanates a strange, and possibly dangerous sound. Staring for too long will give you a headache, handle with care',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJMllzCKzL4Ym7-ua86kAwsTlfkBPzdYDS3w&usqp=CAU',
      weight_division: 'Middleweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 7,
      created_at: 1687147209343,
      owner_id: 4,
      name: 'RoundBoi',
      description:
        'Unnaturally round, smooth, and visually enticing. This is a two-person lift, at least',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA3-YGCwtiFoJhzADeJaGo6YtumEYNI2lhDQ&usqp=CAU',
      weight_division: 'Heavyweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 8,
      created_at: 1687147209343,
      owner_id: 5,
      name: 'Circle of Life',
      description:
        'A lovely set of rocks. A perfect harmony of texture and colour',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIksYFUOOR6U9_tTSE2uIJbJ0qFhaR8rOv8dhWN9uuAhe38nTEcmWtrDjGf3c3iX87XtE&usqp=CAU',
      weight_division: 'Flyweight',
      disqualified: false,
      is_deleted: false,
    },
    {
      id: 9,
      created_at: 1687147209343,
      owner_id: 5,
      name: 'Ivar the Great and Terrible',
      description:
        'Bow before the might of Ivar, and tremble with fear. From humble beginnings, this rock rose to infamy and fortune through morally corrupt means',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTNbfLQsFztutiujRx8uBRel4vByNDvhiKA&usqp=CAU',
      weight_division: 'Lightweight',
      disqualified: false,
      is_deleted: false,
    },
  ])
}
