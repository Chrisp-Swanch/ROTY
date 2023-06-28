"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVote = exports.updateVote = exports.getVotesByUser = exports.getAllVotes = exports.addVote = void 0;
const connection_1 = __importDefault(require("./connection"));
const db = connection_1.default;
// VOTES
// Votes - Create
function addVote(voteData) {
    return db('votes').insert(voteData).returning('*');
}
exports.addVote = addVote;
// Votes - Read
function getAllVotes() {
    return db('votes').select('*');
}
exports.getAllVotes = getAllVotes;
function getVotesByUser(user_id) {
    return db('votes').select('*').where({ user_id });
}
exports.getVotesByUser = getVotesByUser;
// Votes - Update
function updateVote(updateData, id) {
    const { rock_id, preference, is_deleted } = updateData;
    return db('votes')
        .select()
        .where({ id })
        .first()
        .update({
        rock_id,
        preference,
        is_deleted,
    })
        .returning('*');
}
exports.updateVote = updateVote;
// Votes - Delete
function deleteVote(id) {
    return db('votes').delete().where({ id });
}
exports.deleteVote = deleteVote;
