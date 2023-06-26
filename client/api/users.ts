import request from 'superagent'
import * as UserModels from '../../models/interfaces/users'

const usersUrl = '/api/v1/users'

export async function fetchUsers() {
  const res = await request.get(usersUrl)
  const users = res.body
  return users
}

export async function postUser(newUser: UserModels.New, token?: string) {
  const res = await request
    .post(usersUrl)
    // .set('Authorization', `Bearer ${token}`)
    .send(newUser)
  const newUserResponse = res.body
  return newUserResponse
}

export async function patchUser(id: number, newUser: UserModels.Update) {
  const res = await request.patch(`${usersUrl}/${id}`).send({ newUser })
  return res.body
}

export async function removeUser(id: number) {
  await request.delete(`${usersUrl}/${id}`)
}
