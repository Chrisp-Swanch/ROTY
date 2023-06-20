import {
  Result,
  checkKeys,
  checkType,
  checkCharLimit,
} from './helpers'
import { pathCharLimit,
  nameCharLimit } from './constraints'
import * as UserModels from '../interfaces/users'

//---------------------------------
// USERS - TYPE CHECKING FUNCTIONS
//---------------------------------

// Models and their characteristics

// UserModels.New {
//   name: string // Character limit
//   profile_image?: string | null // Character limit
//   previous_winner?: boolean //
// }

// UserModels.Update {
//   name?: string // Character limit
//   profile_image?: string | null // Character limit
//   previous_winner?: boolean //
//   is_deleted?: boolean //
// }

// UserModels.New
export function checkNewUser(incoming: UserModels.New): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // valid keys and their types
  const template = {
    name: 'string',
    profile_image: ['string', 'null'],
    previous_winner: 'boolean',
  }

  // keys with character limits
  type Limits = {
    name: number
    profile_image: number
  }
  const limits: Limits = {
    name: nameCharLimit,
    profile_image: pathCharLimit,
  }

  // required keys, valid keys, keys in request, keys with character limits
  const requiredKeys = ['name']
  const validKeys = Object.keys(template)
  const requestKeys = Object.keys(incoming)
  const limitKeys = Object.keys(limits)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof UserModels.New
    let val: string = typeof incoming[key]
    if (incoming[key] === null) val = 'null'
    const { pass, errors } = checkType(key, val, template[key])
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // keys conform to character limits
  for (let i = 0; i < limitKeys.length; i++) {
    const key = limitKeys[i] as keyof Limits
    const val = key as keyof UserModels.New
    if (incoming[val]) {
      const { pass, errors } = checkCharLimit(
        key,
        incoming[val] as string,
        limits[key]
      )
      if (!pass) {
        result.errors.push(errors[0])
      }
    }
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }
  return result
}

// UserModels.Update
export function checkUpdateUser(incoming: UserModels.Update): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  if (!incoming) {
    result.errors.push(`no body given in request`)
    return result
  }

  // Type
  // valid keys and their types
  const template = {
    name: 'string',
    profile_image: ['string', 'null'],
    previous_winner: 'boolean',
    is_deleted: 'boolean',
  }

  // keys with character limits
  type Limits = {
    name: number
    profile_image: number
  }
  const limits: Limits = {
    name: nameCharLimit,
    profile_image: pathCharLimit,
  }

  // required keys, valid keys, keys in request, keys with character limits
  const requiredKeys = ['none']
  const validKeys = Object.keys(template)
  const requestKeys = Object.keys(incoming)
  const limitKeys = Object.keys(limits)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof UserModels.Update
    let val: string = typeof incoming[key]
    if (incoming[key] === null) val = 'null'
    const { pass, errors } = checkType(key, val, template[key])
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // keys conform to character limits
  for (let i = 0; i < limitKeys.length; i++) {
    const key = limitKeys[i] as keyof Limits
    const val = key as keyof UserModels.Update
    if (incoming[val]) {
      const { pass, errors } = checkCharLimit(
        key,
        incoming[val] as string,
        limits[key]
      )
      if (!pass) {
        result.errors.push(errors[0])
      }
    }
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}
