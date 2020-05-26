const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

let count = 0;

let chat = [];

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

const http = require("http").createServer(app);
const io = require("socket.io")(http);

function formatMessage(message) {
  let obj = {
    timeCreated: new Date(),
    message: message,
  };
  return obj;
}

setInterval(() => {
  io.emit("beep", new Date());
}, 10000);

io.on("connection", (socket) => {
  count++;
  console.log("new connection", count);
  io.emit("chatHX", { list: chat });
  socket.on("sub", (p) => {
    console.log("new sub");
  });

  socket.on("chat", (payload) => {
    chat.push(formatMessage(payload.message));
    io.emit("chatHX", { list: chat });
  });

  socket.on("disconnect", (p) => {
    count--;
    console.log("close", count);
  });
});

app.get("/", (req, res) => res.json({ name: "here" }));

module.exports = { app, http };
