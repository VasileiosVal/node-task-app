const mongoose = require("mongoose");
const genErrorResponse = require("../utils/generateError");

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    genErrorResponse(400, "The given ID is not correct");
  next();
};
