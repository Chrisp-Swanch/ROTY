import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import connection from './connection'
import * as users from './users'
import * as rocks from './rocks'

//-------
// SETUP
//-------

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.migrate.rollback()
  await connection.destroy()
})

//----------------
// TEST FUNCTIONS
//----------------

describe('Test environment working', () => {
  it('Can be sent things', () => {
    expect.assertions(4)
    expect(true).toBeTruthy()
    expect(1 + 1).toBe(2)
    expect('this is a string').toBeTypeOf('string')
    expect([1, 2, 3]).toHaveLength(3)
  })
})

describe('Users Db functions', () => {
  // GET all users
  it('Retrieves all users in array', async () => {
    expect.assertions(2)
    const result = await users.getAllUsers()

    expect(result).toHaveLength(5)
    expect(result[1]).toStrictEqual({
      id: 2,
      created_at: 1687147209343,
      name: 'Bilbo Baggins',
      profile_image:
        'https://www.hollywoodreporter.com/wp-content/uploads/2012/12/hobbit_an_unexpected_journey_8_a_h.jpg?w=2000&h=1126&crop=1',
      previous_winner: 0,
      is_deleted: 0,
    })
  })

  // GET one user by id
  it('Retrieves one user (as single object) when given id param', async () => {
    expect.assertions(1)
    const result = await users.getOneUser(3)

    expect(result).toStrictEqual({
      id: 3,
      created_at: 1687147209343,
      name: 'Queen Elizabeth II',
      profile_image:
        'https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_645/d8292ed8ae1d759c999a394b98d611a8.jpg',
      previous_winner: 0,
      is_deleted: 0,
    })
  })

  it('Adds a user and returns new user in array', async () => {
    expect.assertions(2)

    const newUser = {
      name: 'Squidward Tentacles',
      profile_image: null,
      previous_winner: true,
    }

    const result = await users.addUser(newUser)
    expect(result).toHaveLength(1)
    expect(result[0]).toStrictEqual({
      id: 6,
      created_at: result[0].created_at,
      name: 'Squidward Tentacles',
      profile_image: null,
      previous_winner: 1,
      is_deleted: 0,
    })
  })
})
