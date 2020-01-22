const express = require("express");
const cors = require("cors");
const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");
const server = express();

server.use(express.json());
server.use(logger);
server.use(cors());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's code some shiz!!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(req.get);
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
