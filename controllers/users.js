const { User } = require("../models/user");
const genErrorResponse = require("../utils/generateError");

const getUsers = async (req, res) => {
  const users = await User.find().sort("-_id");
  res.send(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) genErrorResponse(404, "No user found with the given ID");
  res.send(user);
};

const getProfile = async (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  getProfile
};
