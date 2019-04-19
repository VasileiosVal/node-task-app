const genErrorResponse = require("../utils/generateError");
module.exports = (req, res, next) => {
  if (!req.user || (req.user && req.user.role === "user"))
    genErrorResponse(403, "Forbiden content");
  next();
};
