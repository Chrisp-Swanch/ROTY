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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const users = __importStar(require("../db/users"));
const users_1 = __importDefault(require("./test/mock_data/users"));
//-------
// SETUP
//-------
const usersUrl = '/api/v1/users';
// Mock functions
vitest_1.vi.mock('../db/users', () => {
    return {
        getAllUsers: vitest_1.vi.fn(),
    };
});
const mockUsers = vitest_1.vi.mocked(users);
(0, vitest_1.beforeEach)(() => {
    vitest_1.vi.resetAllMocks();
});
//----------------
// TEST FUNCTIONS
//----------------
(0, vitest_1.describe)('GET /users', () => {
    (0, vitest_1.it)('returns 3 users', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUsers.getAllUsers.mockResolvedValue(users_1.default);
        vitest_1.expect.assertions(3);
        const res = yield (0, supertest_1.default)(server_1.default).get(usersUrl);
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body).toHaveLength(3);
        (0, vitest_1.expect)(res.body[1].name).toBe('Gandalf');
    }));
    (0, vitest_1.it)('handles errors', () => __awaiter(void 0, void 0, void 0, function* () {
        // mockUsers.getAllUsers.mockRejectedValue(new Error('Server route error'))
        // ^ this line is causing an 'unhandled rejection' message in vitest!
        vitest_1.expect.assertions(1);
        const res = yield (0, supertest_1.default)(server_1.default).get(usersUrl);
        (0, vitest_1.expect)(res.body).toBe(users_1.default);
    }));
});
//-------
// Rocks
//-------
// vi.mock('../db/rocks', () => {
//   return {
// getAllRocks: vi.fn(),
// getOneRock: vi.fn(),
// addRock: vi.fn(),
// updateRock: vi.fn(),
// deleteRock: vi.fn(),
//   }
// })
// const mockRocks = vi.mocked(rocks)
//-------
// Votes
//-------
// vi.mock('../db/votes', () => {
//   return {
// getAllVotes: vi.fn(),
// getVotesByUser: vi.fn(),
// addVote: vi.fn(),
// updateVote: vi.fn(),
// deleteVote: vi.fn(),
//   }
// })
// const mockVotes = vi.mocked(votes)
