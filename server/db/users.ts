import connection from './connection'
import * as UserModels from '../../models/interfaces/users'

const db = connection

// USERS

// Users - Create
export function addUser(
  userData: UserModels.New
): Promise<UserModels.UserSnakeCase[]> {
  return db('users').insert(userData).returning(['*'])
}

// Users - Read
export function getAllUsers(): Promise<UserModels.UserSnakeCase[]> {
  return db('users').select('*')
}

export function getOneUser(id: number): Promise<UserModels.UserSnakeCase> {
  return db('users').select('*').where({ id }).first()
}

// Users - Update
export function updateUser(
  updateData: UserModels.Update,
  id: number
): Promise<UserModels.UserSnakeCase[]> {
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
export function deleteUser(id: number): Promise<number> {
  return db('users').delete().where({ id })
}
