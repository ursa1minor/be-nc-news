const express = require("express");
const app = express();
app.use(express.json()); //parse req.body

const { getRoot, getApi } = require('./controllers/api-controller');

// Routers
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");

app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);

app.get('/', getRoot);
app.get('/api', getApi);

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