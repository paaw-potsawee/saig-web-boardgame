const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const booking = new Schema({
  boardgameName: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  reserveDay: {
    type: Date,
    required: true,
  },
  reserveWhen: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    default: "user",
  },
  bookingHistory: {
    type: [booking],
    default: [],
  },
});

//static signup method
userSchema.statics.signup = async function (username, password) {
  //validation
  if (!username || !password) {
    throw Error("All feilds must be filled");
  }
  const exists = await this.findOne({ username });
  if (!!exists) {
    throw Error("this username already in use");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};
//static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All feilds must be filled");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("user not exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("password incorrect");
  }
  return user;
};
module.exports = mongoose.model("user", userSchema);
