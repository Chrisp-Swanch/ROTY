"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const connection_1 = __importDefault(require("./connection"));
const users = __importStar(require("./users"));
const rocks = __importStar(require("./rocks"));
const votes = __importStar(require("./votes"));
//-------
// SETUP
//-------
(0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.migrate.latest();
}));
(0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.seed.run();
}));
(0, vitest_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.migrate.rollback();
    yield connection_1.default.destroy();
}));
//----------------
// TEST FUNCTIONS
//----------------
//---------
// General
//---------
(0, vitest_1.describe)('Test environment working', () => {
    // Test environment
    (0, vitest_1.it)('Can be sent things', () => {
        vitest_1.expect.assertions(4);
        (0, vitest_1.expect)(true).toBeTruthy();
        (0, vitest_1.expect)(1 + 1).toBe(2);
        (0, vitest_1.expect)('this is a string').toBeTypeOf('string');
        (0, vitest_1.expect)([1, 2, 3]).toHaveLength(3);
    });
});
//-------
// Users
//-------
(0, vitest_1.describe)('Users Db functions', () => {
    // GET all users
    (0, vitest_1.it)('Retrieves all users as array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(2);
        const result = yield users.getAllUsers();
        (0, vitest_1.expect)(result).toHaveLength(5);
        (0, vitest_1.expect)(result[1]).toStrictEqual({
            id: 2,
            created_at: 1687147209343,
            name: 'Bilbo Baggins',
            profile_image: 'https://www.hollywoodreporter.com/wp-content/uploads/2012/12/hobbit_an_unexpected_journey_8_a_h.jpg?w=2000&h=1126&crop=1',
            previous_winner: 0,
            is_deleted: 0,
        });
    }));
    // GET one user by id
    (0, vitest_1.it)('Retrieves one user (as single object) when given id param', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        const result = yield users.getOneUser(3);
        (0, vitest_1.expect)(result).toStrictEqual({
            id: 3,
            created_at: 1687147209343,
            name: 'Queen Elizabeth II',
            profile_image: 'https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_645/d8292ed8ae1d759c999a394b98d611a8.jpg',
            previous_winner: 0,
            is_deleted: 0,
        });
    }));
    // POST new user
    (0, vitest_1.it)('Adds a user and returns new user in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(3);
        const newUser = {
            name: 'Squidward Tentacles',
            profile_image: null,
            previous_winner: true,
        };
        const result = yield users.addUser(newUser);
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 6,
            created_at: result[0].created_at,
            name: 'Squidward Tentacles',
            profile_image: null,
            previous_winner: 1,
            is_deleted: 0,
        });
        const newUsers = yield users.getAllUsers();
        (0, vitest_1.expect)(newUsers).toHaveLength(6);
    }));
    (0, vitest_1.it)('Updates a user and returns updated user in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        const updateData = {
            name: 'New Name',
            profile_image: 'new image path',
            previous_winner: true,
            is_deleted: true,
        };
        const result = yield users.updateUser(updateData, 3);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 3,
            created_at: 1687147209343,
            name: 'New Name',
            profile_image: 'new image path',
            previous_winner: 1,
            is_deleted: 1,
        });
    }));
    (0, vitest_1.it)('Deletes a user', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        users.deleteUser(2);
        const result = yield users.getAllUsers();
        (0, vitest_1.expect)(result).toHaveLength(5);
    }));
});
//-------
// Rocks
//-------
(0, vitest_1.describe)('Rocks Db functions', () => {
    // GET all rocks
    (0, vitest_1.it)('Retrieves all rocks as array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(2);
        const result = yield rocks.getAllRocks();
        (0, vitest_1.expect)(result).toHaveLength(9);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 1,
            created_at: 1687147209343,
            owner_id: 1,
            name: 'Rock of Ages',
            description: 'A beautiful collection of sand-coloured stones',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktckLlDpbYJWcj60hZcubQVuxVjAMNfOJXNK0_Ewv_vU0O6S2ENGzeDAho2NHMvxIyp0&usqp=CAU',
            weight_division: 'Middleweight',
            disqualified: 0,
            is_deleted: 0,
        });
    }));
    // GET one rock by id
    (0, vitest_1.it)('Retrieves one rock (as single object) when given id param', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        const result = yield rocks.getOneRock(2);
        (0, vitest_1.expect)(result).toStrictEqual({
            id: 2,
            created_at: 1687147209343,
            owner_id: 1,
            name: 'Rocky III',
            description: 'Wild-foraged greywacke with strong eye-contact',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtOVmKAMSRivthNb5sO8Y6ITVtGmMQhFlUA&usqp=CAU',
            weight_division: 'Lightweight',
            disqualified: 0,
            is_deleted: 0,
        });
    }));
    // POST new user
    (0, vitest_1.it)('Adds a rock and returns new rock in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(3);
        const newRock = {
            owner_id: 1,
            name: 'Rocky McRockface',
            weight_division: 'Heavyweight',
            description: null,
        };
        const result = yield rocks.addRock(newRock);
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 10,
            created_at: result[0].created_at,
            owner_id: 1,
            name: 'Rocky McRockface',
            description: null,
            image: null,
            weight_division: 'Heavyweight',
            disqualified: 0,
            is_deleted: 0,
        });
        const newRocks = yield rocks.getAllRocks();
        (0, vitest_1.expect)(newRocks).toHaveLength(10);
    }));
    (0, vitest_1.it)('Updates a rock and returns updated rock in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        const updateData = {
            name: 'New Rock Name',
            description: 'Newest rock in town',
            image: 'some image path',
            weight_division: 'Lightweight',
            disqualified: true,
            is_deleted: true,
        };
        const result = yield rocks.updateRock(updateData, 4);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 4,
            created_at: 1687147209343,
            owner_id: 3,
            name: 'New Rock Name',
            description: 'Newest rock in town',
            image: 'some image path',
            weight_division: 'Lightweight',
            disqualified: 1,
            is_deleted: 1,
        });
    }));
    (0, vitest_1.it)('Deletes a rock', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        rocks.deleteRock(2);
        const result = yield rocks.getAllRocks();
        (0, vitest_1.expect)(result).toHaveLength(9);
    }));
});
//-------
// Votes
//-------
(0, vitest_1.describe)('Votes Db functions', () => {
    // GET all votes
    (0, vitest_1.it)('Retrieves all votes as array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(2);
        const result = yield votes.getAllVotes();
        (0, vitest_1.expect)(result).toHaveLength(12);
        (0, vitest_1.expect)(result[6]).toStrictEqual({
            id: 7,
            created_at: 1687147209343,
            user_id: 3,
            rock_id: 9,
            preference: 1,
            is_deleted: 0,
        });
    }));
    // GET votes by user_id
    (0, vitest_1.it)('Retrieves votes made by given user', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(2);
        const result = yield votes.getVotesByUser(2);
        (0, vitest_1.expect)(result).toHaveLength(3);
        (0, vitest_1.expect)(result[1]).toStrictEqual({
            id: 5,
            created_at: 1687147209343,
            user_id: 2,
            rock_id: 5,
            preference: 2,
            is_deleted: 0,
        });
    }));
    // POST new vote
    (0, vitest_1.it)('Adds a vote and returns new vote in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(3);
        const newVote = {
            user_id: 5,
            rock_id: 6,
            preference: 2,
        };
        const result = yield votes.addVote(newVote);
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 13,
            created_at: result[0].created_at,
            user_id: 5,
            rock_id: 6,
            preference: 2,
            is_deleted: 0,
        });
        const newVotes = yield votes.getAllVotes();
        (0, vitest_1.expect)(newVotes).toHaveLength(13);
    }));
    (0, vitest_1.it)('Updates a vote and returns updated vote in array', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        const updateData = {
            rock_id: 3,
            preference: 1,
            is_deleted: true,
        };
        const result = yield votes.updateVote(updateData, 11);
        (0, vitest_1.expect)(result[0]).toStrictEqual({
            id: 11,
            created_at: 1687147209343,
            user_id: 4,
            rock_id: 3,
            preference: 1,
            is_deleted: 1,
        });
    }));
    (0, vitest_1.it)('Deletes a vote', () => __awaiter(void 0, void 0, void 0, function* () {
        vitest_1.expect.assertions(1);
        votes.deleteVote(5);
        const result = yield votes.getAllVotes();
        (0, vitest_1.expect)(result).toHaveLength(12);
    }));
});
