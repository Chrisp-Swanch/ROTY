import connection from './connection'
import { UserModel, NewUserModel } from '../../models/users'
import { RockModel } from '../../models/rocks'
import { VoteModel } from '../../models/votes'

const db = connection

// USERS

// Users - Read
export function getAllUsers() {
  return db('users').select('*')
}

export function getOneUser(id: number) {
  return db('users').select('*').where('id', id).first()
}

// Users - Add
export function addUser(userData: NewUserModel) {
  return db('users')
    .insert({
      ...userData,
      created_at: Number(new Date(Date.now())),
    })
    .returning('*')
}

// Users - Update
// export function updateUser(userData: UserModel, id: number) {
//   return db('users').update()
// }

// deleterUser(id: number)

// ROCKS

// getAllRocks
// getOneRock(id: number)

// addRock(rockData: RockModel)
// updateRock(rockData: RockModel, id: number)
// deleterRock(id: number)

// castVote(vote: VoteModel)
