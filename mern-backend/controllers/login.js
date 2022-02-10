const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.send(400).send({ error: "missing email and/or password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "no user exists with this email" });
  }
  const { passwordHash, id } = user;
  const success = await bcrypt.compare(password, passwordHash);

  if (!success) {
    return res.status(401).send({ error: "password entered is wrong" });
  }

  const userForToken = { email, id };
  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ email, token });
});

module.exports = loginRouter;
