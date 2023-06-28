"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression")); // import compression
const users_1 = __importDefault(require("./routes/users"));
const rocks_1 = __importDefault(require("./routes/rocks"));
const votes_1 = __importDefault(require("./routes/votes"));
const server = (0, express_1.default)();
server.use((0, compression_1.default)()); // implement compression
server.use(express_1.default.json());
server.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
server.use('/api/v1/users', users_1.default);
server.use('/api/v1/rocks', rocks_1.default);
server.use('/api/v1/votes', votes_1.default);
exports.default = server;
