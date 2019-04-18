const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

module.exports = app => {
  app.use(bodyparser.json());
  app.use(helmet());
  app.use(cors());
  app.use(compression());
};
