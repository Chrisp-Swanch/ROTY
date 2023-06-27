import {
  Action,
  RockSnakeCase,
  New,
  Update,
} from '../../models/interfaces/rocks'
import * as api from '../api/rocks'
import { ThunkAction } from '../store'

export const ERROR = 'ERROR'
export const SET_ROCKS = 'SET_ROCKS'
export const ADD_ROCK = 'ADD_ROCK'
export const UPDATE_ROCK = 'UPDATE_ROCK'
export const DEL_ROCK = 'DEL_ROCK'

// Simple actions

export function error(message: string): Action {
  return {
    type: ERROR,
    payload: message,
  }
}

export function setRocks(rocks: RockSnakeCase[]): Action {
  return {
    type: SET_ROCKS,
    payload: rocks,
  }
}

export function addRock(rock: RockSnakeCase): Action {
  return {
    type: ADD_ROCK,
    payload: rock,
  }
}

export function updateRock(rock: RockSnakeCase): Action {
  return {
    type: UPDATE_ROCK,
    payload: rock,
  }
}

export function deleteRock(id: number): Action {
  return {
    type: DEL_ROCK,
    payload: id,
  }
}

// Thunk actions

export function getRocksThunk(): ThunkAction {
  return async (dispatch) => {
    try {
      const rocksArray = await api.fetchRocks()
      dispatch(setRocks(rocksArray))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

// eventually put api token here as a param
export function addRockThunk(rock: New): ThunkAction {
  return async (dispatch) => {
    try {
      const newRock = await api.postRock(rock)
      dispatch(addRock(newRock))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

export function updateRockThunk(id: number, rock: Update): ThunkAction {
  return async (dispatch) => {
    try {
      const newRock = await api.patchRock(id, rock)
      dispatch(updateRock(newRock[0]))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}

export function deleteRockThunk(id: number): ThunkAction {
  return async (dispatch) => {
    try {
      await api.removeRock(id)
      dispatch(deleteRock(id))
    } catch (err) {
      dispatch(error(String(err)))
    }
  }
}
