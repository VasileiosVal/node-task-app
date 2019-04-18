module.exports = (err, req, res, next) => {
  const { message, status = 400 } = err;
  res.status(status).send({ error: message });
};
