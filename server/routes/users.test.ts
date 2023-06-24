import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

import server from '../server'
import * as users from '../db/users'

import mockUserData from './test/mock_data/users'

//-------
// SETUP
//-------

const usersUrl = '/api/v1/users'

// Mock functions
vi.mock('../db/users')
const mockUsers = vi.mocked(users)

beforeEach(() => {
  vi.resetAllMocks()
})

//----------------
// TEST FUNCTIONS
//----------------

describe('GET /users', () => {
  it('returns 3 users', async () => {
    mockUsers.getAllUsers.mockResolvedValue(mockUserData)
    expect.assertions(3)
    const res = await request(server).get(usersUrl)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[1].name).toBe('Gandalf')
  })

  it('handles errors', async () => {
    mockUsers.getAllUsers.mockRejectedValue(new Error('Server route error'))
    expect.assertions(1)
    const res = await request(server).get(usersUrl)
    expect(res.status).toBe(500)
  })
})

//-------
// Rocks
//-------

// vi.mock('../db/rocks', () => {
//   return {
// getAllRocks: vi.fn(),
// getOneRock: vi.fn(),
// addRock: vi.fn(),
// updateRock: vi.fn(),
// deleteRock: vi.fn(),
//   }
// })
// const mockRocks = vi.mocked(rocks)

//-------
// Votes
//-------

// vi.mock('../db/votes', () => {
//   return {
// getAllVotes: vi.fn(),
// getVotesByUser: vi.fn(),
// addVote: vi.fn(),
// updateVote: vi.fn(),
// deleteVote: vi.fn(),
//   }
// })
// const mockVotes = vi.mocked(votes)
