const logger = require("../configuration/logging");

module.exports = (err, req, res, next) => {
  const { message, status = 400 } = err;
  logger.error(err.message, err);
  res.status(status).send({ error: message });
};
