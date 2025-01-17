"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const UserManager_1 = require("./managers/UserManager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const userManager = new UserManager_1.UserManager();
console.log("Server setup started");
io.on('connection', (socket) => {
    console.log('A user connected');
    // add user
    userManager.addUser("randomName", socket);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        userManager.removeUser(socket.id);
        // remove user
    });
});
console.log('Server setup complete');
server.listen(3000, () => {
    console.log('server runnning at http://localhost:3000');
});
