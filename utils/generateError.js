module.exports = (status = 500, message = "") => {
  const error = new Error(message);
  error.status = status;
  throw error;
};
