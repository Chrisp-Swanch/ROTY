"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const users_1 = __importDefault(require("./routes/users"));
const rocks_1 = __importDefault(require("./routes/rocks"));
const votes_1 = __importDefault(require("./routes/votes"));
const server = (0, express_1.default)();
server.use((0, compression_1.default)());
server.use(express_1.default.json());
server.use('/api/v1/users', users_1.default);
server.use('/api/v1/rocks', rocks_1.default);
server.use('/api/v1/votes', votes_1.default);
if (process.env.NODE_ENV === 'production') {
    server.use('/assets', express_1.default.static('../assets'));
    server.get('*', (req, res) => {
        res.sendFile('../index.html');
    });
}
exports.default = server;
