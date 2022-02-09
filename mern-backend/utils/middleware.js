const jwt = require("jsonwebtoken");

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer")) {
    req.token = auth.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = (req, res, next) => {
  if (!req.token) {
    req.user = null;
  } else {
    req.user = jwt.decode(req.token, process.env.SECRET);
  }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(400).send({ error: "user with the given email already exists" });
  }
  console.log(err.message);
  next(err);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
