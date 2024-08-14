const Boardgame = require("../models/Boardgames");
const { default: mongoose } = require("mongoose");

//get all baordgames
const getAllBoardgames = async (req, res) => {
  const boardgames = await res.paginatedResults;
  res.json(boardgames);
};

//get one boardgame
const getBoardgame = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such a board game" });
  }
  const boardgame = await Boardgame.findById(id);

  if (!boardgame) {
    return res.status(404).json({ error: "no such a error" });
  }
  res.json(boardgame);
};

//add new boardgame
const newBoardgame = async (req, res) => {
  const { boardgameName, price } = req.body;

  try {
    const boardgame = await Boardgame.create({ boardgameName, price });
    res.status(200).json(boardgame);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

//update boardgame
const updateBoardgame = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such a board game" });
    }
  
    const boardgame = await Boardgame.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
  
    if (!boardgame) {
      return res.status(404).json({ error: "no such a board game" });
    }
    res.status(200).json(boardgame);
  } catch (error) {
    res.status(400).send({ error:error.message})
  }
};
//delete 
const deleteBoardgame = async (req,res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such a board game" });
  }

  const deletedBoardgame = await Boardgame.findByIdAndDelete({ _id:id })

  if (!deletedBoardgame) {
    return res.status(404).json({ error: "no such a board game" });
  }
  console.log('complete deleting boardgame')
  res.status(200).json(deletedBoardgame);

}
module.exports = {
  getAllBoardgames,
  getBoardgame,
  newBoardgame,
  updateBoardgame,
  deleteBoardgame,
};
