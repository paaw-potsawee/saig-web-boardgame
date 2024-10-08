const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomName: {
    unique: true,
    type: String,
    required: true,
  },
  reservation: {
    type: [Date],
  },
});

module.exports = mongoose.model("Room", roomSchema);
