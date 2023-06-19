import * as UserModels from '../models/users'
import * as RockModels from '../models/rocks'
// import * as VoteModels from '../models/users'

//----------------------------------------------------------------
// FUNCTIONS TO VALIDATE IMCOMING REQUESTS AGAINST EXPECTED TYPES
//----------------------------------------------------------------

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
const validDivs = arrayToString(weightDivisions, 'and')

// Generic key-checking function
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
  required.forEach((key) => {
    if (!requestKeys.includes(key)) {
      result.errors.push(`request must include a '${key}' key`)
    }
  })
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

// Individual type checking functions
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

//-------
// USERS
//-------

// Models and their characteristics, relevant only to server-side

// interface NewUserModel {
//   name: string // Character limit
//   profile_image?: string | null // Character limit
//   previous_winner?: boolean //
// }

// interface UpdateUserModel {
//   name?: string // Character limit
//   profile_image?: string | null // Size limit
//   previous_winner?: boolean //
//   is_deleted?: boolean //
// }

// FUNCTIONS

// NewUserModel
export function checkNewUser(incoming: UserModels.NewUserModel): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Type
  // all keys and their valid types, as an object
  const template = {
    name: 'string',
    profile_image: ['string', 'null'],
    previous_winner: 'boolean',
  }

  // required keys, valid keys, and keys in request
  const requiredKeys = ['name']
  const validKeys = Object.keys(template)
  const requestKeys = Object.keys(incoming)

  // Request
  // has all required, and only valid keys
  const keyCheck = checkKeys(incoming, requiredKeys, validKeys)
  if (keyCheck.pass === false) return keyCheck as Result

  // each value has a valid type
  for (let i = 0; i < requestKeys.length; i++) {
    const key = requestKeys[i] as keyof UserModels.NewUserModel
    const { pass, errors } = checkType(key, typeof incoming[key], template[key])
    if (!pass) {
      result.errors.push(errors[0])
    }
  }

  // // Name property
  // // exists
  // if (!incoming.name) {
  //   result.errors.push(`could not find 'name' property`)
  // }

  // // is a string
  // if (typeof incoming.name !== 'string') {
  //   result.errors.push(
  //     `'name' property should be of type 'string', instead recieved '${typeof incoming.name}'`
  //   )
  // }

  // // conforms to character limit
  // if (incoming.name.length > nameCharLimit) {
  //   result.errors.push(
  //     `'name' property exceeds character limit of ${nameCharLimit}`
  //   )
  // }

  // // Profile_image property (optional)
  // // exists
  // if (incoming.profile_image) {
  //   // is a string or null
  //   if (
  //     typeof incoming.profile_image !== 'string' &&
  //     typeof incoming.profile_image !== null
  //   ) {
  //     result.errors.push(
  //       `'profile_image' property should be of type 'string' or 'null', instead recieved '${typeof incoming.profile_image}'`
  //     )
  //   }

  //   // conforms to character limit
  //   if (incoming.profile_image.length > pathCharLimit) {
  //     result.errors.push(
  //       `'profile_image' property exceeds character limit of ${pathCharLimit}`
  //     )
  //   }
  // }

  // // Previous_winner property (optional)
  // // exists
  // if (incoming.previous_winner) {
  //   // is a boolean
  //   if (typeof incoming.previous_winner !== 'boolean') {
  //     result.errors.push(
  //       `'previous_winner' property should be of type 'boolean', instead recieved '${typeof incoming.previous_winner}'`
  //     )
  //   }
  // }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}

// UpdateUserModel
export function checkUpdateUser(incoming: UserModels.UpdateUserModel): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Name property (optional)
  // exists
  if (incoming.name) {
    // is a string
    if (typeof incoming.name !== 'string') {
      result.errors.push(
        `'name' property should be of type 'string', instead recieved '${typeof incoming.name}'`
      )
    }

    // conforms to character limit
    if (incoming.name.length > nameCharLimit) {
      result.errors.push(
        `'name' property exceeds character limit of ${nameCharLimit}`
      )
    }
  }

  // Profile_image property (optional)
  // exists
  if (incoming.profile_image) {
    // is a string or null
    if (
      typeof incoming.profile_image !== 'string' &&
      typeof incoming.profile_image !== null
    ) {
      result.errors.push(
        `'profile_image' property should be of type 'string' or 'null', instead recieved '${typeof incoming.profile_image}'`
      )
    }

    // conforms to character limit
    if (incoming.profile_image.length > pathCharLimit) {
      result.errors.push(
        `'profile_image' property exceeds character limit of ${pathCharLimit}`
      )
    }
  }

  // Previous_winner property (optional)
  // exists
  if (incoming.previous_winner) {
    // is a boolean
    if (typeof incoming.previous_winner !== 'boolean') {
      result.errors.push(
        `'previous_winner' property should be of type 'boolean', instead recieved '${typeof incoming.previous_winner}'`
      )
    }
  }

  // Is_deleted property (optional)
  // exists
  if (incoming.is_deleted) {
    // is a boolean
    if (typeof incoming.is_deleted !== 'boolean') {
      result.errors.push(
        `'is_deleted' property should be of type 'boolean', instead recieved '${typeof incoming.is_deleted}'`
      )
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

// Models and their characteristics, relevant only to server-side

// interface NewRockModel {
//   owner_id: number // Is number
//   name: string // Character limit
//   description: string // Character limit
//   image: string | null // Character limit
//   weight_division: string // Valid option
// }

// interface UpdateRockModel {
//   name?: string // Character limit
//   description?: string // Character limit
//   image?: string // Character limit
//   weight_division?: string // Valid option
//   disqualified?: boolean //
//   is_deleted?: boolean //
// }

// FUNCTIONS

// NewRockModel
export function checkNewRock(incoming: RockModels.NewRockModel): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Owner_id property
  // exists
  if (!incoming.name) {
    result.errors.push(`could not find 'owner_id' property`)
  }

  // is a number
  if (typeof incoming.owner_id !== 'number') {
    result.errors.push(
      `'owner_id' property should be of type 'number', instead recieved '${typeof incoming.owner_id}'`
    )
  }

  // Name property
  // exists
  if (!incoming.name) {
    result.errors.push(`could not find 'name' property`)
  }

  // is a string
  if (typeof incoming.name !== 'string') {
    result.errors.push(
      `'name' property should be of type 'string', instead recieved '${typeof incoming.name}'`
    )
  }

  // conforms to character limit
  if (incoming.name.length > nameCharLimit) {
    result.errors.push(
      `'name' property exceeds character limit of ${nameCharLimit}`
    )
  }

  // Description property
  // exists
  if (!incoming.description) {
    result.errors.push(`could not find 'description' property`)
  }

  // is a string
  if (typeof incoming.description !== 'string') {
    result.errors.push(
      `'description' property should be of type 'string', instead recieved '${typeof incoming.description}'`
    )
  }

  // conforms to character limit
  if (incoming.description.length > descriptionCharLimit) {
    result.errors.push(
      `'description' property exceeds character limit of ${nameCharLimit}`
    )
  }

  // Image property
  // exists
  if (incoming.image) {
    // is a string or null
    if (typeof incoming.image !== 'string' && typeof incoming.image !== null) {
      result.errors.push(
        `'image' property should be of type 'string' or 'null', instead recieved '${typeof incoming.image}'`
      )
    }

    // conforms to character limit
    if (incoming.image.length > pathCharLimit) {
      result.errors.push(
        `'image' property exceeds character limit of ${pathCharLimit}`
      )
    }
  }

  // Weight_division property
  // exists
  if (!incoming.weight_division) {
    result.errors.push(`could not find 'weight_division' property`)
  }

  // is a string
  if (typeof incoming.weight_division !== 'string') {
    result.errors.push(
      `'weight_division' property should be of type 'string', instead recieved '${typeof incoming.image}'`
    )
  }

  if (!weightDivisions.includes(incoming.weight_division)) {
    result.errors.push(
      `'weight_division' property is not valid. Valid options are; ${validDivs} (case sensitive)`
    )
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}

// UpdateRockModel
export function checkUpdateRock(incoming: RockModels.UpdateRockModel): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Name property (optional)
  // exists
  if (incoming.name) {
    // is a string
    if (typeof incoming.name !== 'string') {
      result.errors.push(
        `'name' property should be of type 'string', instead recieved '${typeof incoming.name}'`
      )
    }

    // conforms to character limit
    if (incoming.name.length > nameCharLimit) {
      result.errors.push(
        `'name' property exceeds character limit of ${nameCharLimit}`
      )
    }
  }

  // Description property (optional)
  // exists
  if (incoming.description) {
    // is a string
    if (typeof incoming.description !== 'string') {
      result.errors.push(
        `'description' property should be of type 'string', instead recieved '${typeof incoming.description}'`
      )
    }

    // conforms to character limit
    if (incoming.description.length > descriptionCharLimit) {
      result.errors.push(
        `'description' property exceeds character limit of ${nameCharLimit}`
      )
    }
  }

  // Image property (optional)
  // exists
  if (incoming.image) {
    // is a string or null
    if (typeof incoming.image !== 'string' && typeof incoming.image !== null) {
      result.errors.push(
        `'image' property should be of type 'string' or 'null', instead recieved '${typeof incoming.image}'`
      )
    }

    // conforms to character limit
    if (incoming.image.length > pathCharLimit) {
      result.errors.push(
        `'image' property exceeds character limit of ${pathCharLimit}`
      )
    }
  }

  // Weight_division property (optional)
  // exists
  if (incoming.weight_division) {
    // is a string
    if (typeof incoming.weight_division !== 'string') {
      result.errors.push(
        `'weight_division' property should be of type 'string', instead recieved '${typeof incoming.image}'`
      )
    }

    if (!weightDivisions.includes(incoming.weight_division)) {
      result.errors.push(
        `'weight_division' property is not valid. Valid options are; ${validDivs} (case sensitive)`
      )
    }
  }

  // Disqualified property (optional)
  // exists
  if (incoming.disqualified) {
    // is a boolean
    if (typeof incoming.disqualified !== 'boolean') {
      result.errors.push(
        `'disqualified' property should be of type 'boolean', instead recieved '${typeof incoming.disqualified}'`
      )
    }
  }

  // Is_deleted property (optional)
  // exists
  if (incoming.is_deleted) {
    // is a boolean
    if (typeof incoming.is_deleted !== 'boolean') {
      result.errors.push(
        `'is_deleted' property should be of type 'boolean', instead recieved '${typeof incoming.is_deleted}'`
      )
    }
  }

  // Pass if no errors
  if (!result.errors[0]) {
    result.pass = true
    return result
  }

  return result
}
