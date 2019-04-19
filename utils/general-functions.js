module.exports = val => {
  return typeof parseInt(val) === "number" && parseInt(val) > 0;
};
