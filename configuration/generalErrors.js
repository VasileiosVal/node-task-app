module.exports = logger => {
  process.on("uncaughtException", err => {
    logger.error(err.message, err);
    process.exit(1);
  });
  process.on("unhandledRejection", err => {
    logger.error(err.message, err);
    process.exit(1);
  });
};
