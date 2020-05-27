const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let count = 0;

function connection() {
  console.log("here");
  io.on("connection", (socket) => {
    count++;
    console.log("new connection", count);
    io.emit("m", "test!");

    // io.emit("chatHX", { list: chat });

    socket.on("sub", (p) => {
      console.log("new sub");
    });

    socket.on("test", () => {
      console.log("here");
    });

    // socket.on("chat", (payload) => {
    //   chat.push(formatMessage(payload.message));
    //   io.emit("chatHX", { list: chat });
    // });

    socket.on("disconnect", (p) => {
      count--;
      console.log("close", count);
    });
  });
}

module.exports = { connection, http };
