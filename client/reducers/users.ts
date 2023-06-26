import { Action, UserSnakeCase } from '../../models/interfaces/users'

import {
  ERROR,
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  DEL_USER,
} from '../actions/users'

const initialState = [] as UserSnakeCase[]

export default function usersReducers(state = initialState, action: Action) {
  const { type, payload } = action
  switch (type) {
    case ERROR:
      return payload
    case SET_USERS:
      return payload
    case ADD_USER:
      return [...state, payload]
    case UPDATE_USER:
      return state.map((user) => {
        if (user.id === payload.id) {
          return payload
        }
      })
    case DEL_USER:
      return state.filter((user) => user.id !== payload)
    default:
      return state
  }
}
