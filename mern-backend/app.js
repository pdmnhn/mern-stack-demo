require("dotenv").config();
const express = require("express");
require("express-async-errors");
const middleware = require("./utils/middleware");
const signupRouter = require("./controllers/signup");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/user");
const mongoose = require("mongoose");

const app = express();

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

app.use(express.static("build"));
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.use(express.json());
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);

app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);
app.use("/api/user", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
