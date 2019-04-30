const mongoose = require("mongoose");

module.exports = logger => {
  mongoose
    .connect(process.env.TASKMANAGER_MONGO_DB, {
      useNewUrlParser: true
    })
    .then(() => logger.info("DB connection successful"))
    .catch(err => {
      logger.error(err.message, err);
      process.exit(1);
    });
};
