import {
  Result,
  checkKeys,
  checkType,
  checkCharLimit,
  checkAcceptedString,
} from './helpers'
import { pathCharLimit,
  nameCharLimit,
  descriptionCharLimit,
  weightDivisions } from './constraints'
import * as RockModels from '../interfaces/rocks'

//---------------------------------
// ROCKS - TYPE CHECKING FUNCTIONS
//---------------------------------

// Models and their characteristics

// RockModels.New {
//   owner_id: number //
//   name: string // Character limit
//   description?: string | null // Character limit
//   image?: string | null // Character limit
//   weight_division: string // Valid option
// }

// RockModels.Update {
//   name?: string // Character limit
//   description?: string | null // Character limit
//   image?: string // Character limit
//   weight_division?: string // Valid option
//   disqualified?: boolean //
//   is_deleted?: boolean //
// }

// RockModels.New
export function checkNewRock(incoming: RockModels.New): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // valid keys and their types
  const template = {
    owner_id: 'number',
    name: 'string',
    description: ['string', 'null'],
    image: ['string', 'null'],
    weight_division: 'string',
  }

  // keys with character limits
  type Limits = {
    name: number
    description: number
    image: number
  }
  const limits: Limits = {
    name: nameCharLimit,
    description: descriptionCharLimit,
    image: pathCharLimit,
  }

  // required keys, valid keys, keys in request, keys with character limits
  const requiredKeys = ['owner_id', 'name', 'weight_division']
  const validKeys = Object.keys(template)
  const requestKeys = Object.keys(incoming)
  const limitKeys = Object.keys(limits)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof RockModels.New
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
    const val = key as keyof RockModels.New
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

  // keys conform to accepted set of values
  const { pass, errors } = checkAcceptedString(
    'weight_division',
    incoming.weight_division,
    weightDivisions
  )
  if (!pass) {
    result.errors.push(errors[0])
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}

// RockModels.Update
export function checkUpdateRock(incoming: RockModels.Update): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // valid keys and their types
  const template = {
    name: 'string',
    description: ['string', 'null'],
    image: ['string', 'null'],
    weight_division: 'string',
    disqualified: 'boolean',
    is_deleted: 'boolean',
  }

  // keys with character limits
  type Limits = {
    name: number
    description: number
    image: number
  }
  const limits: Limits = {
    name: nameCharLimit,
    description: descriptionCharLimit,
    image: pathCharLimit,
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
    const key = requestKeys[i] as keyof RockModels.Update
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
    const val = key as keyof RockModels.Update
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

  // keys conform to accepted set of values
  if (incoming.weight_division) {
    const { pass, errors } = checkAcceptedString(
      'weight_division',
      incoming.weight_division,
      weightDivisions
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