const express = require("express");
const router = require("./routes/mainRouter");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(router);

module.exports = app;