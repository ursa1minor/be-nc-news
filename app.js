const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");
const cors = require('cors');

app.use(cors());
app.use(express.json()); 

app.use("/", express.static('public'));
app.use("/api", apiRouter)

module.exports = app;