module.exports = () => {
  if (!process.env.JWT_SECRET) {
    process.exit(1);
  }
};
