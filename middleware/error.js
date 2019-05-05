const logger = require("../configuration/logging");

module.exports = (err, req, res, next) => {
  let { message, status = 400 } = err;

  logger.error(message, err);

  if (err.name && err.name === "MongoNetworkError") {
    message = "An error occured";
    status = 500;
  }

  res.status(status).send({ error: message });
};
