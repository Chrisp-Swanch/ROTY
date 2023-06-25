import {
  Action,
  UserSnakeCase,
  New,
  Update,
} from '../../models/interfaces/users'
import * as api from '../api/users'
import { ThunkAction } from '../store'


export const ERROR = 'ERROR'
export const SET_USERS = 'SET_USERS'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DEL_USER = 'DEL_USER'

// Simple actions

export function error(message: string): Action {
  return {
    type: ERROR,
    payload: message,
  }
}

export function setUsers(users: UserSnakeCase[]): Action {
  return {
    type: SET_USERS,
    payload: users,
  }
}

// Do I need a simple action for this?
export function addUser(user: New): Action {
  return {
    type: ADD_USER,
    payload: user,
  }
}

export function updateUser(id: number, user: UserSnakeCase): Action {
  return {
    type: UPDATE_USER,
    payload: user,
  }
}

export function deleteUser(id: number): Action {
  return {
    type: DEL_USER,
    payload: id,
  }
}

// Thunk actions

export function getUsersThunk(): ThunkAction {
  return async (dispatch) => {
    try {
      const usersArray = await api.fetchUsers()
      dispatch(setUsers(usersArray))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

// eventually put api token here as a param
export function addUserThunk(user: New): ThunkAction {
  return async (dispatch) => {
    try {
      const newUser = await api.postUser(user)
      dispatch(addUser(newUser))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

export function updateUserThunk(id: number, user: Update): ThunkAction {
  return async (dispatch) => {
    try {
      const newUser = await api.patchUser(id, user)
      dispatch(updateUser(id, newUser))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

export function deleteUserThunk(id: number): ThunkAction {
  return async (dispatch) => {
    try {
      await api.removeUser(id)
      dispatch(deleteUser(id))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}
