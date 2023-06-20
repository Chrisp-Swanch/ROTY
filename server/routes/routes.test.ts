import '@testing-library/jest-dom'
// import * as request from 'supertest'

// import server from '../server'

import * as users from '../db/users'
// import * as rocks from '../db/rocks'
// import * as votes from '../db/votes'

import * as UserModels from '../../models/interfaces/users'
// import * as RockModels from '../../models/interfaces/rocks'
// import * as VoteModels from '../../models/interfaces/votes'
// import { HttpProxy } from 'vite'

//-------
// SETUP
//-------

// Mock functions

// Users
jest.mock('../db/users', () => {
  return {
    getAllUsers: jest.fn(),
    // getOneUser
    // addUser
    // updateUser
    // deleteUser
  }
})
const mockUsers = jest.mocked(users)

// Mock data

// Users
const fakeUserData: UserModels.UserSnakeCase[] = [
  {
    id: 1,
    created_at: 1687147209343,
    name: 'Bilbo Baggins',
    profile_image: 'image/path',
    previous_winner: false,
    is_deleted: false,
  },
  {
    id: 2,
    created_at: 1687147209343,
    name: 'Gandalf',
    profile_image: 'image/path',
    previous_winner: true,
    is_deleted: false,
  },
  {
    id: 3,
    created_at: 1687147209343,
    name: 'Saruman',
    profile_image: 'image/path',
    previous_winner: false,
    is_deleted: true,
  },
]

//----------------
// TEST FUNCTIONS
//----------------

describe('GET /users', () => {
  it.todo('returns 3 users', () => {
    mockUsers.getAllUsers.mockImplementation(() => {
      return Promise.resolve(fakeUserData)
    })
  })

  it.todo('handles errors', () => {
    // const err = new Error()
    // err.code= 500

    mockUsers.getAllUsers.mockImplementation(() => {
      return Promise.reject(new Error('Internal Server Error'))
    })
  })
})

//-------
// Rocks
//-------

// jest.mock('../db/rocks', () => {
//   return {
// getAllRocks
// getOneRock
// addRock
// updateRock
// deleteRock
//   }
// })
// const mockRocks = jest.mocked(rocks)

//-------
// Votes
//-------

// jest.mock('../db/votes', () => {
//   return {
// getAllVotes
// getVotesByUser
// addVote
// updateVote
// deleteVote
//   }
// })
// const mockVotes = jest.mocked(votes)
