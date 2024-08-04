const express = require("express");
const router = express.Router();
const {
  getAllBoardgames,
  getBoardgame,
  newBoardgame,
  updateBoardgame,
  deleteBoardgame,
} = require("../controller/boardgame.js");
const requireAuth2 = require('../middleware/requireAuth2.js')
const requireAuth = require('../middleware/requireAuth.js')
//get all baordgames
router.get("/", getAllBoardgames);



//get one boardgame
router.get("/:id", requireAuth(),getBoardgame);

//add new boardgame
router.post("/", requireAuth2('admin'),newBoardgame);

//update boardgame
router.patch("/:id", requireAuth2('admin'),updateBoardgame);

//delete boargame
router.delete("/:id", requireAuth2('admin'),deleteBoardgame)
module.exports = router;
