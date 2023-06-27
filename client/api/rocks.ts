import request from 'superagent'
import * as RockModels from '../../models/interfaces/rocks'

const rocksUrl = '/api/v1/rocks'

export async function fetchRocks() {
  const res = await request.get(rocksUrl)
  const rocks = res.body
  return rocks
}

// Eventually include token as a param here
export async function postRock(newRock: RockModels.New) {
  const res = await request.post(rocksUrl).send(newRock)
  // .set('Authorization', `Bearer ${token}`)
  const newRockResponse = res.body
  return newRockResponse
}

export async function patchRock(id: number, newRock: RockModels.Update) {
  const res = await request.patch(`${rocksUrl}/${id}`).send({ newRock })
  return res.body
}

export async function removeRock(id: number) {
  await request.delete(`${rocksUrl}/${id}`)
}
