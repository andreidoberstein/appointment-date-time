const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

const router = require("./routes/appointmentsRouter");

app.set('port', process.env.PORT || 3008);
app.use(cors())
app.use(express.json());
app.use("/api", router);

module.exports = app;