require("./configuration/generalErrors")();
require("express-async-errors");
require("dotenv").config();
require("./configuration/jwt")();
const express = require("express");

const app = express();
require("./configuration/config")(app);
require("./configuration/db")();
require("./configuration/joi")();
require("./configuration/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on 3000"));
