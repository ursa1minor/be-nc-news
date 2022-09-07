const express = require("express");

const { getTopics } = require('./controllers/nc-news.controllers.js')

const app = express();

    app.get('/api/topics', getTopics)

module.exports = app;

