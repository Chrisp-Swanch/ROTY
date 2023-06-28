"use strict";
//-------------------------------------------------------
// FUNCTIONS TO VALIDATE OBJECTS AGAINST EXPECTED MODELS
//-------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAcceptedString = exports.checkCharLimit = exports.checkType = exports.checkKeys = exports.arrayToString = exports.validate = void 0;
// Error printing for failed checks
function validate(result) {
    if (result.pass == true)
        return true;
    console.log(`\n-----------------------------
    \nHttp request body is invaild:\n`);
    result.errors.forEach((msg, i) => {
        console.log(`${i + 1}) ${msg}`);
    });
    return false;
}
exports.validate = validate;
// Makes a string out of an array, for error-printing purposes
// eg. func(['Apples', 'Oranges', 'Pears'], 'and') => "'Apples', 'Oranges' and 'Pears'"
// eg. func(['Red', 'Green', 'Blue'], 'or') => "'Red', 'Green' or 'Blue'"
function arrayToString(array, andOr) {
    let output = '';
    for (let i = 0; i < array.length; i++) {
        if (i == array.length - 1 && andOr) {
            output = `${output}${andOr} '${array[i]}'`;
        }
        else {
            if (i == array.length - 1) {
                output = `${output}'${array[i]}'`;
            }
            else {
                output = `${output}'${array[i]}', `;
            }
        }
    }
    return output;
}
exports.arrayToString = arrayToString;
//-----------------------------------------------------
// FUNCTIONS TO CHECK KEYS, AND VALUE TYPES IN OBJECTS
//-----------------------------------------------------
// Check that the correct keys are present in an object
function checkKeys(request, required, valid) {
    const result = {
        pass: false,
        errors: [],
    };
    const requestKeys = Object.keys(request);
    // contains required keys?
    if (required[0] !== 'none') {
        required.forEach((key) => {
            if (!requestKeys.includes(key)) {
                result.errors.push(`request must include a '${key}' key`);
            }
        });
    }
    // contains only valid keys?
    requestKeys.forEach((key) => {
        if (!valid.includes(key)) {
            result.errors.push(`'${key}' is not a valid key`);
        }
    });
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkKeys = checkKeys;
// Check that the values in an object have the correct type
function checkType(key, val, expectedTypes) {
    const result = {
        pass: false,
        errors: [],
    };
    // Check if the type of a value is vaild (for only one permitted type)
    if (typeof expectedTypes === 'string' && val !== expectedTypes) {
        result.errors.push(`'${key}' property should be of type '${expectedTypes}', instead recieved '${val}'`);
    }
    // Check if the type of a value is vaild (for multiple permitted types)
    if (typeof expectedTypes != 'string' && !expectedTypes.includes(val)) {
        result.errors.push(`'${key}' property should be of types ${arrayToString(expectedTypes, 'or')}, instead recieved '${val}'`);
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkType = checkType;
// Check that strings conform to character limits
function checkCharLimit(key, value, limit) {
    const result = {
        pass: false,
        errors: [],
    };
    if (value.length > limit) {
        result.errors.push(`'${key}' property exceeds character limit of ${limit}`);
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkCharLimit = checkCharLimit;
// Check that strings conform to specific accepted strings
function checkAcceptedString(key, value, accepted) {
    const result = {
        pass: false,
        errors: [],
    };
    if (!accepted.includes(value)) {
        result.errors.push(`'${key}' property is not valid. Valid options are; ${arrayToString(accepted, 'and')} (case sensitive)`);
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkAcceptedString = checkAcceptedString;
