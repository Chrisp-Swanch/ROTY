import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import connection from './connection'
import * as users from './users'
import * as rocks from './rocks'
import * as votes from './votes'

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

//---------
// General
//---------

describe('Test environment working', () => {
  // Test environment
  it('Can be sent things', () => {
    expect.assertions(4)
    expect(true).toBeTruthy()
    expect(1 + 1).toBe(2)
    expect('this is a string').toBeTypeOf('string')
    expect([1, 2, 3]).toHaveLength(3)
  })
})

//-------
// Users
//-------

describe('Users Db functions', () => {
  // GET all users
  it('Retrieves all users as array', async () => {
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

  // POST new user
  it('Adds a user and returns new user in array', async () => {
    expect.assertions(3)

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

    const newUsers = await users.getAllUsers()
    expect(newUsers).toHaveLength(6)
  })

  it('Updates a user and returns updated user in array', async () => {
    expect.assertions(1)

    const updateData = {
      name: 'New Name',
      profile_image: 'new image path',
      previous_winner: true,
      is_deleted: true,
    }

    const result = await users.updateUser(updateData, 3)
    expect(result[0]).toStrictEqual({
      id: 3,
      created_at: 1687147209343,
      name: 'New Name',
      profile_image: 'new image path',
      previous_winner: 1,
      is_deleted: 1,
    })
  })

  it('Deletes a user', async () => {
    expect.assertions(1)

    users.deleteUser(2)
    const result = await users.getAllUsers()
    expect(result).toHaveLength(5)
  })
})

//-------
// Rocks
//-------

describe('Rocks Db functions', () => {
  // GET all rocks
  it('Retrieves all rocks as array', async () => {
    expect.assertions(2)
    const result = await rocks.getAllRocks()

    expect(result).toHaveLength(9)
    expect(result[0]).toStrictEqual({
      id: 1,
      created_at: 1687147209343,
      owner_id: 1,
      name: 'Rock of Ages',
      description: 'A beautiful collection of sand-coloured stones',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktckLlDpbYJWcj60hZcubQVuxVjAMNfOJXNK0_Ewv_vU0O6S2ENGzeDAho2NHMvxIyp0&usqp=CAU',
      weight_division: 'Middleweight',
      disqualified: 0,
      is_deleted: 0,
    })
  })

  // GET one rock by id
  it('Retrieves one rock (as single object) when given id param', async () => {
    expect.assertions(1)
    const result = await rocks.getOneRock(2)

    expect(result).toStrictEqual({
      id: 2,
      created_at: 1687147209343,
      owner_id: 1,
      name: 'Rocky III',
      description: 'Wild-foraged greywacke with strong eye-contact',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtOVmKAMSRivthNb5sO8Y6ITVtGmMQhFlUA&usqp=CAU',
      weight_division: 'Lightweight',
      disqualified: 0,
      is_deleted: 0,
    })
  })

  // POST new user
  it('Adds a rock and returns new rock in array', async () => {
    expect.assertions(3)

    const newRock = {
      owner_id: 1,
      name: 'Rocky McRockface',
      weight_division: 'Heavyweight',
      description: null,
    }

    const result = await rocks.addRock(newRock)
    expect(result).toHaveLength(1)
    expect(result[0]).toStrictEqual({
      id: 10,
      created_at: result[0].created_at,
      owner_id: 1,
      name: 'Rocky McRockface',
      description: null,
      image: null,
      weight_division: 'Heavyweight',
      disqualified: 0,
      is_deleted: 0,
    })

    const newRocks = await rocks.getAllRocks()
    expect(newRocks).toHaveLength(10)
  })

  it('Updates a rock and returns updated rock in array', async () => {
    expect.assertions(1)

    const updateData = {
      name: 'New Rock Name',
      description: 'Newest rock in town',
      image: 'some image path',
      weight_division: 'Lightweight',
      disqualified: true,
      is_deleted: true,
    }

    const result = await rocks.updateRock(updateData, 4)
    expect(result[0]).toStrictEqual({
      id: 4,
      created_at: 1687147209343,
      owner_id: 3,
      name: 'New Rock Name',
      description: 'Newest rock in town',
      image: 'some image path',
      weight_division: 'Lightweight',
      disqualified: 1,
      is_deleted: 1,
    })
  })

  it('Deletes a rock', async () => {
    expect.assertions(1)

    rocks.deleteRock(2)
    const result = await rocks.getAllRocks()
    expect(result).toHaveLength(9)
  })
})

//-------
// Votes
//-------

describe('Votes Db functions', () => {
  // GET all votes
  it('Retrieves all votes as array', async () => {
    expect.assertions(2)
    const result = await votes.getAllVotes()

    expect(result).toHaveLength(12)
    expect(result[6]).toStrictEqual({
      id: 7,
      created_at: 1687147209343,
      user_id: 3,
      rock_id: 9,
      preference: 1,
      is_deleted: 0,
    })
  })

  // GET votes by user_id
  it('Retrieves votes made by given user', async () => {
    expect.assertions(2)
    const result = await votes.getVotesByUser(2)

    expect(result).toHaveLength(3)
    expect(result[1]).toStrictEqual({
      id: 5,
      created_at: 1687147209343,
      user_id: 2,
      rock_id: 5,
      preference: 2,
      is_deleted: 0,
    })
  })

  // POST new vote
  it('Adds a vote and returns new vote in array', async () => {
    expect.assertions(3)

    const newVote = {
      user_id: 5,
      rock_id: 6,
      preference: 2,
    }

    const result = await votes.addVote(newVote)
    expect(result).toHaveLength(1)
    expect(result[0]).toStrictEqual({
      id: 13,
      created_at: result[0].created_at,
      user_id: 5,
      rock_id: 6,
      preference: 2,
      is_deleted: 0,
    })

    const newVotes = await votes.getAllVotes()
    expect(newVotes).toHaveLength(13)
  })

  it('Updates a vote and returns updated vote in array', async () => {
    expect.assertions(1)

    const updateData = {
      rock_id: 3,
      preference: 1,
      is_deleted: true,
    }

    const result = await votes.updateVote(updateData, 11)
    expect(result[0]).toStrictEqual({
      id: 11,
      created_at: 1687147209343,
      user_id: 4,
      rock_id: 3,
      preference: 1,
      is_deleted: 1,
    })
  })

  it('Deletes a vote', async () => {
    expect.assertions(1)

    votes.deleteVote(5)
    const result = await votes.getAllVotes()
    expect(result).toHaveLength(12)
  })
})
