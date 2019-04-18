const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_DB, { useNewUrlParser: true })
    .then(() => console.log("db succesfuly connected"));
};
