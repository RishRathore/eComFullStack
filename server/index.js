const express = require("express");
var dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('./configs/dbConfig');
var routes = require("./routes");
const { keys } = require("./configs/index");

const app = express();
dotenv.config();
const port = keys.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
  console.log("server is connected on port ", port);
});
