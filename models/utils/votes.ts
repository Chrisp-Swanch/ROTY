import {
  Result,
  checkKeys,
  checkType,
  checkAcceptedString,
} from './helpers'
import { votePreferences } from './constraints'
import * as VoteModels from '../interfaces/votes'

//---------------------------------
// VOTES - TYPE CHECKING FUNCTIONS
//---------------------------------

// Models and their characteristics

// VoteModels.New {
//   user_id: number //
//   rock_id: number //
//   preference: number // Valid option
// }

// VoteModels.Update {
//   rock_id?: number //
//   preference?: number // Valid option
//   is_deleted?: boolean //
// }

// VoteModels.New
export function checkNewVote(incoming: VoteModels.New): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // valid keys and their types
  const template = {
    user_id: 'number',
    rock_id: 'number',
    preference: 'number',
  }

  // required keys, valid keys, keys in request
  const requiredKeys = Object.keys(template)
  const validKeys = requiredKeys
  const requestKeys = Object.keys(incoming)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof VoteModels.New
    let val: string = typeof incoming[key]
    if (incoming[key] === null) val = 'null'
    const { pass, errors } = checkType(key, val, template[key])
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // keys conform to accepted set of values
  if (incoming.preference) {
    const { pass, errors } = checkAcceptedString(
      'preference',
      String(incoming.preference),
      votePreferences
    )
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}

// VoteModels.Update
export function checkUpdateVote(incoming: VoteModels.Update): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // valid keys and their types
  const template = {
    rock_id: 'number',
    preference: 'number',
    is_deleted: 'boolean',
  }

  // required keys, valid keys, keys in request
  const requiredKeys = ['none']
  const validKeys = Object.keys(template)
  const requestKeys = Object.keys(incoming)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof VoteModels.Update
    let val: string = typeof incoming[key]
    if (incoming[key] === null) val = 'null'
    const { pass, errors } = checkType(key, val, template[key])
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // keys conform to accepted set of values
  if (incoming.preference) {
    const { pass, errors } = checkAcceptedString(
      'preference',
      String(incoming.preference),
      votePreferences
    )
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}
