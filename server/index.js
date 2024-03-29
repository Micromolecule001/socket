// server.js
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

let wordList = [];

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.emit("current_wordList", { list: wordList });

    socket.on("send_word", (data) => {
        if (!wordList.includes(data.word)) {
            wordList.push(data.word); 
            io.emit("receive_wordList", { list: wordList });
        } else {
            socket.emit("already_exist", { error: 'already-exists' });
        }
    });

    socket.on("reset_words", () => {
        wordList = [];
        io.emit("current_wordList", { list: wordList });
    });

    socket.on("show_words", () => {
        const wordString = wordList.join(' ');
        socket.emit("show_words_response", { words: wordString });
    });

    socket.on("count_words", () => {
        const wordCount = wordList.length;
        socket.emit("count_words_response", { count: wordCount });
    });

    socket.on("delete_word", (data) => {
        const index = wordList.indexOf(data.word);
        if (index !== -1) {
            wordList.splice(index, 1);
            io.emit("current_wordList", { list: wordList });
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(3001, () => {
    console.log("--- server is running ---");
});
