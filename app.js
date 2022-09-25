const express = require("express");
const app = express();
app.use(express.json()); //parse req.body
const apiRouter = require("./routes/api-router");

app.use("/", apiRouter);

module.exports = app;