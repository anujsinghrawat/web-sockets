import http from 'http';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        console.log("A new User Message from socket id : ", socket.id, "--> ", message);
        io.emit('message', message);
    })
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    }
    );
}
);

app.use(express.static(path.resolve('../public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
}
);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
