import connection from './connection'
import { UserModel, NewUserModel, UpdateUserModel } from '../../models/users'
import { RockModel } from '../../models/rocks'
import { VoteModel } from '../../models/votes'

const db = connection

// USERS

// Users - Create
export function addUser(userData: NewUserModel) {
  return db('users')
    .insert({
      ...userData,
      created_at: Number(new Date(Date.now())),
    })
    .returning('*')
}

// Users - Read
export function getAllUsers() {
  return db('users').select('*')
}

export function getOneUser(id: number) {
  return db('users').select('*').where({ id }).first()
}

// Users - Update
export function updateUser(updateData: UpdateUserModel, id: number) {
  const { name, profile_image, previous_winner, is_deleted } = updateData
  return db('users')
    .select()
    .where({ id })
    .first()
    .update({
      name,
      profile_image,
      previous_winner,
      is_deleted,
    })
    .returning('*')
}

// Users - Delete
export function deleterUser(id: number) {
  return db('users').delete().where({ id })
}

// ROCKS

// getAllRocks
// getOneRock(id: number)

// addRock(rockData: RockModel)
// updateRock(rockData: RockModel, id: number)
// deleterRock(id: number)

// castVote(vote: VoteModel)
