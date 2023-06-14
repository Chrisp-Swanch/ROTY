import connection from './connection'
import type {
  RockModel,
  NewRockModel,
  UpdateRockModel,
} from '../../models/rocks'

const db = connection

// ROCKS

// Rocks - Create
export function addRock(rockData: NewRockModel): Promise<RockModel[]> {
  return db('rocks')
    .insert({
      ...rockData,
      created_at: Number(new Date(Date.now())),
    })
    .returning('*')
}

// Rocks - Read
export function getAllRocks(): Promise<RockModel[]> {
  return db('rocks').select('*')
}

export function getOneRock(id: number): Promise<RockModel> {
  return db('rocks').select('*').where({ id }).first()
}

// Rocks - Update
export function updateRock(
  updateData: UpdateRockModel,
  id: number
): Promise<RockModel[]> {
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
