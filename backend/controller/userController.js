const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username, password);

    //create token
    const token = createToken(user._id);
    const { bookingHistory, roll } = user
    res.status(200).json({ username, token,roll});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    //create token
    const token = createToken(user._id);
    const { roll } = user
    res.status(200).json({ username, token,roll});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const history = async(req,res) => {
    try{
      const bookingHistory = await User.findById(req.user).select('bookingHistory')
      res.status(200).json({ bookingHistory })
    }catch(error){
      res.status(400).json({error:error.message})
    }
}

const getAllUser = async(req,res) => {
  try{
    const allUsers = await User.find({ roll:'user' }).select('username')
    res.status(200).json({ allUsers })
  }catch(error){
    res.status(400).json({error:error.message})
  }
}

module.exports = {
  signup,
  login,
  history,
  getAllUser
}
