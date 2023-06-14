import connection from './connection'
import { NewRockModel, UpdateRockModel } from '../../models/rocks'

const db = connection

// ROCKS

// Rocks - Create
export function addRock(rockData: NewRockModel) {
  return db('rocks')
    .insert({
      ...rockData,
      created_at: Number(new Date(Date.now())),
    })
    .returning('*')
}

// Rocks - Read
export function getAllRocks() {
  return db('rocks').select('*')
}

export function getOneRock(id: number) {
  return db('rocks').select('*').where({ id }).first()
}

// Rocks - Update
export function updateRock(updateData: UpdateRockModel, id: number) {
  const { name, description, image, weight_division, is_deleted } = updateData
  return db('rocks')
    .select()
    .where({ id })
    .first()
    .update({
      name,
      description,
      image,
      weight_division,
      is_deleted,
    })
    .returning('*')
}

// Rocks - Delete
export function deleteRock(id: number) {
  return db('rocks').delete().where({ id })
}
