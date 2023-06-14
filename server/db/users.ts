import connection from './connection'
import type { UserModel, NewUserModel, UpdateUserModel } from '../../models/users'

const db = connection

// USERS

// Users - Create
export function addUser(userData: NewUserModel): Promise<UserModel[]> {
  return db('users')
    .insert({
      ...userData,
      created_at: Number(new Date(Date.now())),
    })
    .returning('*')
}

// Users - Read
export function getAllUsers(): Promise<UserModel[]> {
  return db('users').select('*')
}

export function getOneUser(id: number): Promise<UserModel> {
  return db('users').select('*').where({ id }).first()
}

// Users - Update
export function updateUser(updateData: UpdateUserModel, id: number): Promise<UserModel[]> {
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
export function deleterUser(id: number): Promise<number> {
  return db('users').delete().where({ id })
}
