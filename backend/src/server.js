const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./router");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectUsers = {};

io.on("connect", socket => {
  const { user } = socket.handshake.query;
  connectUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://semana8rocketseat:semana8rocketseat@cluster0-h7lgv.gcp.mongodb.net/semana8rocketseat?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
