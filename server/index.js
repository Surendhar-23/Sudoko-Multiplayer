const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { log } = require("console");
const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Generate 6 digit unique random id
const createRoomId = function (size = 6) {
  let id = "";
  for (i = 0; i < size; i++) {
    id += Math.floor(Math.random() * 10);
  }
  if (room[id]) return createRoomId();
  return id;
};

const room = {};

// Create game
function creategame(socket) {
  const newGameId = createRoomId();
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
  room[newGameId] = initialBoard;

  // socket users to same id to emit player moves to all
  socket.join(newGameId);
  socket.emit("gameCreated", { roomId: newGameId, board: room[newGameId] });
}

function playermove(socket, state) {
  const { roomId, board } = state;
  room[roomId] = board;
  console.log("board");
  console.log(board);
  console.log(room);

  // socket.emit("gamestateupdated", { roomId, board: room[roomId] });
  // io.emit("gamestateupdated", { roomId, board: room[roomId] });

  socket.to(roomId).emit("gamestateupdated", { roomId, board: room[roomId] });
}

function joinGame(socket, roomId) {
  if (!room[roomId]) socket.emit("invalidRoom", "Room does not exit");
  else {
    // socket users to same id to emit player moves to all
    socket.join(roomId);
    socket.emit("joinExistingGame", { roomId: roomId, board: room[roomId] });
  }
}

io.on("connection", (socket) => {
  console.log("a client connected");

  socket.emit("welcome", "hello..! welcome to my sudoku game");

  socket.on("joinGame", (roomId) => joinGame(socket, roomId));
  socket.on("createGame", () => creategame(socket));
  socket.on("playermove", (state) => playermove(socket, state));
});

server.listen(3000, () => {
  console.log("Server running on 3000");
});
