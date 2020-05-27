const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const Deck = require("./lib/deck");

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

const http = require("http").createServer(app);
const io = require("socket.io")(http);

let deck = null;
let count = 0;
let clients = [];

function dealToClients(clients) {
  deck = new Deck();
  let cL = clients.length;

  let cards = deck.dealToPlayers(cL);

  clients.forEach((clientID, index) => {
    console.log("DEAL");
    console.log(cards[index]);
    io.to(clientID).emit("receiveHand", cards[index]);
  });
}

function playGame() {
  io.clients((e, clientsArr) => {
    if (e) throw e;
    dealToClients(clientsArr);
  });
}

io.on("connection", (socket) => {
  count++;
  console.log("new connection", count);

  socket.on("newGame", () => {
    playGame();
  });

  socket.on("sub", (p) => {
    console.log("new sub");
  });

  socket.on("disconnect", (p) => {
    count--;
    clients = [];
    console.log("close", count);
  });
});

app.get("/", (req, res) => res.json({ name: "here" }));

module.exports = { app, http };
