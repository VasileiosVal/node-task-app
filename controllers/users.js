const { User } = require("../models/user");
const checkNumber = require("../utils/general-functions");
const genErrorResponse = require("../utils/generateError");

const getUsers = async (req, res) => {
  let { activePage, unitsPerPage } = req.query;

  unitsPerPage =
    checkNumber(unitsPerPage) && checkNumber(unitsPerPage) <= 10
      ? parseInt(unitsPerPage)
      : 10;
  activePage = checkNumber(activePage) ? parseInt(activePage) : 1;

  const users = await User.find()
    .skip((activePage - 1) * unitsPerPage)
    .limit(unitsPerPage)
    .sort("-_id")
    .select("-password -__v");
  res.send(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -__v");
  if (!user) genErrorResponse(404, "No user found with the given ID");
  res.send(user);
};

const getProfile = (req, res) => {
  res.send(req.user);
};

module.exports = {
  getUsers,
  getUser,
  getProfile
};
