import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { UserManager } from './managers/UserManager';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

 const userManager = new UserManager()
 
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
})
