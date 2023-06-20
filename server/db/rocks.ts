import connection from './connection'
import * as RockModels from '../../models/rocks'

const db = connection

// ROCKS

// Rocks - Create
export function addRock(
  rockData: RockModels.New
): Promise<RockModels.RockSnakeCase[]> {
  return db('rocks').insert(rockData).returning('*')
}

// Rocks - Read
export function getAllRocks(): Promise<RockModels.RockSnakeCase[]> {
  return db('rocks').select('*')
}

export function getOneRock(id: number): Promise<RockModels.RockSnakeCase> {
  return db('rocks').select('*').where({ id }).first()
}

// Rocks - Update
export function updateRock(
  updateData: RockModels.Update,
  id: number
): Promise<RockModels.RockSnakeCase[]> {
  const {
    name,
    description,
    image,
    weight_division,
    disqualified,
    is_deleted,
  } = updateData
  return db('rocks')
    .select()
    .where({ id })
    .first()
    .update({
      name,
      description,
      image,
      weight_division,
      disqualified,
      is_deleted,
    })
    .returning('*')
}

// Rocks - Delete
export function deleteRock(id: number): Promise<number> {
  return db('rocks').delete().where({ id })
}
