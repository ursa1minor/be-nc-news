const express = require("express");

const { getTopics, getArticles, getArticleId, getUsers, patchArticleId } = require('./controllers/nc-news.controllers.js');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get(`/api/articles/:article_id`, getArticleId);

app.get('/api/users', getUsers);

app.patch('/api/articles/:article_id', patchArticleId);

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Item not found'})
})

app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({
            message: 'Bad request'
        })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.code === '23502') {
        res.status(400).send({
            message: 'Bad request'
        })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    console.log(res.body)
    res.status(500).send({ message: 'Internal Server Error'});
})

module.exports = app;