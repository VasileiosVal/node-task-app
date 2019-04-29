const logger = require("./configuration/logging");
require("./configuration/generalErrors")(logger);
require("express-async-errors");
require("dotenv").config();
require("./configuration/jwt")(logger);
const express = require("express");
const app = express();
require("./configuration/config")(app);
require("./configuration/db")(logger);
require("./configuration/joi")();
require("./configuration/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`server listening on port ${port}`));
