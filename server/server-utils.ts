import * as UserModels from '../models/users'
import * as RockModels from '../models/rocks'
// import * as VoteModels from '../models/users'

//----------------------------------------------------------------
// FUNCTIONS TO VALIDATE IMCOMING REQUESTS AGAINST EXPECTED TYPES
//----------------------------------------------------------------

//-------
// SETUP
//-------

// Type for results, containing pass/fail bool and relevant errors
export type Result = {
  pass: boolean
  errors: string[]
}

// Error printing
export function validate(result: Result) {
  if (result.pass == true) return true
  console.log(
    `\n-----------------------------
    \nHttp request body is invaild:\n`
  )
  result.errors.forEach((msg, i) => {
    console.log(`${i + 1}) ${msg}`)
  })
  return false
}

// Makes a string out of an array,
// eg. func(['Apples', 'Oranges', 'Pears'], 'and') => "'Apples', 'Oranges' and 'Pears'"
function arrayToString(array: string[], andOr?: string): string {
  let output = ''
  for (let i = 0; i < array.length; i++) {
    if (i == array.length - 1 && andOr) {
      output = `${output}${andOr} '${array[i]}'`
    } else {
      if (i == array.length - 1) {
        output = `${output}'${array[i]}'`
      } else {
        output = `${output}'${array[i]}', `
      }
    }
  }
  return output
}

// Variables to set constraints for keys
const pathCharLimit = 5000 // character limit for url strings
const nameCharLimit = 40 // character limit for names
const descriptionCharLimit = 400 // character limit for descriptions
const weightDivisions = [
  'Flyweight',
  'Lightweight',
  'Middleweight',
  'Heavyweight',
  'Super Heavyweight',
] // Valid weight divisions

//-----------------------------------
// FUNCTIONS TO CHECK KEYS AND TYPES
//-----------------------------------

// Check that correct keys are present
export function checkKeys(
  request: object,
  required: string[],
  valid: string[]
): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }
  const requestKeys = Object.keys(request)

  // contains required keys
  if (required[0] !== 'none') {
    required.forEach((key) => {
      if (!requestKeys.includes(key)) {
        result.errors.push(`request must include a '${key}' key`)
      }
    })
  }

  // contains only valid keys
  requestKeys.forEach((key) => {
    if (!valid.includes(key)) {
      result.errors.push(`'${key}' is not a valid key`)
    }
  })

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }
  return result
}

// Check that keys have correct types
export function checkType(
  key: string,
  val: string,
  expectedTypes: string | string[]
): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // If multiple types allowed, check that input type is valid
  if (typeof expectedTypes != 'string' && !expectedTypes.includes(val)) {
    result.errors.push(
      `'${key}' property should be of types ${arrayToString(
        expectedTypes as string[],
        'or'
      )}, instead recieved '${val}'`
    )
  }

  // Check if input type matches expected, if only one allowed
  if (typeof expectedTypes === 'string' && val !== expectedTypes) {
    result.errors.push(
      `'${key}' property should be of type '${expectedTypes}', instead recieved '${val}'`
    )
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }
  return result
}

// Check that strings conform to character limits
function checkCharLimit(key: string, value: string, limit: number): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }
  if (value.length > limit) {
    result.errors.push(`'${key}' property exceeds character limit of ${limit}`)
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }
  return result
}

// Check that strings conform to specific accepted strings
function checkAcceptedString(
  key: string,
  value: string,
  accepted: string[]
): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  if (!accepted.includes(value)) {
    result.errors.push(
      `'${key}' property is not valid. Valid options are; ${arrayToString(
        accepted,
        'and'
      )} (case sensitive)`
    )
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }
  return result
}

//-------------------------------
// FUNCTIONS FOR CHECKING MODELS
//-------------------------------

//-------
// USERS
//-------

// Models and their characteristics

// interface UserModels.New {
//   name: string // Character limit
//   profile_image?: string | null // Character limit
//   previous_winner?: boolean //
// }

// interface UserModels.Update {
//   name?: string // Character limit
//   profile_image?: string | null // Character limit
//   previous_winner?: boolean //
//   is_deleted?: boolean //
// }

// MODEL CHECKING FUNCTIONS

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

//-------
// ROCKS
//-------

// Models and their characteristics

// interface RockModels.New {
//   owner_id: number //
//   name: string // Character limit
//   description?: string | null // Character limit
//   image?: string | null // Character limit
//   weight_division: string // Valid option
// }

// interface RockModels.Update {
//   name?: string // Character limit
//   description?: string | null // Character limit
//   image?: string // Character limit
//   weight_division?: string // Valid option
//   disqualified?: boolean //
//   is_deleted?: boolean //
// }

// FUNCTIONS

// NewRockModel
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

// UpdateRockModel
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
