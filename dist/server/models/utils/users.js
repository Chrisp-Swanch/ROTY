"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateUser = exports.checkNewUser = void 0;
const helpers_1 = require("./helpers");
const constraints_1 = require("./constraints");
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
function checkNewUser(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        name: 'string',
        profile_image: ['string', 'null'],
        previous_winner: 'boolean',
    };
    const limits = {
        name: constraints_1.nameCharLimit,
        profile_image: constraints_1.pathCharLimit,
    };
    // required keys, valid keys, keys in request, keys with character limits
    const requiredKeys = ['name'];
    const validKeys = Object.keys(template);
    const requestKeys = Object.keys(incoming);
    const limitKeys = Object.keys(limits);
    // Request
    // has all required, and only valid keys
    const keyCheck = (0, helpers_1.checkKeys)(incoming, requiredKeys, validKeys);
    if (keyCheck.pass === false)
        return keyCheck;
    // each value has a valid type
    for (let i = 0; i < requestKeys.length; i++) {
        const key = requestKeys[i];
        let val = typeof incoming[key];
        if (incoming[key] === null)
            val = 'null';
        const { pass, errors } = (0, helpers_1.checkType)(key, val, template[key]);
        if (!pass) {
            result.errors.push(errors[0]);
        }
    }
    // keys conform to character limits
    for (let i = 0; i < limitKeys.length; i++) {
        const key = limitKeys[i];
        const val = key;
        if (incoming[val]) {
            const { pass, errors } = (0, helpers_1.checkCharLimit)(key, incoming[val], limits[key]);
            if (!pass) {
                result.errors.push(errors[0]);
            }
        }
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkNewUser = checkNewUser;
// UserModels.Update
function checkUpdateUser(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        name: 'string',
        profile_image: ['string', 'null'],
        previous_winner: 'boolean',
        is_deleted: 'boolean',
    };
    const limits = {
        name: constraints_1.nameCharLimit,
        profile_image: constraints_1.pathCharLimit,
    };
    // required keys, valid keys, keys in request, keys with character limits
    const requiredKeys = ['none'];
    const validKeys = Object.keys(template);
    const requestKeys = Object.keys(incoming);
    const limitKeys = Object.keys(limits);
    // Request
    // has all required, and only valid keys
    const keyCheck = (0, helpers_1.checkKeys)(incoming, requiredKeys, validKeys);
    if (keyCheck.pass === false)
        return keyCheck;
    // each value has a valid type
    for (let i = 0; i < requestKeys.length; i++) {
        const key = requestKeys[i];
        let val = typeof incoming[key];
        if (incoming[key] === null)
            val = 'null';
        const { pass, errors } = (0, helpers_1.checkType)(key, val, template[key]);
        if (!pass) {
            result.errors.push(errors[0]);
        }
    }
    // keys conform to character limits
    for (let i = 0; i < limitKeys.length; i++) {
        const key = limitKeys[i];
        const val = key;
        if (incoming[val]) {
            const { pass, errors } = (0, helpers_1.checkCharLimit)(key, incoming[val], limits[key]);
            if (!pass) {
                result.errors.push(errors[0]);
            }
        }
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkUpdateUser = checkUpdateUser;
