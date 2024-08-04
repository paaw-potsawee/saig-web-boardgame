const roomSchema = require("../models/roomSchema.js");

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

module.exports = {
  getAllRooms,
  newRoom,
};
