const express = require("express");

const { getLandingPage, getApi, getTopics, getComments, getArticles, getArticleId, getUsers, patchArticleId, postComment, deleteComment } = require('./controllers/nc-news.controllers.js');

const app = express();

app.use(express.json());

app.get('/', getLandingPage);

app.get('/api', getApi);

app.get('/api/topics', getTopics);

app.get('/api/articles', getArticles);

app.get(`/api/articles/:article_id`, getArticleId);

app.get('/api/articles/:article_id/comments', getComments);

app.get('/api/users', getUsers);

app.patch('/api/articles/:article_id', patchArticleId);

app.post('/api/articles/:article_id/comments', postComment);

app.delete('/api/comments/:comment_id', deleteComment);

// 404 table not found / id arg not found getComments
app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Item not found'})
})

// 404 item not found
app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status).send({ message: err.message})
    } else {
        next(err)
    }
})

// psql query errors: 
// get article_id / patch article_id: number is not a number
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({
            message: 'Bad request'
        })
    } else {
        next(err)
    }
})

// psql error: patch article_id: missing key
app.use((err, req, res, next) => {
    if (err.code === '23502') {
        res.status(400).send({
            message: 'Bad request'
        })
    } else {
        next(err)
    }
})

// unhandled error
app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error'});
})

module.exports = app;