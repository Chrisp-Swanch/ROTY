"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdateVote = exports.checkNewVote = void 0;
const helpers_1 = require("./helpers");
const constraints_1 = require("./constraints");
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
function checkNewVote(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        user_id: 'number',
        rock_id: 'number',
        preference: 'number',
    };
    // required keys, valid keys, keys in request
    const requiredKeys = Object.keys(template);
    const validKeys = requiredKeys;
    const requestKeys = Object.keys(incoming);
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
    // keys conform to accepted set of values
    if (incoming.preference) {
        const { pass, errors } = (0, helpers_1.checkAcceptedString)('preference', String(incoming.preference), constraints_1.votePreferences);
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
exports.checkNewVote = checkNewVote;
// VoteModels.Update
function checkUpdateVote(incoming) {
    const result = {
        pass: false,
        errors: [],
    };
    // Type
    // valid keys and their types
    const template = {
        rock_id: 'number',
        preference: 'number',
        is_deleted: 'boolean',
    };
    // required keys, valid keys, keys in request
    const requiredKeys = ['none'];
    const validKeys = Object.keys(template);
    const requestKeys = Object.keys(incoming);
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
    // keys conform to accepted set of values
    if (incoming.preference) {
        const { pass, errors } = (0, helpers_1.checkAcceptedString)('preference', String(incoming.preference), constraints_1.votePreferences);
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
exports.checkUpdateVote = checkUpdateVote;
