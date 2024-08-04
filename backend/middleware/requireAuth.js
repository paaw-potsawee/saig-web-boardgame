const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const requireAuth = () => {
  return async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "authorization token required" });
    }

    //'Bearer randomstringggggggafdjkl'
    const token = authorization.split(" ")[1];

    try {
      const { _id } = jwt.verify(token, process.env.SECRET);

      req.user = await User.findOne({ _id }).select("_id");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "request in not authorized" });
    }
  };
};

module.exports = requireAuth;
