const express = require("express");
const apiRouter = express.Router();

const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");

const { getRoot, getApi } = require("../controllers/api-controller");

apiRouter.use(express.json());
apiRouter.route("/").get(getRoot);
apiRouter.route("/api").get(getApi)

apiRouter.use("/api/articles", articlesRouter);
apiRouter.use("/api/comments", commentsRouter);
apiRouter.use("/api/topics", topicsRouter);
apiRouter.use("/api/users", usersRouter);

// 404 table not found / id arg not found getComments
apiRouter.all('/*', (req, res, next) => {
  res.status(404).send({message: 'Item not found'})
})

// 404 item not found
apiRouter.use((err, req, res, next) => {
  if (err.status && err.message) {
      res.status(err.status).send({ message: err.message})
  } else {
      next(err)
  }
})

// psql query errors: 
// get article_id / patch article_id: number is not a number
apiRouter.use((err, req, res, next) => {
  if (err.code === '22P02') {
      res.status(400).send({
          message: 'Bad request'
      })
  } else {
      next(err)
  }
})

// psql error: patch article_id: missing key
apiRouter.use((err, req, res, next) => {
  if (err.code === '23502') {
      res.status(400).send({
          message: 'Bad request'
      })
  } else {
      next(err)
  }
})

// unhandled error
apiRouter.use((err, req, res, next) => {
  res.status(500).send({ message: 'Internal Server Error'});
})

module.exports = apiRouter;