const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  if (!req.user) {
    res.status(401).send({ error: "authorization header missing" });
  }

  const { firstName, lastName, email, phone, address } = await User.findById(
    req.user.id
  );

  res.status(200).json({ firstName, lastName, email, phone, address });
});

module.exports = userRouter;
