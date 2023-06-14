import connection from './connection'
import { NewUserModel, UpdateUserModel } from '../../models/users'

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
