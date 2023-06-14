import connection from './connection'
import { UserModel } from '../../models/users'
import { RockModel } from '../../models/rocks'
import { VoteModel } from '../../models/votes'

const db = connection

export function getAllUsers() {
  return db('users').select('*')
}

export function getOneUser(id: number) {
  return db('users').select('*').where('id', id).first()
}

// addUser(userData: UserModel)
// updateUser(userData: UserModel, id: number)
// deleterUser(id: number)

// getAllRocks
// getOneRock(id: number)

// addRock(rockData: RockModel)
// updateRock(rockData: RockModel, id: number)
// deleterRock(id: number)

// castVote(vote: VoteModel)
