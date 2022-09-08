const express = require("express");

const { getTopics } = require('./controllers/nc-news.controllers.js');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Item not found'})
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error'});
})


module.exports = app;

