"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRock = exports.updateRock = exports.getOneRock = exports.getAllRocks = exports.addRock = void 0;
const connection_1 = __importDefault(require("./connection"));
const db = connection_1.default;
// ROCKS
// Rocks - Create
function addRock(rockData) {
    return db('rocks').insert(rockData).returning('*');
}
exports.addRock = addRock;
// Rocks - Read
function getAllRocks() {
    return db('rocks').select('*');
}
exports.getAllRocks = getAllRocks;
function getOneRock(id) {
    return db('rocks').select('*').where({ id }).first();
}
exports.getOneRock = getOneRock;
// Rocks - Update
function updateRock(updateData, id) {
    const { name, description, image, weight_division, disqualified, is_deleted, } = updateData;
    return db('rocks')
        .select()
        .where({ id })
        .first()
        .update({
        name,
        description,
        image,
        weight_division,
        disqualified,
        is_deleted,
    })
        .returning('*');
}
exports.updateRock = updateRock;
// Rocks - Delete
function deleteRock(id) {
    return db('rocks').delete().where({ id });
}
exports.deleteRock = deleteRock;
