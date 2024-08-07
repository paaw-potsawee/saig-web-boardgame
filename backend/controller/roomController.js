const roomSchema = require("../models/roomSchema.js");
const { default: mongoose } = require("mongoose");

const getAllRooms = async (req, res) => {
  const rooms = await roomSchema.find({});
  res.json({ rooms });
};

const newRoom = async (req, res) => {
  const { roomName } = req.body;

  try {
    const room = await roomSchema.create({ roomName });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such a room" });
  }

  const deletedRoom = await roomSchema.findByIdAndDelete({ _id: id });

  if (!deletedRoom) {
    return res.status(404).json({ error: "no such a room" });
  }
  console.log("complete deleting boardgame");
  res.status(200).json(deletedRoom);
};
const updateRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such a room" });
  }
  const { roomName } = req.body
  if (roomName === undefined || roomName == '' ||roomName == null) {
    return res.status(400).json({ error: 'Room name cannot be empty' });
  }
  const updatedRoom = await roomSchema.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!updatedRoom) {
    return res.status(404).json({ error: "no such a room" });
  }
  console.log("complete updating boardgame");
  res.status(200).json(updatedRoom);
};
module.exports = {
  getAllRooms,
  newRoom,
  deleteRoom,
  updateRoom,
};
