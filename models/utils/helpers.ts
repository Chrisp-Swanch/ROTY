//-------------------------------------------------------
// FUNCTIONS TO VALIDATE OBJECTS AGAINST EXPECTED MODELS
//-------------------------------------------------------

//---------
// GENERAL
//---------

// Type for 'results' of each check function, containing pass/fail bool and relevant errors
export type Result = {
  pass: boolean
  errors: string[]
}

// Error printing for failed checks
export function validate(result: Result): boolean {
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

// Makes a string out of an array, for error-printing purposes
// eg. func(['Apples', 'Oranges', 'Pears'], 'and') => "'Apples', 'Oranges' and 'Pears'"
// eg. func(['Red', 'Green', 'Blue'], 'or') => "'Red', 'Green' or 'Blue'"
export function arrayToString(array: string[], andOr?: string): string {
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

//-----------------------------------------------------
// FUNCTIONS TO CHECK KEYS, AND VALUE TYPES IN OBJECTS
//-----------------------------------------------------

// Check that the correct keys are present in an object
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

  // contains required keys?
  if (required[0] !== 'none') {
    required.forEach((key) => {
      if (!requestKeys.includes(key)) {
        result.errors.push(`request must include a '${key}' key`)
      }
    })
  }

  // contains only valid keys?
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

// Check that the values in an object have the correct type
export function checkType(
  key: string,
  val: string,
  expectedTypes: string | string[]
): Result {
  const result: Result = {
    pass: false,
    errors: [],
  }

  // Check if the type of a value is vaild (for only one permitted type)
  if (typeof expectedTypes === 'string' && val !== expectedTypes) {
    result.errors.push(
      `'${key}' property should be of type '${expectedTypes}', instead recieved '${val}'`
    )
  }

  // Check if the type of a value is vaild (for multiple permitted types)
  if (typeof expectedTypes != 'string' && !expectedTypes.includes(val)) {
    result.errors.push(
      `'${key}' property should be of types ${arrayToString(
        expectedTypes as string[],
        'or'
      )}, instead recieved '${val}'`
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
export function checkCharLimit(
  key: string,
  value: string,
  limit: number
): Result {
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
export function checkAcceptedString(
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
