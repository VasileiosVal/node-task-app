const logger = require("../configuration/logging");

module.exports = (err, req, res, next) => {
  let { message, status = 400 } = err;

  if (err.name && err.name === "MongoNetworkError")
    message = "An error occured";

  logger.error(message, err);
  res.status(status).send({ error: message });
};
