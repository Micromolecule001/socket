const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);
const port = process.env.PORT || 8080;

// Serve socket.io.js
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules/socket.io/client-dist/socket.io.js'));
});

// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'))
});

// attached http server to the socket.io
const io = require('socket.io')(http);

// create a new connection
io.on('connection', socket => {
    console.log('socket.id: ', socket.id);
});

http.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
