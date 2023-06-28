"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateRock = exports.checkNewRock = void 0;
const helpers_1 = require("./helpers");
const constraints_1 = require("./constraints");
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
function checkNewRock(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        owner_id: 'number',
        name: 'string',
        description: ['string', 'null'],
        image: ['string', 'null'],
        weight_division: 'string',
    };
    const limits = {
        name: constraints_1.nameCharLimit,
        description: constraints_1.descriptionCharLimit,
        image: constraints_1.pathCharLimit,
    };
    // required keys, valid keys, keys in request, keys with character limits
    const requiredKeys = ['owner_id', 'name', 'weight_division'];
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
    // keys conform to accepted set of values
    const { pass, errors } = (0, helpers_1.checkAcceptedString)('weight_division', incoming.weight_division, constraints_1.weightDivisions);
    if (!pass) {
        result.errors.push(errors[0]);
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkNewRock = checkNewRock;
// RockModels.Update
function checkUpdateRock(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        name: 'string',
        description: ['string', 'null'],
        image: ['string', 'null'],
        weight_division: 'string',
        disqualified: 'boolean',
        is_deleted: 'boolean',
    };
    const limits = {
        name: constraints_1.nameCharLimit,
        description: constraints_1.descriptionCharLimit,
        image: constraints_1.pathCharLimit,
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
    // keys conform to accepted set of values
    if (incoming.weight_division) {
        const { pass, errors } = (0, helpers_1.checkAcceptedString)('weight_division', incoming.weight_division, constraints_1.weightDivisions);
        if (!pass) {
            result.errors.push(errors[0]);
        }
    }
    // Pass if no errors
    if (!result.errors[0]) {
        result.pass = true;
        return result;
    }
    return result;
}
exports.checkUpdateRock = checkUpdateRock;
