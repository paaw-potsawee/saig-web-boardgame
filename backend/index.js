const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const routerBoardgame = require("./routes/boardgameRoute.js");
const routerRoom = require("./routes/roomRoute.js");
const routerUser = require("./routes/userLoginRoute.js");
const routerReserve = require("./routes/reserveroomRoute.js");
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/homepage", routerBoardgame);
app.use("/room", routerRoom);
app.use("/user", routerUser);
app.use("/reserve", routerReserve);

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & server is running ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
