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
const express_1 = __importDefault(require("express"));
const helpers_1 = require("../../models/utils/helpers");
const votes_1 = require("../../models/utils/votes");
const router = express_1.default.Router();
const db = __importStar(require("../db/votes"));
// GET
// Get all votes
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // call the database
    const votes = yield db.getAllVotes();
    try {
        res.json(votes);
    }
    catch (err) {
        res.sendStatus(500);
    }
}));
// get votes by user_id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    // call the database
    const votes = yield db.getVotesByUser(id);
    try {
        res.json(votes);
    }
    catch (err) {
        res.sendStatus(500);
    }
}));
// POST
// Add a new vote
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newVote = req.body;
    if (!(0, helpers_1.validate)((0, votes_1.checkNewVote)(newVote))) {
        res.sendStatus(400);
        return;
    }
    // call the database
    const vote = yield db.addVote(newVote);
    try {
        res.json(vote[0]);
    }
    catch (err) {
        res.sendStatus(500);
    }
}));
// PATCH
// Update vote
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const newVote = req.body;
    if (!(0, helpers_1.validate)((0, votes_1.checkUpdateVote)(newVote))) {
        res.sendStatus(400);
        return;
    }
    // call the database
    const vote = yield db.updateVote(newVote, id);
    try {
        res.json(vote[0]);
    }
    catch (err) {
        res.sendStatus(500);
    }
}));
// DELETE
// Delete vote
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    // call the database
    yield db.deleteVote(id);
    try {
        res.sendStatus(204);
    }
    catch (err) {
        res.sendStatus(500);
    }
}));
exports.default = router;
