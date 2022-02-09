const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.send(400).send({ error: "missing email and/or password" });
  }

  const { passwordHash, id } = await User.findOne({ email });
  if (!user) {
    res.status(401).send({ error: "no user exists with this email" });
  }
  const success = await bcrypt.compare(password, passwordHash);

  if (!success) {
    res.status(401).send({ error: "password entered is wrong" });
  }

  const userForToken = { email, id };
  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ email, token });
});

module.exports = loginRouter;
