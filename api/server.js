const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
require("colors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "API is up! Pikapika" });
});

module.exports = server;
