module.exports = logger => {
  if (!process.env.JWT_SECRET) {
    logger.error("Fatal error. JWT is not defined");
    process.exit(1);
  }
};
