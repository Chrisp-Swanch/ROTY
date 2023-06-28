"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = exports.addUser = void 0;
const connection_1 = __importDefault(require("./connection"));
const db = connection_1.default;
// USERS
// Users - Create
function addUser(userData) {
    return db('users').insert(userData).returning(['*']);
}
exports.addUser = addUser;
// Users - Read
function getAllUsers() {
    return db('users').select('*');
}
exports.getAllUsers = getAllUsers;
function getOneUser(id) {
    return db('users').select('*').where({ id }).first();
}
exports.getOneUser = getOneUser;
// Users - Update
function updateUser(updateData, id) {
    const { name, profile_image, previous_winner, is_deleted } = updateData;
    return db('users')
        .select()
        .where({ id })
        .first()
        .update({
        name,
        profile_image,
        previous_winner,
        is_deleted,
    })
        .returning('*');
}
exports.updateUser = updateUser;
// Users - Delete
function deleteUser(id) {
    return db('users').delete().where({ id });
}
exports.deleteUser = deleteUser;
