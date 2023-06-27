import request from 'superagent'
import * as UserModels from '../../models/interfaces/users'

const usersUrl = '/api/v1/users'

export async function fetchUsers() {
  const res = await request.get(usersUrl)
  const users = res.body
  return users
}

// Eventually include token as a param here
export async function postUser(newUser: UserModels.New) {
  const res = await request.post(usersUrl).send(newUser)
  // .set('Authorization', `Bearer ${token}`)
  const newUserResponse = res.body
  return newUserResponse
}

export async function patchUser(id: number, newUser: UserModels.Update) {
  const res = await request.patch(`${usersUrl}/${id}`).send(newUser)
  return res.body
}

export async function removeUser(id: number) {
  await request.delete(`${usersUrl}/${id}`)
}
