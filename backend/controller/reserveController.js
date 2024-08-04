const User = require("../models/userSchema");
const room = require("../models/roomSchema");
const boardgame = require("../models/Boardgames");
const mongoose = require("mongoose");

const reserveroom = async (req, res) => {
  const { idGame, idRoom } = req.params;
  const { reservetime } = req.body;
  const id = req.user;

  if (!mongoose.Types.ObjectId.isValid(idRoom)) {
    return res.status(404).json({ error: "no such a room" });
  }
  if (!mongoose.Types.ObjectId.isValid(idGame)) {
    return res.status(404).json({ error: "no such a boargame" });
  }

  const reserveRoom = await room.findByIdAndUpdate(
    idRoom,
    {
      $push: {
        reservation: reservetime,
      },
    },
    { new: true }
  );
  const reserveGame = await boardgame.findByIdAndUpdate(
    idGame,
    {
      $push: {
        reservation: reservetime,
      },
    },
    { new: true }
  );
  if (!reserveGame && !reserveRoom) {
    res
      .status(500)
      .json({ error: "error updating reservation boargame and room" });
  }
  const reserve = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        bookingHistory: {
          boardgameName: reserveGame.boardgameName,
          roomName: reserveRoom.roomName,
          reserveDay: reservetime,
        },
      },
    },
    { new: true }
  );
  if (!reserve) {
    res.status(500).json({ error: "error updating reservation" });
  }
  const { bookingHistory } = reserve;
  res.status(200).json({ bookingHistory, reserveRoom, reserveGame });
};

module.exports = {
  reserveroom,
};
