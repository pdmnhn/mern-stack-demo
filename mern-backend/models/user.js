const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  passwordHash: String,
});

userSchema.set("toJSON", {
  transform: (doc, retObj) => {
    retObj.id = retObj._id;
    delete retObj.__v;
    delete retObj._id;
    delete retObj.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
