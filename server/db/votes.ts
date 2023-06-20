import connection from './connection'
import * as VoteModels from '../../models/votes'

const db = connection

// VOTES

// Votes - Create
export function addVote(
  voteData: VoteModels.New
): Promise<VoteModels.VoteSnakeCase[]> {
  return db('votes').insert(voteData).returning('*')
}

// Votes - Read
export function getAllVotes(): Promise<VoteModels.VoteSnakeCase[]> {
  return db('votes').select('*')
}

export function getVotesByUser(
  user_id: number
): Promise<VoteModels.VoteSnakeCase[]> {
  return db('votes').select('*').where({ user_id })
}

// Votes - Update
export function updateVote(
  updateData: VoteModels.Update,
  id: number
): Promise<VoteModels.VoteSnakeCase[]> {
  const { rock_id, preference, is_deleted } = updateData
  return db('votes')
    .select()
    .where({ id })
    .first()
    .update({
      rock_id,
      preference,
      is_deleted,
    })
    .returning('*')
}

// Votes - Delete
export function deleteVote(id: number): Promise<number> {
  return db('votes').delete().where({ id })
}
