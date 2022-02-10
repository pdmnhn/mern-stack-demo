const signupRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

signupRouter.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, address, password } = req.body;
  if (!(firstName && lastName && email && phone && address && password)) {
    return res.status(400).send({ error: "all details are required" });
  }
  const saltRounds = 10;
  passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    firstName,
    lastName,
    email,
    phone,
    address,
    passwordHash,
  });

  await newUser.save();
  res.status(201).json(newUser);
});

module.exports = signupRouter;
