import { Action, RockSnakeCase } from '../../models/interfaces/rocks'
import {
  ERROR,
  SET_ROCKS,
  ADD_ROCK,
  UPDATE_ROCK,
  DEL_ROCK,
} from '../actions/rocks'

const initialState = [] as RockSnakeCase[]

export default function rocksReducers(state = initialState, action: Action) {
  const { type, payload } = action
  switch (type) {
    case ERROR:
      return payload
    case SET_ROCKS:
      return payload
    case ADD_ROCK:
      return [...state, payload]
    case UPDATE_ROCK:
      return state.map((rock) => {
        if (rock.id === payload.id) {
          return payload
        } else {
          return rock
        }
      })
    case DEL_ROCK:
      return state.filter((rock) => rock.id !== payload)
    default:
      return state
  }
}
