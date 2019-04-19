const { User } = require("../models/user");
const genErrorResponse = require("../utils/generateError");
module.exports = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) genErrorResponse(401, "token is not defined");
  token = token.split(" ")[1];

  const decoded = User.verifyJWTtoken(token);
  const user = await User.findById(decoded._id).select("-password -__v");
  if (!user) genErrorResponse(404, "No user found with the given ID");
  user.checkActivity();
  req.user = user;
  next();
};
